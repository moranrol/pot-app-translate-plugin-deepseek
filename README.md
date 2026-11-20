# Pot 的 DeepSeek Flash 翻译插件

在 Pot 中用 DeepSeek Flash 翻译选中的文字。默认使用快速翻译，也可以在插件设置中选择思考翻译。

**[下载可直接安装的 .potext 文件](https://github.com/moranrol/pot-app-translate-plugin-deepseek/releases/latest/download/plugin.com.TzuLao.deepseek.potext)**

## 安装

1. 下载上面的 `plugin.com.TzuLao.deepseek.potext`，保留原文件名。
2. 在 Pot 打开 **偏好设置 → 服务设置 → 翻译 → 添加外部插件 → 安装外部插件**，选中下载的文件。
3. 在插件列表中点 **DeepSeek Flash**，填写自己的 DeepSeek API 密钥并保存。已有原版服务的用户可以直接点服务右侧的铅笔编辑。密钥可在 [DeepSeek 开放平台](https://platform.deepseek.com/api_keys) 创建。

翻译时，插件将待译文本发送到 DeepSeek 官方 API，译文显示在 Pot 的 **DeepSeek Flash** 卡片中。

## 版本与来源

本版本基于 Tzulao55 的 Pot 翻译插件，沿用原插件 ID。2026 年 11 月更新了模型调用，快速翻译和思考翻译均使用 `deepseek-flash`，通过 API 的 `thinking` 参数切换。在 Windows 版 Pot 3.0.7 中已验证服务可以加载。[原项目](https://github.com/Tzulao55/pot-app-translate-plugin-deepseek) · [DeepSeek 模型文档](https://api-docs.deepseek.com/zh-cn/)

代码依原项目的 GNU GPL v3 许可证发布。[许可证全文](LICENSE)
