// AI工具数据
const toolsData = [
    {
        id: 1,
        name: "ChatGPT",
        description: "OpenAI开发的大型语言模型聊天机器人，能够生成类似人类的文本对话",
        image: "./images/tools/chatgpt.jpg",
        url: "https://chat.openai.com/",
        category: ["chatgpt"],
        tags: ["热门"],
        isHot: true
    },
    {
        id: 2,
        name: "Midjourney",
        description: "AI图像生成工具，通过文本描述创建高质量艺术图像",
        image: "./images/tools/midjourney.jpg",
        url: "https://www.midjourney.com/",
        category: ["image"],
        tags: ["热门"],
        isHot: true
    },
    {
        id: 3,
        name: "Stable Diffusion",
        description: "开源的AI图像生成模型，可以从文本描述生成详细图像",
        image: "./images/tools/stable-diffusion.jpg",
        url: "https://stablediffusionweb.com/",
        category: ["image"],
        tags: ["免费"],
        isHot: false
    },
    {
        id: 4,
        name: "Notion AI",
        description: "Notion集成的AI助手，帮助用户撰写、编辑和总结内容",
        image: "./images/tools/notion-ai.jpg",
        url: "https://www.notion.so/product/ai",
        category: ["writing"],
        tags: ["效率"],
        isHot: false
    },
    {
        id: 5,
        name: "Runway",
        description: "AI视频生成和编辑工具，可以创建和修改视频内容",
        image: "./images/tools/runway.jpg",
        url: "https://runwayml.com/",
        category: ["video"],
        tags: ["创意"],
        isHot: true
    },
    {
        id: 6,
        name: "DALL-E",
        description: "OpenAI的AI图像生成系统，可以从文本描述创建逼真图像",
        image: "./images/tools/dalle.jpg",
        url: "https://openai.com/dall-e-2",
        category: ["image"],
        tags: ["创意"],
        isHot: true
    },
    {
        id: 7,
        name: "Copy.ai",
        description: "AI写作助手，帮助创建营销文案、博客文章等内容",
        image: "./images/tools/copyai.jpg",
        url: "https://www.copy.ai/",
        category: ["writing"],
        tags: ["营销"],
        isHot: false
    },
    {
        id: 8,
        name: "Jasper",
        description: "AI内容创作平台，用于生成博客、社交媒体和营销内容",
        image: "./images/tools/jasper.jpg",
        url: "https://www.jasper.ai/",
        category: ["writing"],
        tags: ["营销"],
        isHot: false
    },
    {
        id: 9,
        name: "Synthesia",
        description: "AI视频生成平台，可以创建逼真的AI人物视频",
        image: "./images/tools/synthesia.jpg",
        url: "https://www.synthesia.io/",
        category: ["video"],
        tags: ["商业"],
        isHot: false
    },
    {
        id: 10,
        name: "Murf",
        description: "AI语音生成器，可以创建自然、逼真的AI配音",
        image: "./images/tools/murf.jpg",
        url: "https://murf.ai/",
        category: ["audio"],
        tags: ["配音"],
        isHot: false
    },
    {
        id: 11,
        name: "Figma AI",
        description: "Figma的AI功能，帮助设计师更快地创建和编辑设计",
        image: "./images/tools/figma-ai.jpg",
        url: "https://www.figma.com/ai",
        category: ["design"],
        tags: ["设计"],
        isHot: true
    },
    {
        id: 12,
        name: "GitHub Copilot",
        description: "AI编程助手，可以根据注释和上下文生成代码",
        image: "./images/tools/github-copilot.jpg",
        url: "https://github.com/features/copilot",
        category: ["code"],
        tags: ["开发"],
        isHot: true
    },
    {
        id: 13,
        name: "Descript",
        description: "AI音频和视频编辑工具，可以像编辑文档一样编辑媒体",
        image: "./images/tools/descript.jpg",
        url: "https://www.descript.com/",
        category: ["audio", "video"],
        tags: ["编辑"],
        isHot: false
    },
    {
        id: 14,
        name: "Canva AI",
        description: "Canva的AI功能，帮助用户快速创建设计和内容",
        image: "./images/tools/canva-ai.jpg",
        url: "https://www.canva.com/ai-image-generator/",
        category: ["design", "image"],
        tags: ["设计"],
        isHot: true
    },
    {
        id: 15,
        name: "Claude",
        description: "Anthropic开发的AI助手，专注于有用、无害和诚实的对话",
        image: "./images/tools/claude.jpg",
        url: "https://claude.ai/",
        category: ["chatgpt"],
        tags: ["对话"],
        isHot: true
    },
    {
        id: 16,
        name: "Perplexity AI",
        description: "AI搜索引擎，提供有来源的回答和实时信息",
        image: "./images/tools/perplexity.jpg",
        url: "https://www.perplexity.ai/",
        category: ["chatgpt", "other"],
        tags: ["搜索"],
        isHot: true
    },
    {
        id: 17,
        name: "Leonardo.ai",
        description: "AI艺术和图像生成平台，为创意专业人士设计",
        image: "./images/tools/leonardo-ai.jpg",
        url: "https://leonardo.ai/",
        category: ["image"],
        tags: ["创意"],
        isHot: false
    },
    {
        id: 18,
        name: "Firefly",
        description: "Adobe的AI图像生成工具，集成在Creative Cloud中",
        image: "./images/tools/firefly.jpg",
        url: "https://firefly.adobe.com/",
        category: ["image", "design"],
        tags: ["Adobe"],
        isHot: true
    },
    {
        id: 19,
        name: "Bing AI",
        description: "微软的AI搜索助手，集成在Bing搜索引擎中",
        image: "./images/tools/bing-ai.jpg",
        url: "https://www.bing.com/new",
        category: ["chatgpt", "other"],
        tags: ["搜索"],
        isHot: false
    },
    {
        id: 20,
        name: "Bard",
        description: "Google的AI聊天机器人，基于LaMDA大型语言模型",
        image: "./images/tools/bard.jpg",
        url: "https://bard.google.com/",
        category: ["chatgpt"],
        tags: ["Google"],
        isHot: true
    },
    {
        id: 21,
        name: "Hugging Face",
        description: "AI社区和平台，提供开源模型和工具",
        image: "./images/tools/hugging-face.jpg",
        url: "https://huggingface.co/",
        category: ["other", "code"],
        tags: ["开源"],
        isHot: false
    },
    {
        id: 22,
        name: "Pika",
        description: "AI视频生成工具，从文本描述创建短视频",
        image: "./images/tools/pika.jpg",
        url: "https://pika.art/",
        category: ["video"],
        tags: ["创意"],
        isHot: true
    },
    {
        id: 23,
        name: "Suno",
        description: "AI音乐生成工具，可以创建原创音乐和歌曲",
        image: "./images/tools/suno.jpg",
        url: "https://suno.ai/",
        category: ["audio"],
        tags: ["音乐"],
        isHot: true
    },
    {
        id: 24,
        name: "Tabnine",
        description: "AI代码补全工具，支持多种编程语言和IDE",
        image: "./images/tools/tabnine.jpg",
        url: "https://www.tabnine.com/",
        category: ["code"],
        tags: ["开发"],
        isHot: false
    }
];