# JetBrains Link - VS Code 扩展

一个简单的VS Code扩展，用于将打开的标签页同步到JetBrains IDE并定位光标位置。

## 功能

- **同步标签页**：将VS Code中打开的文件传输到JetBrains IDE
- **光标定位**：同步当前文件的光标位置（行号和列号）
- **状态栏按钮**：提供快捷访问按钮
- **可配置路径**：支持自定义JetBrains IDE可执行文件路径
- **自定义参数**：允许配置命令行参数

## 安装

### 1. 安装依赖

```bash
npm install
```

### 2. 编译

```bash
npm run compile
```

### 3. 配置JetBrains IDE

在VS Code设置中配置：

#### `jetBrainsLink.executablePath`
JetBrains IDE可执行文件路径：

- **macOS**: `/usr/local/bin/goland` (建议使用IDE的"创建命令行启动器"功能)
- **Windows**: `"C:\\Program Files\\JetBrains\\GoLand 2024.1\\bin\\goland64.exe"`
- **Linux**: `"/opt/GoLand/bin/goland.sh"`

#### `jetBrainsLink.commandArguments`
命令行参数模板（默认：`--line {line} --column {column} {paths}`）

#### `jetBrainsLink.showStatusBarButton`
是否显示状态栏按钮（默认：`true`）

## 使用

1. 在VS Code中打开文件
2. 将光标定位到需要的位置
3. 点击状态栏的"🔗 JetBrains"按钮，或使用命令面板

扩展会在JetBrains IDE中打开这些文件并定位光标。

## 开发

### 调试

1. 打开项目文件夹
2. 按 `F5` 启动扩展开发主机
3. 在新窗口中测试功能

### 监听编译

```bash
npm run watch
```

## 支持的IDE

- IntelliJ IDEA
- GoLand
- PyCharm
- WebStorm
- PhpStorm
- RubyMine
- CLion
- 其他支持命令行参数的JetBrains IDE

## 故障排除

### IDE无法启动
1. 检查可执行文件路径设置
2. 确保IDE支持命令行参数
3. macOS用户建议使用"创建命令行启动器"功能

### 光标位置错误
1. 确保IDE版本支持 `--line` 和 `--column` 参数
2. 检查命令参数模板格式

## 许可证

MIT License - 详见 [LICENSE](LICENSE) 文件 