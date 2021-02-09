export enum messageType {
  text = 'text',
  image = 'img',
  audio = 'audio',
  video = 'video',
}
interface IMessage {
  type: messageType;
  content: string;
}

export interface IWhatsappMessage extends IMessage {
  from?: string;
  to: string;
}

export interface IWhatsappResponse {
  sid: string;
}

export interface IWhatsappProvider {
  sendMessage(message: IWhatsappMessage): Promise<IWhatsappResponse>;
}
