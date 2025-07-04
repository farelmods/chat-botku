async function sendMessage() {
  const input = document.getElementById('messageInput');
  const chatbox = document.getElementById('chatbox');
  const message = input.value.trim();
  if (!message) return;

  chatbox.innerHTML += `<div class="message user">👤 Kamu: ${message}</div>`;
  input.value = '';

  try {
    const res = await fetch('/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message })
    });

    const data = await res.json();
    console.log('[DEBUG CLIENT] Data:', data); // Debug frontend

    if (data.error) throw new Error(data.error);

    // Tampilkan jawaban AI (string)
    const replyText = typeof data.reply === 'string'
      ? data.reply
      : JSON.stringify(data.reply); // fallback kalau masih objek

    chatbox.innerHTML += `<div class="message bot">🤖 AI: ${replyText}</div>`;

  } catch (e) {
    chatbox.innerHTML += `<div class="message bot">⚠️ Error: ${e.message}</div>`;
  }

  chatbox.scrollTop = chatbox.scrollHeight;
}
