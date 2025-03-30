const chatSection = document.getElementById('chatSection');
const chatDisplay = document.getElementById('chatDisplay');
const messageInput = document.getElementById('messageInput');
const sendBtn = document.getElementById('sendBtn');
const loader = document.getElementById('loader');

const API_KEY = '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';

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
    chatDisplay.appendChild(messageDiv);
    chatDisplay.scrollTop = chatDisplay.scrollHeight; // Auto-scroll to bottom
    
    if (sender === 'bot') {
        typeMessage(messageDiv, text);
    } else {
        messageDiv.textContent = text;
    }
}

function typeMessage(element, text) {
    let index = 0;
    element.textContent = ''; // Start empty

    const type = () => {
        if (index < text.length) {
            element.textContent += text.charAt(index);
            index++;
            chatDisplay.scrollTop = chatDisplay.scrollHeight; // Keep scrolling
            setTimeout(type, 20); // Adjust speed (20ms per character)
        }
    };
    type();
}

async function getBotResponse(userMessage) {
    const options = {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${API_KEY}`,
            'Content-Type': 'application/json',
            'HTTP-Referer': window.location.origin,
            'X-Title': 'Chatbot Website'
        },
        body: JSON.stringify({
            model: 'openai/gpt-3.5-turbo', // Default model
            messages: [
                { role: 'system', content: 'You are Lovely, created by Srian Group. Respond as if you are an AI assistant with a friendly, helpful tone.' },
                { role: 'user', content: userMessage }
            ]
        })
    };

    try {
        loader.style.display = 'block';

        const response = await fetch('https://openrouter.ai/api/v1/chat/completions', options);
        if (!response.ok) throw new Error('API request failed');

        const data = await response.json();
        const botMessage = data.choices[0].message.content;

        loader.style.display = 'none';
        addMessage('bot', botMessage);
    } catch (error) {
        console.error(error);
        loader.style.display = 'none';
        addMessage('bot', "Oops, something went wrong! I'm Srian, created by Srian Group, and I'll try to help you again if you ask.");
    }
}