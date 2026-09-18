function showMessage() {
    alert("Welcome to SkillBridge AI - Your Personalized Learning Partner!");
}

document.addEventListener("DOMContentLoaded", () => {
    // 1. Fetch & Populate Courses dynamically on courses page or home page
    const courseList = document.getElementById("courseList");
    if (courseList) {
        fetch("/api/courses")
            .then(response => response.json())
            .then(data => {
                let coursesHTML = "";
                data.forEach(course => {
                    coursesHTML += `
                    <div class="course-card">
                        <h2>${course.name}</h2>
                        <p>Level: <strong>${course.level}</strong></p>
                        <p>Progress: ${course.progress}%</p>
                        <progress value="${course.progress}" max="100"></progress>
                        <button class="btn btn-primary" style="margin-top: 10px;">Continue Learning</button>
                    </div>
                    `;
                });
                courseList.innerHTML = coursesHTML;
            })
            .catch(error => {
                console.error("Error loading courses:", error);
            });
    }

    // 2. Chatbot Interaction
    const chatInput = document.querySelector(".chat-input input");
    const sendButton = document.querySelector(".chat-input button");
    const chatBox = document.querySelector(".chat-box");

    if (sendButton && chatInput && chatBox) {
        function sendChatMessage() {
            const messageText = chatInput.value.trim();
            if (!messageText) return;

            // Render User Message
            const userMsgDiv = document.createElement("div");
            userMsgDiv.className = "user-message";
            userMsgDiv.innerHTML = `<b>You:</b> ${escapeHTML(messageText)}`;
            chatBox.appendChild(userMsgDiv);

            chatInput.value = "";
            chatBox.scrollTop = chatBox.scrollHeight;

            // Show Typing Indicator
            const botTypingDiv = document.createElement("div");
            botTypingDiv.className = "bot-message";
            botTypingDiv.innerHTML = `<b>AI:</b> <i>Thinking...</i>`;
            chatBox.appendChild(botTypingDiv);
            chatBox.scrollTop = chatBox.scrollHeight;

            // Call API
            fetch("/api/message", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ message: messageText })
            })
            .then(res => res.json())
            .then(data => {
                botTypingDiv.innerHTML = `<b>AI:</b> ${escapeHTML(data.reply)}`;
                chatBox.scrollTop = chatBox.scrollHeight;
            })
            .catch(err => {
                botTypingDiv.innerHTML = `<b>AI:</b> Sorry, something went wrong while getting response.`;
                console.error(err);
            });
        }

        sendButton.addEventListener("click", sendChatMessage);
        chatInput.addEventListener("keypress", (e) => {
            if (e.key === "Enter") {
                sendChatMessage();
            }
        });
    }

    // 3. Quiz Submission logic
    const quizBox = document.querySelector(".quiz-box");
    if (quizBox) {
        const quizSubmitBtn = quizBox.querySelector("button");
        if (quizSubmitBtn) {
            quizSubmitBtn.addEventListener("click", () => {
                const selected = quizBox.querySelector("input[name='q1']:checked");
                let feedbackDiv = quizBox.querySelector(".quiz-feedback");
                if (!feedbackDiv) {
                    feedbackDiv = document.createElement("div");
                    feedbackDiv.className = "quiz-feedback";
                    feedbackDiv.style.marginTop = "15px";
                    feedbackDiv.style.fontWeight = "bold";
                    quizBox.appendChild(feedbackDiv);
                }

                if (!selected) {
                    feedbackDiv.style.color = "#ef4444";
                    feedbackDiv.textContent = "Please select an answer before submitting.";
                } else if (selected.parentElement.textContent.trim().includes("Python")) {
                    feedbackDiv.style.color = "#10b981";
                    feedbackDiv.textContent = "🎉 Correct! Python is the primary language for AI and Machine Learning.";
                } else {
                    feedbackDiv.style.color = "#f59e0b";
                    feedbackDiv.textContent = "❌ Incorrect. Python is the most widely used language for AI & Machine Learning.";
                }
            });
        }
    }
});

function escapeHTML(str) {
    return str.replace(/[&<>'"]/g, 
        tag => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[tag] || tag)
    );
}