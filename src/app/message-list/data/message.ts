export interface Message {
  sentAt: Date | string;
  uuid: string;
  content: string;
  senderUuid: string;
}

export function uniqueMsg(msg: Message) {
  return { uuid: msg.uuid, content: msg.content } as Partial<Message>;
}

export interface MessageSortBy {
  value: string;
  label: string;
}

export type sortByValues = 'asc' | 'desc';

export const sortByOptions: MessageSortBy[] = [
  { value: 'desc', label: 'Newest first' },
  { value: 'asc', label: 'Oldest first' },
];
