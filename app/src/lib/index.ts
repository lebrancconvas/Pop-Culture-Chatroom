// place files you want to import through the `$lib` alias in this folder.
import { writable } from 'svelte/store';

export enum SenderRole {
  USER = 'user',
  BOT = 'bot'
}

export enum ChatType {
  TEXT = 'text',
  LINK = 'link'
}

export interface IChatLog {
  senderRole: SenderRole;
  type: ChatType;
  content: string;
  createdAt: Date;
}

export let messageLogs = writable<IChatLog[]>([]);
