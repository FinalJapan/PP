// server.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { OpenAI } = require('openai');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());
app.use(express.static('public'));
// server.js（変更箇所だけ抜粋）
app.post('/api/generate-quiz-question', async (req, res) => {
  const { lang = "html", level = "beginner" } = req.body;

  const prompt = `
あなたは ${lang.toUpperCase()} の専門家で、クイズ作成が得意な先生です。
${level} レベルの4択クイズを1問作ってください。

🎯 毎回異なる内容・出題テーマにしてください。
⚠️ 同じような問題を繰り返さないでください。

以下の形式で、日本語でJSONを返してください：

{
  "question": "問題文",
  "choices": ["選択肢1", "選択肢2", "選択肢3", "選択肢4"],
  "correctAnswer": 正解のインデックス番号（0～3）
}
`;

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7
    });

    const raw = response.choices[0].message.content;
    const jsonStart = raw.indexOf("{");
    const jsonEnd = raw.lastIndexOf("}") + 1;
    const json = raw.substring(jsonStart, jsonEnd);
    const data = JSON.parse(json);

    res.json(data);
  } catch (err) {
    console.error("❌ GPTクイズ生成エラー:", err);
    res.status(500).json({ error: "GPTでのクイズ生成に失敗しました" });
  }
});


const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

// フロントから問題をリクエストされたときの処理
app.post('/api/generate-question', async (req, res) => {
  const { lang = "html", level = "beginner" } = req.body;

  const prompt = `
  あなたは${lang.toUpperCase()}を教える先生です。
  ${level}レベルの記述式クイズを1問作ってください。
  以下の形式で日本語でJSONを返してください：
  {
    "question": "問題文",
    "answer": "正解コード",
    "hint": "ヒント"
  }
  `;

  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7
    });

    const raw = response.choices[0].message.content;
    const jsonStart = raw.indexOf("{");
    const jsonEnd = raw.lastIndexOf("}") + 1;
    const json = raw.substring(jsonStart, jsonEnd);
    const data = JSON.parse(json);

    res.json(data);
  } catch (err) {
    console.error("❌ GPTエラー:", err);
    res.status(500).json({ error: "GPTからの生成に失敗しました" });
  }
});

app.listen(PORT, () => {
  console.log(`✅ サーバー起動: http://localhost:${PORT}`);
});
