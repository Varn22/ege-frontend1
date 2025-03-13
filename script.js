const API_URL = "https://ege-backend.onrender.com"; // Заменить на свой API
const BOT_ID = "7558875234"; // Замени на свой реальный ID бота


document.getElementById("loginTelegram").addEventListener("click", () => {
    window.open(`https://oauth.telegram.org/auth?bot_id=${BOT_ID}&origin=${window.location.origin}&embed=1`, "_blank");
});

async function checkAuth() {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.has("id")) {
        const telegramId = urlParams.get("id");
        const name = urlParams.get("first_name");
        document.getElementById("userInfo").textContent = `Привет, ${name}!`;
        
        await fetch(`${API_URL}/auth/telegram`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ telegram_id: telegramId, name })
        });
    }
}
checkAuth();

document.getElementById("startTest").addEventListener("click", () => {
    document.getElementById("questionContainer").classList.remove("hidden");
    loadQuestion();
});

async function loadQuestion() {
    try {
        const res = await fetch(`${API_URL}/get_question`);
        const data = await res.json();
        document.getElementById("questionText").textContent = data.text;
    } catch (error) {
        document.getElementById("questionText").textContent = "Ошибка загрузки вопроса";
    }
}

document.getElementById("submitAnswer").addEventListener("click", async () => {
    const answer = document.getElementById("answerInput").value;
    if (!answer) return alert("Введите ответ!");

    const urlParams = new URLSearchParams(window.location.search);
    const telegramId = urlParams.get("id") || "guest";

    try {
        const res = await fetch(`${API_URL}/check_answer`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ telegram_id: telegramId, answer })
        });
        const data = await res.json();
        document.getElementById("responseMessage").textContent = data.message;
    } catch (error) {
        document.getElementById("responseMessage").textContent = "Ошибка отправки ответа";
    }
});

document.getElementById("showLeaderboard").addEventListener("click", async () => {
    try {
        const res = await fetch(`${API_URL}/leaderboard`);
        const data = await res.json();
        const list = document.getElementById("leaderboardList");
        list.innerHTML = "";
        data.forEach(user => {
            const li = document.createElement("li");
            li.textContent = `${user.name} — ${user.score} баллов`;
            list.appendChild(li);
        });
        document.getElementById("leaderboard").classList.remove("hidden");
    } catch (error) {
        alert("Ошибка загрузки рейтинга");
    }
});
