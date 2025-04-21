// questions/html.js（テンプレートベース）

const htmlTemplates = [
    {
      question: (text) => `h1タグで「${text}」と表示してください。`,
      answer: (text) => `<h1>${text}</h1>`,
      hint: "hタグは<h1>〜</h1>で囲むよ"
    },
    {
      question: (url, alt) => `画像URL「${url}」、alt属性「${alt}」のimgタグを書いてください。`,
      answer: (url, alt) => `<img src="${url}" alt="${alt}">`,
      hint: "imgタグは閉じタグ不要"
    }
  ];
  