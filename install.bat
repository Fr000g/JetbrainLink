@echo off
echo 🚀 开始安装 JetBrains Link VS Code 扩展...

REM 检查 Node.js 是否已安装
node --version >nul 2>&1
if errorlevel 1 (
    echo ❌ 错误: 请先安装 Node.js
    pause
    exit /b 1
)

REM 检查 npm 是否已安装
npm --version >nul 2>&1
if errorlevel 1 (
    echo ❌ 错误: 请先安装 npm
    pause
    exit /b 1
)

echo 📦 安装依赖...
npm install

if errorlevel 1 (
    echo ❌ 依赖安装失败
    pause
    exit /b 1
) else (
    echo ✅ 依赖安装成功
)

echo 🔨 编译 TypeScript...
npm run compile

if errorlevel 1 (
    echo ❌ 编译失败
    pause
    exit /b 1
) else (
    echo ✅ 编译成功
)

echo.
echo 🎉 JetBrains Link 扩展安装完成！
echo.
echo 下一步：
echo 1. 打开 VS Code
echo 2. 按 F5 启动扩展开发主机
echo 3. 在新窗口中配置 JetBrains IDE 路径
echo 4. 测试扩展功能
echo.
echo 配置位置: VS Code 设置 ^> 搜索 'JetBrains Link'
pause 