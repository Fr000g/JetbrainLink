#!/bin/bash

echo "🚀 开始安装 JetBrains Link VS Code 扩展..."

# 检查 Node.js 是否已安装
if ! command -v node &> /dev/null; then
    echo "❌ 错误: 请先安装 Node.js"
    exit 1
fi

# 检查 npm 是否已安装
if ! command -v npm &> /dev/null; then
    echo "❌ 错误: 请先安装 npm"
    exit 1
fi

echo "📦 安装依赖..."
npm install

if [ $? -eq 0 ]; then
    echo "✅ 依赖安装成功"
else
    echo "❌ 依赖安装失败"
    exit 1
fi

echo "🔨 编译 TypeScript..."
npm run compile

if [ $? -eq 0 ]; then
    echo "✅ 编译成功"
else
    echo "❌ 编译失败"
    exit 1
fi

echo ""
echo "🎉 JetBrains Link 扩展安装完成！"
echo ""
echo "下一步："
echo "1. 打开 VS Code"
echo "2. 按 F5 启动扩展开发主机"
echo "3. 在新窗口中配置 JetBrains IDE 路径"
echo "4. 测试扩展功能"
echo ""
echo "配置位置: VS Code 设置 > 搜索 'JetBrains Link'" 