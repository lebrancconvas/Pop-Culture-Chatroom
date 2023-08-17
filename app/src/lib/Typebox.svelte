<script lang="ts">
  enum SenderRole {
    USER = 'user',
    BOT = 'bot'
  }

  enum ChatType {
    TEXT = 'text'
  }

  interface IChatLog {
    senderRole: SenderRole;
    type: ChatType;
    content: string;
  }

  let messageLogs: IChatLog[] = [];

  let messageInput = '';

  function sendMessage() {
    let content = messageInput;
    messageInput = '';

    let message: IChatLog = {
      senderRole: SenderRole.USER,
      type: ChatType.TEXT,
      content: content
    };

    messageLogs = [...messageLogs, message];
    console.log(messageLogs);
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
