const htmlGPTQuestions = [
    {
      question: "HTMLで、ページのタイトルを「初めてのHTML」に設定するためのコードを記述してください。",
      answer: "<title>初めてのHTML</title>",
      hint: "HTMLのタイトルは<head>タグの中に<title>タグを使用して設定します。"
    },
    {
      question: "HTMLで、ページのタイトルを「My First Webpage」としたい場合、どのように記述するべきでしょうか？",
      answer: "<title>My First Webpage</title>",
      hint: "HTMLのタイトルは、<title>タグを使用して記述します。"
    },
    {
      question: "「Hello, World!」と表示するHTMLページを作成してください。",
      answer: `<!DOCTYPE html>
  <html>
  <head>
  <title>Page Title</title>
  </head>
  <body>
  
  <h1>Hello, World!</h1>
  
  </body>
  </html>`,
      hint: "HTML文書は、<!DOCTYPE>宣言から始まります。その後に<html>タグが続き、<head>セクション（ページタイトルなどのメタデータが含まれます）と<body>セクション（ページの主要なコンテンツが含まれます）が続きます。ページの内容は<body>タグ内に記述します。"
    },
    {
      question: "HTMLで文章を強調したい時に使うタグは何ですか？",
      answer: "<strong></strong>",
      hint: "タグ名は英語の「強い」を意味する言葉です。"
    },
    {
      question: "HTMLで、ページ内に「こんにちは、世界」と表示させる正しいコードを書いてください。",
      answer: "<!DOCTYPE html><html><head></head><body>こんにちは、世界</body></html>",
      hint: "bodyタグ内に表示させる文字を書きます。"
    }
  ];
  