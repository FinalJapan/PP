// public/js/quiz.js
let currentIndex = 0;
const MAX_GPT_QUESTIONS = 7;
let currentQuestion = null;

function renderQuestion() {
  if (currentIndex >= MAX_GPT_QUESTIONS) {
    showQuizEnd();
    return;
  }

  // ✅ 読み込み中メッセージ
  document.getElementById("question").textContent = `🌀 問題を読み込み中 (${currentIndex + 1} / ${MAX_GPT_QUESTIONS})...`;
  document.getElementById("choices").innerHTML = "";
  document.getElementById("feedback").textContent = "";

  fetch("/api/generate-quiz-question", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      lang: document.getElementById("languageSelect").value,
      level: "beginner"
    })
  })
    .then(res => res.json())
    .then(data => {
      currentQuestion = data;

      document.getElementById("question").textContent = data.question;
      const choicesDiv = document.getElementById("choices");
      choicesDiv.innerHTML = "";

      data.choices.forEach((choice, index) => {
        const btn = document.createElement("button");
        btn.textContent = choice;
        btn.className = "btn";
        btn.onclick = () => checkAnswer(index);
        choicesDiv.appendChild(btn);
      });
    })
    .catch(err => {
      console.error("❌ GPT読み込みエラー：", err);
      document.getElementById("question").textContent = "⚠️ 問題の取得に失敗しました。ページを再読み込みしてください。";
    });
}

function checkAnswer(selectedIndex) {
  const feedback = document.getElementById("feedback");
  if (selectedIndex === currentQuestion.correctAnswer) {
    feedback.textContent = "🎉 正解！よくできた！";
    feedback.style.color = "green";
  } else {
    feedback.textContent = "❌ 不正解…";
    feedback.style.color = "red";
  }
}

function nextQuestion() {
  currentIndex++;
  renderQuestion();
}

function showQuizEnd() {
  const quizBox = document.getElementById("quiz-box");
  quizBox.innerHTML = `
    <h2>🎉 すべての問題が終わったよ！</h2>
    <p>他の言語でも挑戦してみよう！</p>
    <a href="quiz.html" class="btn">🧪 他の言語に挑戦する</a>
    <a href="index.html" class="btn">🏠 ホームに戻る</a>
  `;
  document.querySelector("button[onclick='nextQuestion()']").style.display = "none";
}

function changeLanguage() {
  currentIndex = 0;
  document.querySelector("button[onclick='nextQuestion()']").style.display = "inline-block";
  renderQuestion();
}

window.onload = renderQuestion;
