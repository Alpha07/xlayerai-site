export function mountChatWidget() {
  if (document.getElementById('xl-chat-button')) return

  const link = document.createElement('link')
  link.rel = 'stylesheet'
  link.href = '/src/components/ChatWidget.css'
  document.head.appendChild(link)

  const button = document.createElement('button')
  button.id = 'xl-chat-button'
  button.className = 'xl-chat-button'
  button.setAttribute('aria-label', 'Open chat')
  button.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="22" height="22" fill="#0c1427"><path d="M12 3C7.03 3 3 6.58 3 11c0 2.15 1 4.09 2.64 5.53-.09.97-.41 2.37-1.29 3.83 0 0 2.07-.2 4.04-1.6.97.34 2.02.54 3.11.54 4.97 0 9-3.58 9-8s-4.03-8-9-8z"/></svg>'

  const panel = document.createElement('div')
  panel.id = 'xl-chat-panel'
  panel.className = 'xl-chat-panel'
  panel.innerHTML = `
    <div class="xl-chat-header">
      <div class="xl-chat-title">Chat with XLayerAI</div>
      <button class="xl-chat-close" aria-label="Close">×</button>
    </div>
    <div class="xl-chat-messages" id="xl-chat-messages"></div>
    <div class="xl-chat-inputbar">
      <div class="xl-chat-inputwrap">
        <input id="xl-chat-input" class="xl-chat-input" placeholder="Type a message" />
        <button id="xl-chat-send" class="xl-chat-send" aria-label="Send">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/></svg>
        </button>
      </div>
    </div>
  `

  function appendMessage(role: 'user' | 'assistant', text: string) {
    const messages = document.getElementById('xl-chat-messages')!
    const row = document.createElement('div')
    row.className = 'xl-chat-row'
    row.style.justifyContent = role === 'user' ? 'flex-end' : 'flex-start'
    const bubble = document.createElement('div')
    bubble.className = `xl-chat-bubble ${role}`
    bubble.textContent = text
    row.appendChild(bubble)
    messages.appendChild(row)
    messages.scrollTop = messages.scrollHeight
  }

  function fakeReply(input: string) {
    setTimeout(() => {
      appendMessage('assistant', `You said: "${input}"`)
    }, 500)
  }

  function openPanel() {
    panel.classList.add('xl-open')
  }
  function closePanel() {
    panel.classList.remove('xl-open')
  }

  button.addEventListener('click', () => {
    if (panel.classList.contains('xl-open')) closePanel()
    else openPanel()
  })

  panel.querySelector('.xl-chat-close')!.addEventListener('click', closePanel)

  function handleSend() {
    const inputEl = document.getElementById('xl-chat-input') as HTMLInputElement
    const value = (inputEl.value || '').trim()
    if (!value) return
    appendMessage('user', value)
    inputEl.value = ''
    fakeReply(value)
  }

  panel.addEventListener('keydown', (e) => {
    if ((e as KeyboardEvent).key === 'Enter') {
      const target = e.target as HTMLElement
      if (target && target.id === 'xl-chat-input') {
        e.preventDefault()
        handleSend()
      }
    }
  })
  panel.querySelector('#xl-chat-send')!.addEventListener('click', handleSend)

  document.body.appendChild(button)
  document.body.appendChild(panel)

  // Seed welcome message
  appendMessage('assistant', "Hi! I'm your cybersecurity assistant. Ask me anything.")
}

