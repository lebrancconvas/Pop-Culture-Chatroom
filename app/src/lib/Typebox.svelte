<script lang="ts">
  import { onMount } from 'svelte';
  import { type IChatLog, SenderRole, ChatType, messageLogs } from './index';

  let messageInput = '';
  let message: IChatLog;

  onMount(() => {
    messageLogs.subscribe((logs) => {
      if(logs.length !== 0) return;
    })

    message = {
      senderRole: SenderRole.BOT,
      type: ChatType.TEXT,
      content: 'Hello!',
      createdAt: new Date()
    }
    messageLogs.update((logs) => [...logs, message])
  })

  function sendMessage() {
    if(!messageInput.trim().length) return;

    let content = messageInput.trim();
    messageInput = '';

    message = {
      senderRole: SenderRole.USER,
      type: ChatType.TEXT,
      content: content,
      createdAt: new Date()
    };

    messageLogs.update((logs) => [...logs, message]);
  }

  function handleKeydown(e: KeyboardEvent) {
    if(e.key === 'Enter') {
      e.preventDefault();
      sendMessage();
    }
  }
</script>

<div id="typebox-container">
  <textarea on:keydown={handleKeydown} bind:value={messageInput} placeholder="Type a message..." />
</div>

<style>
  #typebox-container {
    /* outline: 2px solid black; */
    position: relative;
    margin: 20px auto;
    width: 90%;
  }

  textarea {
    position: absolute;
    border: 2px solid black;
    margin-left: auto;
    margin-right: auto;
    padding: 5px;
    width: 100%;
    height: 5vh;
    font-size: 21px;
    border-radius: 5px;
  }
</style>
