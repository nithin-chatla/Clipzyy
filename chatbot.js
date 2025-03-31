const chatSection = document.getElementById('chatSection');
const chatDisplay = document.getElementById('chatDisplay');
const messageInput = document.getElementById('messageInput');
const sendBtn = document.getElementById('sendBtn');
const loader = document.getElementById('loader');

const API_KEY = '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'; // Replace with your actual API key

// Send message on button click or Enter key
sendBtn.addEventListener('click', sendMessage);
messageInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        sendMessage();
    }
});

function sendMessage() {
    const message = messageInput.value.trim();
    if (message) {
        addMessage('user', message);
        messageInput.value = '';
        getBotResponse(message);
    }
}

function addMessage(sender, text) {
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('chat-message', sender);
    messageDiv.textContent = text;
    chatDisplay.appendChild(messageDiv);
    chatDisplay.scrollTop = chatDisplay.scrollHeight; // Auto-scroll to bottom
}

async function getBotResponse(userMessage) {
    const options = {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${API_KEY}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            model: 'deepseek-chat', // Correct DeepSeek model name
            messages: [
                { role: 'system', content: 'You are Luna, an AI assistant created by Srian Group. You respond in a friendly and helpful tone.' },
                { role: 'user', content: userMessage }
            ]
        })
    };

    try {
        loader.style.display = 'block'; // Show loader

        const response = await fetch('https://api.deepseek.com/v1/chat/completions', options);
        if (!response.ok) throw new Error(`API request failed: ${response.statusText}`);

        const data = await response.json();
        const botMessage = data.choices[0].message.content;

        loader.style.display = 'none'; // Hide loader
        addMessage('bot', botMessage);
    } catch (error) {
        console.error(error);
        loader.style.display = 'none';
        addMessage('bot', "Oops, something went wrong! Please try again.");
    }
}
