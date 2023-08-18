<script lang="ts">
	import { fade } from 'svelte/transition';
  import { messageLogs } from './index';
  import { type IChatLog, SenderRole, ChatType } from './index';
  import mangaList from '../data/manga.json';

  let logs: IChatLog[] = [];
  messageLogs.subscribe((values) => logs = values);

  function reply(replyContent: string, callback?: () => void) {
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

    if(callback) {
      setTimeout(() => {
        callback();
      }, 200);
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
          reply('Do you mean command: "read <Manga Name>" ?');
          break;
        case('readlist'):
          reply(`Manga List`, () => {
            messageLogs.update((logs) => [...logs, {
              senderRole: SenderRole.BOT,
              type: ChatType.LINK,
              content: `https://raw.githubusercontent.com/lebrancconvas/Pop-Culture-Chatroom/main/app/src/data/manga-data.json`,
              createdAt: new Date()
            }])
          });
          break;
        case('random'):
          reply('Do you mean command: "random manga" ?');
          break;
        case('random manga'):
          let randomManga = mangaList[Math.floor(Math.random() * mangaList.length)];
          reply(`Random ${randomManga.title} !`, () => {
            messageLogs.update((logs) => [...logs, {
              senderRole: SenderRole.BOT,
              type: ChatType.LINK,
              content: `${randomManga.url}`,
              createdAt: new Date()
            }]);
          });
          break;
        case('search'):
          reply('Do you mean command: "search <Manga Name>" ?');
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
        if(manga) {
            reply(`Found ${manga?.title} !`, () => {
              messageLogs.update((logs) => [...logs, {
                senderRole: SenderRole.BOT,
                type: ChatType.LINK,
                content: `${manga?.url}`,
                createdAt: new Date()
              }]);
            });
        } else {
          reply('Not Found your manga, I\'m sorry');
        }
      } else if(latestMessage.content.toLowerCase().startsWith('search ')) {
        let searchKeyword = latestMessage.content.split(' ').slice(1).join(' ');
        let searchResult = mangaList.filter((manga) => manga.title.toLowerCase().includes(searchKeyword.toLowerCase()));
        searchResult = searchResult.slice(0, 20);
        if(searchResult.length <= 0) {
          reply('Not Found your manga, I\'m sorry');
        } else {
          reply(`Found ${searchResult.length} result(s)! (Max results shown 20 results.)`, () => {
            searchResult.forEach((manga) => {
              setTimeout(() => {
                messageLogs.update((logs) => [...logs, {
                  senderRole: SenderRole.BOT,
                  type: ChatType.TEXT,
                  content: `${manga.title}`,
                  createdAt: new Date()
                }]);
              }, 100);
            });
          });
        }
      }
    }
  }
</script>

<div id="chatroom-container">
  {#each logs as log}
    {#if log.senderRole === SenderRole.USER}
      <div transition:fade class="bubble user-bubble">
        {#if log.type === ChatType.TEXT}
          <p>{log.content}</p>
        {:else if log.type === ChatType.LINK}
          <a href={log.content} target="_blank"><p>{log.content}</p></a>
        {/if}
      </div>
    {:else if log.senderRole === SenderRole.BOT}
      <div transition:fade class="bubble bot-bubble">
        {#if log.type === ChatType.TEXT}
          <p>{log.content}</p>
        {:else if log.type === ChatType.LINK}
          <a href={log.content} target="_blank"><p>{log.content}</p></a>
        {/if}
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
