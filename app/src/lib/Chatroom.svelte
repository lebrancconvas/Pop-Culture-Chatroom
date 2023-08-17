<script lang="ts">
	import { fade } from 'svelte/transition';
  import { messageLogs } from './index';
  import { type IChatLog, SenderRole } from './index';

  let logs: IChatLog[] = [];
  messageLogs.subscribe((values) => logs = values);

  $: console.log(logs);
</script>

<div id="chatroom-container">
  {#each logs as log}
    {#if log.senderRole === SenderRole.USER}
      <div transition:fade class="bubble user-bubble">
        <p>{log.content}</p>
      </div>
    {:else if log.senderRole === SenderRole.BOT}
      <div transition:fade class="bubble bot-bubble">
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
    height: 70vh;
    border-radius: 5px;
    overflow-y: auto;
    overflow-x: hidden;
  }

  .bubble {
    text-align: center;
    width: 14%;
    padding: 3px;
    border-radius: 10px;
  }

  .user-bubble {
    /* position: absolute; */
    margin: 5px 82%;
    background-color: rgb(29, 139, 241);
  }

  p {
    color: white;
    font-size: 18px;
    word-wrap: break-word;
  }

  .bot-bubble {
    /* position: absolute; */
    margin: 5px 4%;
    background-color: rgb(0, 136, 0);
  }
</style>
