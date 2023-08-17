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
  <input type="text" on:keydown={handleKeydown} bind:value={messageInput}>
</div>

<style>
  #typebox-container {
    position: relative;
    margin: 20px auto;
    border: 2px solid black;
    padding: 5px;
    width: 80%;
    height: 4.3vh;
    border-radius: 5px;
  }

  input {
    position: absolute;
    outline: 0;
    border: 0;
    width: 80%;
    height: 60%;
    font-size: 21px;
  }
</style>
