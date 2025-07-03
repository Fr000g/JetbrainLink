# JetBrains Link - VS Code Extension

A simple VS Code extension that syncs open tabs to JetBrains IDEs with cursor positioning.

## Features

- **Sync open tabs**: Transfer open files from VS Code to JetBrains IDE
- **Cursor positioning**: Sync current file cursor position (line and column)
- **Status bar button**: Quick access button for easy syncing
- **Configurable path**: Set custom JetBrains IDE executable path
- **Custom arguments**: Configure command-line arguments

## Installation

### 1. Install dependencies

```bash
npm install
```

### 2. Compile

```bash
npm run compile
```

### 3. Configure JetBrains IDE

Set up the following in VS Code settings:

#### `jetBrainsLink.executablePath`
Path to your JetBrains IDE executable:

- **macOS**: `/usr/local/bin/goland` (recommended: use "Create Command-line Launcher" in your IDE)
- **Windows**: `"C:\\Program Files\\JetBrains\\GoLand 2024.1\\bin\\goland64.exe"`
- **Linux**: `"/opt/GoLand/bin/goland.sh"`

#### `jetBrainsLink.commandArguments`
Command-line arguments template (default: `--line {line} --column {column} {paths}`)

#### `jetBrainsLink.showStatusBarButton`
Show status bar button (default: `true`)

## Usage

1. Open files in VS Code
2. Position cursor where needed
3. Click the "🔗 JetBrains" status bar button or use command palette

The extension will open the files in JetBrains IDE and position the cursor.

## Development

### Debug

1. Open project folder
2. Press `F5` to launch Extension Development Host
3. Test the extension in the new window

### Watch compilation

```bash
npm run watch
```

## Supported IDEs

- IntelliJ IDEA
- GoLand
- PyCharm
- WebStorm
- PhpStorm
- RubyMine
- CLion
- Other JetBrains IDEs with command-line support

## Troubleshooting

### IDE won't start
1. Check executable path setting
2. Ensure IDE supports command-line arguments
3. macOS users: use "Create Command-line Launcher" feature

### Cursor position incorrect
1. Ensure IDE version supports `--line` and `--column` parameters
2. Check command arguments template format

## Configuration Examples

See [config-examples.md](config-examples.md) for detailed configuration examples.

## License

MIT License - see [LICENSE](LICENSE) file

---

**中文说明** | [README-zh.md](README-zh.md)
