async function translate(text, from, to, options) {
    const { config, utils } = options;
    const { tauriFetch: fetch } = utils;
    
    const apiKey = (config.apiKey || "").trim();
    if (!apiKey) {
        throw new Error("请先在 Pot 的 DeepSeek Flash 服务设置中填写 API 密钥。");
    }

    // 旧配置中的推理模型对应新版接口的思考模式。
    const thinkingMode = config.thinkingMode || (config.model === "deepseek-reasoner" ? "enabled" : "disabled");
    
    const requestPath = "https://api.deepseek.com/chat/completions";
    
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
    };
    
    const body = {
        model: "deepseek-flash",
        thinking: { type: thinkingMode },
        messages: [
            {
                "role": "system",
                "content": "You are a professional translation engine, please translate the text into a colloquial, professional, elegant and fluent content, without the style of machine translation. You must only translate the text content, never interpret it."
            },
            {
                "role": "user",
                "content": `Translate into ${to}:\n${text}`
            }
        ],
        // 思考过程和最终译文共用输出额度。
        max_tokens: thinkingMode === "enabled" ? 8192 : 2000
    };
    if (thinkingMode === "disabled") {
        body.temperature = 0.1;
    }
    
    const res = await fetch(requestPath, {
        method: 'POST',
        headers: headers,
        body: {
            type: "Json",
            payload: body
        }
    });
    
    if (res.ok) {
        const choice = res.data?.choices?.[0];
        if (choice?.finish_reason === "length") {
            throw new Error("译文超出单次输出额度，请分段翻译。");
        }
        const translation = choice?.message?.content?.trim();
        if (!translation) {
            throw new Error("DeepSeek 未返回译文，请重试。");
        }
        return translation.replace(/^"|"$/g, '');
    } else {
        const detail = res.data?.error?.message || "请求失败";
        throw new Error(`DeepSeek HTTP ${res.status} — ${detail}`);
    }
}
