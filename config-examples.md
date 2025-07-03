# JetBrains Link 配置示例

本文档提供了针对不同操作系统和JetBrains IDE的配置示例。

## 配置方法

1. 在VS Code中打开设置（`Ctrl/Cmd + ,`）
2. 搜索 "JetBrains Link"
3. 根据下面的示例配置相应的设置

## macOS 配置示例

### 推荐方法（使用命令行启动器）

首先在JetBrains IDE中创建命令行启动器：
1. 打开您的JetBrains IDE
2. 进入 `Tools > Create Command-line Launcher...`
3. 保持默认设置并点击确定

然后在VS Code中配置：

```json
{
  "jetBrainsLink.executablePath": "/usr/local/bin/goland",
  "jetBrainsLink.commandArguments": "--line {line} --column {column} {paths}",
  "jetBrainsLink.showStatusBarButton": true
}
```

### 不同IDE的命令行启动器路径

- **GoLand**: `/usr/local/bin/goland`
- **IntelliJ IDEA**: `/usr/local/bin/idea`
- **PyCharm**: `/usr/local/bin/pycharm`
- **WebStorm**: `/usr/local/bin/webstorm`
- **PhpStorm**: `/usr/local/bin/phpstorm`
- **RubyMine**: `/usr/local/bin/rubymine`
- **CLion**: `/usr/local/bin/clion`

### 直接应用程序路径（如果未创建命令行启动器）

```json
{
  "jetBrainsLink.executablePath": "/Applications/GoLand.app/Contents/MacOS/goland",
  "jetBrainsLink.commandArguments": "--line {line} --column {column} {paths}"
}
```

## Windows 配置示例

### GoLand
```json
{
  "jetBrainsLink.executablePath": "C:\\Program Files\\JetBrains\\GoLand 2024.1\\bin\\goland64.exe",
  "jetBrainsLink.commandArguments": "--line {line} --column {column} {paths}"
}
```

### IntelliJ IDEA
```json
{
  "jetBrainsLink.executablePath": "C:\\Program Files\\JetBrains\\IntelliJ IDEA 2024.1\\bin\\idea64.exe",
  "jetBrainsLink.commandArguments": "--line {line} --column {column} {paths}"
}
```

### PyCharm
```json
{
  "jetBrainsLink.executablePath": "C:\\Program Files\\JetBrains\\PyCharm 2024.1\\bin\\pycharm64.exe",
  "jetBrainsLink.commandArguments": "--line {line} --column {column} {paths}"
}
```

### WebStorm
```json
{
  "jetBrainsLink.executablePath": "C:\\Program Files\\JetBrains\\WebStorm 2024.1\\bin\\webstorm64.exe",
  "jetBrainsLink.commandArguments": "--line {line} --column {column} {paths}"
}
```

## Linux 配置示例

### Snap 安装的IDE
```json
{
  "jetBrainsLink.executablePath": "/snap/bin/goland",
  "jetBrainsLink.commandArguments": "--line {line} --column {column} {paths}"
}
```

### 手动安装的IDE
```json
{
  "jetBrainsLink.executablePath": "/opt/GoLand/bin/goland.sh",
  "jetBrainsLink.commandArguments": "--line {line} --column {column} {paths}"
}
```

### Flatpak 安装的IDE
```json
{
  "jetBrainsLink.executablePath": "flatpak",
  "jetBrainsLink.commandArguments": "run com.jetbrains.GoLand --line {line} --column {column} {paths}"
}
```

## 高级配置示例

### 仅打开文件（不定位光标）
```json
{
  "jetBrainsLink.commandArguments": "{paths}"
}
```

### 使用项目目录参数
```json
{
  "jetBrainsLink.commandArguments": "--line {line} --column {column} {paths} ."
}
```

### 添加额外启动参数
```json
{
  "jetBrainsLink.commandArguments": "--line {line} --column {column} --wait {paths}"
}
```

### 隐藏状态栏按钮
```json
{
  "jetBrainsLink.showStatusBarButton": false
}
```

## 故障排除

### 找不到可执行文件

1. **检查路径**：确保可执行文件路径正确且文件存在
2. **权限问题**：确保VS Code有权限执行该文件
3. **路径中的空格**：在Windows上，包含空格的路径可能需要用引号包围

### IDE无法启动

1. **版本兼容性**：确保使用的JetBrains IDE版本支持命令行参数
2. **参数格式**：检查命令参数格式是否正确
3. **命令行启动器**：在macOS上，尝试重新创建命令行启动器

### 光标位置错误

1. **参数顺序**：确保活跃文件是最后一个参数
2. **行列格式**：某些IDE可能使用不同的行列参数格式
3. **版本差异**：不同版本的IDE可能有不同的命令行参数支持

## 测试配置

配置完成后，您可以通过以下步骤测试：

1. 在VS Code中打开几个文件
2. 将光标定位到特定位置
3. 点击状态栏的"🔗 JetBrains"按钮
4. 检查JetBrains IDE是否正确打开文件并定位光标 