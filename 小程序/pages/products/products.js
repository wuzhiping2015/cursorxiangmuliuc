/**
 * 产品展示页面逻辑
 */
Page({
    data: {
      products: [
        {
          id: 1,
          name: '产品名称1',
          description: '这是产品1的详细描述，介绍产品的特点和优势。',
          image: 'https://via.placeholder.com/800x400?text=Product+1',
          features: ['特点1', '特点2', '特点3']
        },
        {
          id: 2,
          name: '产品名称2',
          description: '这是产品2的详细描述，介绍产品的特点和优势。',
          image: 'https://via.placeholder.com/800x400?text=Product+2',
          features: ['特点1', '特点2', '特点3', '特点4']
        },
        {
          id: 3,
          name: '产品名称3',
          description: '这是产品3的详细描述，介绍产品的特点和优势。',
          image: 'https://via.placeholder.com/800x400?text=Product+3',
          features: ['特点1', '特点2']
        }
      ]
    },
    onLoad() {
      // 页面加载时执行
    }
  })