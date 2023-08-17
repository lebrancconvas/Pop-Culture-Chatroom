<script lang="ts">
  import { messageLogs } from './index';
  import { type IChatLog, SenderRole } from './index';

  let logs: IChatLog[] = [];
  messageLogs.subscribe((values) => logs = values);

  $: console.log(logs);
</script>

<div id="chatroom-container">
  {#each logs as log}
    {#if log.senderRole === SenderRole.USER}
      <div id="user-zone">
        <p>{log.content}</p>
      </div>
    {:else if log.senderRole === SenderRole.BOT}
      <div id="bot-zone">
        <p>{log.content}</p>
      </div>
    {/if}
  {/each}
</div>

<style>
  #chatroom-container {
    position: relative;
    margin: 20px auto;
    border: 2px solid black;
    padding: 5px;
    width: 80%;
    height: 65vh;
    border-radius: 5px;
    overflow-y: auto;
    overflow-x: hidden;
  }

  #user-zone {
    /* position: absolute; */
    margin: 0 82%;
    text-align: center;
    width: 14%;
    padding: 3px;
    border-radius: 100px;
    background-color: rgb(29, 139, 241);
    margin-bottom: 5px;
  }

  #user-zone > p {
    color: white;
    font-size: 18px;
    word-wrap: break-word;
  }

  #bot-zone {
    position: absolute;
    text-align: center;
    width: 14%;
    padding: 3px;
    border-radius: 100px;
    background-color: rgb(36, 196, 42);
    margin-bottom: 5px;
  }
</style>
