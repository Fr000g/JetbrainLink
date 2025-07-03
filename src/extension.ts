import * as vscode from 'vscode';
import { execFile } from 'child_process';
import * as path from 'path';

let statusBarItem: vscode.StatusBarItem;

export function activate(context: vscode.ExtensionContext) {
    console.log('JetBrains Link 扩展已激活');

    // 注册同步命令
    const syncCommand = vscode.commands.registerCommand('jetBrainsLink.sync', async () => {
        await syncToJetBrainsIDE();
    });

    // 创建状态栏按钮
    createStatusBarItem();

    // 监听配置变化
    const configurationListener = vscode.workspace.onDidChangeConfiguration((event: vscode.ConfigurationChangeEvent) => {
        if (event.affectsConfiguration('jetBrainsLink.showStatusBarButton')) {
            updateStatusBarVisibility();
        }
    });

    context.subscriptions.push(
        syncCommand,
        statusBarItem,
        configurationListener
    );

    // 初始化状态栏按钮显示状态
    updateStatusBarVisibility();
}

function createStatusBarItem() {
    statusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right, 100);
    statusBarItem.command = 'jetBrainsLink.sync';
    statusBarItem.text = '$(link) JetBrains';
    statusBarItem.tooltip = '同步到 JetBrains IDE';
}

function updateStatusBarVisibility() {
    const config = vscode.workspace.getConfiguration('jetBrainsLink');
    const showButton = config.get<boolean>('showStatusBarButton', true);
    
    if (showButton) {
        statusBarItem.show();
    } else {
        statusBarItem.hide();
    }
}

async function syncToJetBrainsIDE() {
    try {
        const config = vscode.workspace.getConfiguration('jetBrainsLink');
        const executablePath = config.get<string>('executablePath');
        const commandTemplate = config.get<string>('commandArguments', '--line {line} --column {column} {paths}');

        if (!executablePath) {
            vscode.window.showErrorMessage('JetBrains Link: 请在设置中配置 JetBrains IDE 可执行文件路径');
            return;
        }

        // 获取所有打开的标签页
        const allTabs: vscode.Tab[] = [];
        for (const tabGroup of vscode.window.tabGroups.all) {
            for (const tab of tabGroup.tabs) {
                allTabs.push(tab);
            }
        }

        const activeEditor = vscode.window.activeTextEditor;

        if (allTabs.length === 0) {
            vscode.window.showInformationMessage('JetBrains Link: 没有打开的文件需要同步');
            return;
        }

        // 收集所有文件路径
        const allFilePaths = new Set<string>();
        
        // 添加所有标签页的文件路径
        for (const tab of allTabs) {
            if (tab.input instanceof vscode.TabInputText && tab.input.uri.scheme === 'file') {
                allFilePaths.add(tab.input.uri.fsPath);
            }
        }

        // 构建文件路径列表，确保活跃文件在最后
        const filePathsList: string[] = [];
        let activeFilePath: string | undefined;
        let activeLine = 1;
        let activeColumn = 1;

        if (activeEditor && activeEditor.document.uri.scheme === 'file') {
            activeFilePath = activeEditor.document.uri.fsPath;
            activeLine = activeEditor.selection.active.line + 1; // VS Code 使用 0-based，JetBrains 使用 1-based
            activeColumn = activeEditor.selection.active.character + 1;
        }

        // 添加非活跃文件
        for (const filePath of allFilePaths) {
            if (filePath !== activeFilePath) {
                filePathsList.push(`"${filePath}"`);
            }
        }

        // 最后添加活跃文件（如果存在）
        if (activeFilePath) {
            filePathsList.push(`"${activeFilePath}"`);
        }

        if (filePathsList.length === 0) {
            vscode.window.showInformationMessage('JetBrains Link: 没有有效的文件需要同步');
            return;
        }

        // 替换命令模板中的占位符
        const paths = filePathsList.join(' ');
        const commandArgs = commandTemplate
            .replace('{line}', activeLine.toString())
            .replace('{column}', activeColumn.toString())
            .replace('{paths}', paths);

        // 解析命令参数
        const args = parseCommandArguments(commandArgs);

        console.log('JetBrains Link: 执行命令:', executablePath, args);

        // 执行命令
        execFile(executablePath, args, (error: Error | null, stdout: string, stderr: string) => {
            if (error) {
                console.error('JetBrains Link 错误:', error);
                vscode.window.showErrorMessage(`JetBrains Link 执行失败: ${error.message}`);
                return;
            }

            if (stderr) {
                console.warn('JetBrains Link 警告:', stderr);
            }

            const fileCount = allFilePaths.size;
            const activeInfo = activeFilePath ? ` (活跃文件: ${path.basename(activeFilePath)} 第${activeLine}行第${activeColumn}列)` : '';
            vscode.window.showInformationMessage(`JetBrains Link: 已同步 ${fileCount} 个文件到 JetBrains IDE${activeInfo}`);
        });

    } catch (error) {
        console.error('JetBrains Link 意外错误:', error);
        vscode.window.showErrorMessage(`JetBrains Link 发生意外错误: ${error}`);
    }
}

function parseCommandArguments(commandString: string): string[] {
    const args: string[] = [];
    let current = '';
    let inQuotes = false;
    let escapeNext = false;

    for (let i = 0; i < commandString.length; i++) {
        const char = commandString[i];

        if (escapeNext) {
            current += char;
            escapeNext = false;
            continue;
        }

        if (char === '\\') {
            escapeNext = true;
            continue;
        }

        if (char === '"' || char === "'") {
            if (inQuotes && char === commandString[i]) {
                inQuotes = false;
            } else if (!inQuotes) {
                inQuotes = true;
            } else {
                current += char;
            }
            continue;
        }

        if (char === ' ' && !inQuotes) {
            if (current.trim()) {
                args.push(current.trim());
                current = '';
            }
            continue;
        }

        current += char;
    }

    if (current.trim()) {
        args.push(current.trim());
    }

    return args;
}

export function deactivate() {
    console.log('JetBrains Link 扩展已停用');
} 