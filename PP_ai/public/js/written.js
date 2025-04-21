// js/written.js

let currentIndex = 0;
let currentLang = "html";
let currentQuestion = null;

const USE_GPT = true; // ✅ GPTモードをON
const MAX_RANDOM_QUESTIONS = 5; // fallbackモード時の問題数制限

// ✅ 初期表示時に呼び出される関数
function renderQuestion() {
  if (currentLang === "html" && USE_GPT) {
    fetchGPTQuestion();
  } else {
    currentQuestion = generateFallbackQuestion(); // fallback用テンプレから
    displayQuestion(currentQuestion);
  }
}

// ✅ 問題を画面に表示
function displayQuestion(q) {
  document.getElementById("question").textContent = q.question;
  document.getElementById("hint").textContent = q.hint;
  document.getElementById("answer").value = "";
  document.getElementById("feedback").textContent = "";
}

// ✅ GPTからリアルタイムに問題を取得
async function fetchGPTQuestion() {
  try {
    const res = await fetch("http://localhost:3000/api/generate-question", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ lang: currentLang, level: "beginner" })
    });

    const data = await res.json();
    currentQuestion = data;
    displayQuestion(data);
  } catch (err) {
    console.error("❌ GPT接続エラー。テンプレから出題します", err);
    currentQuestion = generateFallbackQuestion();
    displayQuestion(currentQuestion);
  }
}

// ✅ 回答チェック処理（完全一致）
function checkAnswer() {
  const userInput = document.getElementById("answer").value.trim();
  const correctAnswer = currentQuestion.answer;

  const feedback = document.getElementById("feedback");

  if (userInput === correctAnswer) {
    feedback.textContent = "🎉 正解！よくできた！";
    feedback.style.color = "green";
    saveWrittenResult(true);
  } else {
    feedback.textContent = `❌ 不正解！正しくは：${correctAnswer}`;
    feedback.style.color = "red";
    saveWrittenResult(false);
  }
}

// ✅ 「次の問題へ」ボタン
function nextQuestion() {
  currentIndex++;

  if (!USE_GPT && currentIndex >= MAX_RANDOM_QUESTIONS) {
    showQuizEnd();
  } else {
    renderQuestion();
  }
}

// ✅ 最終画面（全問完了後）
function showQuizEnd() {
  const quizBox = document.getElementById("quiz-box");
  const feedback = document.getElementById("feedback");
  const nextBtn = document.querySelector("button[onclick='nextQuestion()']");

  quizBox.innerHTML = `
    <h2>🎉 すべての問題が終わったよ！</h2>
    <p style="margin: 16px 0;">他の言語でも挑戦してみよう！</p>
    <div style="display: flex; gap: 10px; justify-content: center;">
      <a href="written.html" class="btn">🧪 他の言語を選ぶ</a>
      <a href="index.html" class="btn">🏠 ホームに戻る</a>
    </div>
  `;
  feedback.textContent = "";
  if (nextBtn) nextBtn.style.display = "none";
}

// ✅ 言語切り替え（セレクトボックス変更時）
function changeLanguage() {
  const selected = document.getElementById("languageSelect").value;
  currentLang = selected;
  currentIndex = 0;

  if (!USE_GPT) {
    const script = document.createElement("script");
    script.src = `questions/${currentLang}.js`;
    script.onload = renderQuestion;
    document.body.appendChild(script);
  } else {
    renderQuestion();
  }
}

// ✅ 解答ログ保存（localStorage）
function saveWrittenResult(isCorrect) {
  const logs = JSON.parse(localStorage.getItem("writtenResults") || "[]");

  const logData = {
    question: currentQuestion.question,
    result: isCorrect ? "正解" : "不正解",
    date: new Date().toLocaleDateString(),
    language: currentLang
  };

  logs.push(logData);
  localStorage.setItem("writtenResults", JSON.stringify(logs));
}

// ✅ fallback用テンプレート（GPT失敗時）
function generateFallbackQuestion() {
  const htmlFallback = [
    {
      question: "「こんにちは、世界」と表示するHTMLを書いてください。",
      answer: "<h1>こんにちは、世界</h1>",
      hint: "<h1>〜</h1> タグで囲むと大見出しになるよ！"
    },
    {
      question: "ページのタイトルを『My First Page』に設定するHTMLを書いてください。",
      answer: "<title>My First Page</title>",
      hint: "<title>は<head>タグの中に入れるよ"
    }
  ];

  const fallback = {
    html: htmlFallback,
    javascript: [],
    python: []
  };

  const list = fallback[currentLang];
  return list[Math.floor(Math.random() * list.length)];
}

// ✅ 初期読み込み時の起動処理
window.onload = () => {
  renderQuestion();
};
