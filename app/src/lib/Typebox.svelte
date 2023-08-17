<script lang="ts">
	import { ChatType } from './index';
	import { SenderRole } from './index';
  import { messageLogs } from './index';
  import type { IChatLog } from './index';

  let messageInput = '';

  function sendMessage() {
    if(!messageInput.trim().length) return;

    let content = messageInput.trim();
    messageInput = '';

    let message: IChatLog = {
      senderRole: SenderRole.USER,
      type: ChatType.TEXT,
      content: content
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
