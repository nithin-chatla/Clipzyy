const chatDisplay = document.getElementById('chatDisplay');
const messageInput = document.getElementById('messageInput');
const sendBtn = document.getElementById('sendBtn');
const loader = document.getElementById('loader');

const API_KEY = 'sk-9a8a3e83f87d4c79835e9b17c74e8288'; // Replace with your DeepSeek API key
const API_URL = 'https://api.deepseek.com/v1/chat/completions';

sendBtn.addEventListener('click', sendMessage);
messageInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        sendMessage();
    }
});

function sendMessage() {
    const message = messageInput.value.trim();
    if (!message) return;

    addMessage('user', message);
    messageInput.value = '';
    getBotResponse(message);
}

function addMessage(sender, text) {
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('chat-message', sender);
    messageDiv.textContent = text;
    chatDisplay.appendChild(messageDiv);
    chatDisplay.scrollTop = chatDisplay.scrollHeight; // Auto-scroll
}

async function getBotResponse(userMessage) {
    loader.style.display = 'block'; // Show loader

    const payload = {
        model: 'deepseek-chat', // Ensure this is the correct model name
        messages: [
            { role: 'system', content: 'You are Luna, a helpful AI assistant.' },
            { role: 'user', content: userMessage }
        ]
    };

    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${API_KEY}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        });

        if (!response.ok) {
            throw new Error(`API request failed: ${response.statusText}`);
        }

        const data = await response.json();
        const botMessage = data.choices[0].message.content;
        addMessage('bot', botMessage);
    } catch (error) {
        console.error(error);
        addMessage('bot', "Oops! Something went wrong. Try again.");
    } finally {
        loader.style.display = 'none'; // Hide loader
    }
}
