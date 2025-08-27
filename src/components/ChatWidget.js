(function(){
  function appendMessage(role, text){
    var messages = document.getElementById('xl-chat-messages');
    if(!messages) return;
    var row = document.createElement('div');
    row.className = 'xl-chat-row';
    row.style.justifyContent = role === 'user' ? 'flex-end' : 'flex-start';
    var bubble = document.createElement('div');
    bubble.className = 'xl-chat-bubble ' + role;
    bubble.textContent = text;
    row.appendChild(bubble);
    messages.appendChild(row);
    messages.scrollTop = messages.scrollHeight;
  }

  function fakeReply(input){
    setTimeout(function(){
      appendMessage('assistant', 'You said: "' + input + '"');
    }, 500);
  }

  function mount(){
    if(document.getElementById('xl-chat-button')) return;

    var button = document.createElement('button');
    button.id = 'xl-chat-button';
    button.className = 'xl-chat-button';
    button.setAttribute('aria-label', 'Open chat');
    button.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="22" height="22" fill="#0c1427"><path d="M12 3C7.03 3 3 6.58 3 11c0 2.15 1 4.09 2.64 5.53-.09.97-.41 2.37-1.29 3.83 0 0 2.07-.2 4.04-1.6.97.34 2.02.54 3.11.54 4.97 0 9-3.58 9-8s-4.03-8-9-8z"/></svg>';

    var panel = document.createElement('div');
    panel.id = 'xl-chat-panel';
    panel.className = 'xl-chat-panel';
    panel.innerHTML = ''+
      '<div class="xl-chat-header">' +
      '  <div class="xl-chat-title">Chat with XLayerAI</div>' +
      '  <button class="xl-chat-close" aria-label="Close">×</button>' +
      '</div>' +
      '<div class="xl-chat-messages" id="xl-chat-messages"></div>' +
      '<div class="xl-chat-inputbar">' +
      '  <div class="xl-chat-inputwrap">' +
      '    <input id="xl-chat-input" class="xl-chat-input" placeholder="Type a message" />' +
      '    <button id="xl-chat-send" class="xl-chat-send" aria-label="Send">' +
      '      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/></svg>' +
      '    </button>' +
      '  </div>' +
      '</div>';

    function openPanel(){ panel.classList.add('xl-open'); }
    function closePanel(){ panel.classList.remove('xl-open'); }

    button.addEventListener('click', function(){
      if(panel.classList.contains('xl-open')) closePanel();
      else openPanel();
    });

    panel.addEventListener('click', function(e){
      var t = e.target;
      if(t && t.classList && t.classList.contains('xl-chat-close')) closePanel();
    });

    function handleSend(){
      var inputEl = document.getElementById('xl-chat-input');
      var value = (inputEl && inputEl.value || '').trim();
      if(!value) return;
      appendMessage('user', value);
      inputEl.value = '';
      fakeReply(value);
    }

    panel.addEventListener('keydown', function(e){
      if(e.key === 'Enter'){
        var target = e.target;
        if(target && target.id === 'xl-chat-input'){
          e.preventDefault();
          handleSend();
        }
      }
    });
    panel.addEventListener('click', function(e){
      var t = e.target;
      if(t && t.id === 'xl-chat-send'){
        handleSend();
      }
    });

    document.body.appendChild(button);
    document.body.appendChild(panel);
    appendMessage('assistant', "Hi! I'm your cybersecurity assistant. Ask me anything.");
  }

  if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', mount);
  } else {
    mount();
  }
})();

