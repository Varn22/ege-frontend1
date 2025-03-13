const API_URL = "https://ege-backend.onrender.com"; // Заменить на свой API

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

    try {
        const res = await fetch(`${API_URL}/check_answer`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ answer })
        });
        const data = await res.json();
        document.getElementById("responseMessage").textContent = data.message;
    } catch (error) {
        document.getElementById("responseMessage").textContent = "Ошибка отправки ответа";
    }
});
