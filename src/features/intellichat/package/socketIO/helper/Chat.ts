import SocketIO from 'socket.io';
export interface IChatMessage {
  id: string;
  message: string;
  room: string;
  origin: string;
}

export interface IAtendimentoChat {
  _id: string;
  sector: string;
  messages: string[];
  user: {
    userNumber: string;
    name: string;
  };
  platform: string;
}

export interface ChatInfo {
  _id: string;
}

export interface Room {
  room: string;
}

export interface IChat {
  joinUser(room: Room): Promise<void>;
  joinAgent(room: string): Promise<void>; // it is a problem, but we need modify frontend first
  sendMessage(
    message: IChatMessage,
    io: SocketIO.Server
  ): Promise<void>;
  emitUserJoined(
    chat: ChatInfo,
    atendimento: IAtendimentoChat,
    socketId: string | number,
    isWhatsapp?: boolean,
    broadcast?: boolean
  ): Promise<void>;
  emitWhatsappMessageReceived(
    room: string,
    message: string,
    origin: string,
    messageId: string,
    sector: string
  ): Promise<void>;
  emitBotStateChanged(room: string, botState: boolean): Promise<void>;
  emitMessageStatusChanged(
    userNumber: string,
    messageId: string,
    messageStatus: string,
    id: string
  ): Promise<void>;
  emitCloseChat(room: string): Promise<void>;
}
