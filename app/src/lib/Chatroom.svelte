<script lang="ts">
	import { fade } from 'svelte/transition';
  import { messageLogs } from './index';
  import { type IChatLog, SenderRole, ChatType } from './index';
  import mangaList from '../data/manga-data.json';

  let logs: IChatLog[] = [];
  messageLogs.subscribe((values) => logs = values);

  function reply(replyContent: string) {
    if(logs.length === 0) return;

    if(logs[logs.length - 1].senderRole === SenderRole.USER) {
      let reply: IChatLog = {
        senderRole: SenderRole.BOT,
        type: ChatType.TEXT,
        content: replyContent,
        createdAt: new Date()
      };
      setTimeout(() => {
        messageLogs.update((logs) => [...logs, reply]);
      }, 100);
    }
  }

  $: {
    let latestMessage = logs[logs.length - 1];

    if(latestMessage && latestMessage.senderRole === SenderRole.USER) {
      switch(latestMessage.content.toLowerCase()) {
        case('test'):
          reply('Test Reply');
          break;
        case('hello'):
          reply('Hello!');
          break;
        case('commands'):
          reply('Commands: read <Manga Name>');
          break;
        case('read'):
          reply('read <Manga Name>');
          break;
        case('readlist'):
          let mangaTitles = mangaList.filter((manga) => manga.title);
          reply(`Manga List: ${mangaTitles.map((manga) => manga.title).join(', ')}`);
          break;
        case('clear'):
          messageLogs.set([]);
          messageLogs.update((logs) => [...logs, {
            senderRole: SenderRole.BOT,
            type: ChatType.TEXT,
            content: 'Message Cleared!',
            createdAt: new Date()
          }]);
          break;
        default:
          break;
      }

      if(latestMessage.content.toLowerCase().startsWith('read ')) {
        let mangaName = latestMessage.content.split(' ').slice(1).join(' ');
        let manga = mangaList.find((manga) => manga.title.toLowerCase() === mangaName.toLowerCase());
        reply(`Link: ${manga?.url}`);
      }

    }
  }
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
    width: 30%;
    padding: 3px;
    border-radius: 10px;
  }

  .user-bubble {
    /* position: absolute; */
    margin: 5px 66%;
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
