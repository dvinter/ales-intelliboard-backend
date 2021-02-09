import { ChatInfo, IAtendimentoChat, IChat, IChatMessage, Room } from '../Chat';
import SocketIO from 'socket.io';
import { IChatRepository } from '../../repository/IChatRepository';
import { IUserRepository } from '../../repository/IUserRepository';
import { ISocketMessage } from '../../SocketDTO';
import {
  IWhatsappProvider,
  messageType,
} from '@/common/providers/whatsapp/IWhatsapp';
export class ChatSocketIO implements IChat {
  private SOCKET_MESSAGES_LISTENER = {
    DISCONNECT: 'disconnect',
    JOIN_AGENT: 'joinAgent',
    JOIN_USER: 'joinUser',
    SEND_MESSAGE: 'sendMessage',
  };
  private SOCKET_MESSAGES_EMITER = {
    CLOSE_CHAT: 'closeChat',
    MESSAGE_STATUS_CHANGED: 'messageStatusChanged',
    BOT_STATE_CHANGED: 'botStateChanged',
    WHATSAPP_MESSAGE_RECEIVED: 'whatsappMessageReceived',
    USER_JOINED: 'userJoined',
    MESSAGE_RECEIVED: 'messageReceived',
    ALONE: 'alone',
    USER_DISCONNECTED: 'userDisconnected',
  };
  private PLATFORMS = {
    WHATSAPP: 'Whatsapp',
  };
  private ORIGIN = {
    ASSISTANT: 'Assistente',
  };
  private socket?: SocketIO.Socket;
  constructor(
    private socketInstance: SocketIO.Server,
    private atendimentoRepository: IChatRepository,
    private userRepository: IUserRepository,
    private whatsappProvider: IWhatsappProvider
  ) {
    this.socketInstance.on('connect', (socket) => {
      this.socket = socket;
      this.startSocketListeners();
    });
  }
  private startSocketListeners(): void {
    if (!this.socket) throw 'Missing socket';
    this.socket.on(this.SOCKET_MESSAGES_LISTENER.DISCONNECT, (): void =>
      this.emitUserDisconnected()
    );
    this.socket.on(
      this.SOCKET_MESSAGES_LISTENER.JOIN_AGENT,
      (room): Promise<void> => this.joinAgent(room)
    );
    this.socket.on(
      this.SOCKET_MESSAGES_LISTENER.JOIN_USER,
      (room): Promise<void> => this.joinUser(room)
    );
    this.socket.on(
      this.SOCKET_MESSAGES_LISTENER.SEND_MESSAGE,
      (message, io): Promise<void> => this.sendMessage(message, io)
    );
  }

  async joinUser(chatRoom: Room): Promise<void> {
    const { room }: { room: string } = chatRoom;
    const response = await this.userRepository.findByRoom(room);
    if (response) {
      const response = await this.atendimentoRepository.findById(room);
      if (!response) throw 'Missing atendimento';
      if (!this.socket) throw 'Missing socket connection';
      this.socket.join(room);
      this.emitUserJoined(
        {
          _id: room,
        },
        response,
        this.socket.id,
        false,
        true
      );
    }
  }
  async joinAgent(room: string): Promise<void> {
    this.socket?.join(room);
  }
  async sendMessage(message: IChatMessage, io: SocketIO.Server): Promise<void> {
    const { room } = message;
    const response = await this.atendimentoRepository.findById(room);
    if (!response) throw 'Missing Atendimento';
    const {
      platform,
      user: { userNumber, name },
    } = response;
    const hasRoom = io.sockets.adapter.rooms[room]?.length > 1;
    const messageData: ISocketMessage = {
      atendimentoId: message.id,
      room,
      name,
      message,
      userNumber,
      origin,
      platform,
    };
    if (hasRoom) {
      this.emitMessageReceived(room, message.message, origin);
      if (
        origin === this.ORIGIN.ASSISTANT &&
        platform === this.PLATFORMS.WHATSAPP
      ) {
        const { sid } = await this.whatsappProvider.sendMessage({
          content: message.message,
          to: userNumber,
          type: messageType.text,
        });
        messageData.MessageSid = sid;
      }
    } else if (platform === this.PLATFORMS.WHATSAPP) {
      const { sid } = await this.whatsappProvider.sendMessage({
        content: message.message,
        to: userNumber,
        type: messageType.text,
      });
      messageData.MessageSid = sid;
    } else {
      this.emitAlone(room);
    }
    this.atendimentoRepository.saveMessage(messageData);
  }
  private emitAlone(room: string): void {
    this.socket?.emit(this.SOCKET_MESSAGES_EMITER.ALONE, room);
  }
  private emitMessageReceived(
    room: string,
    message: string,
    origin: string
  ): void {
    this.socket?.broadcast
      .to(room)
      .emit(this.SOCKET_MESSAGES_EMITER.MESSAGE_RECEIVED, {
        message,
        room,
        origin,
      });
  }
  async emitUserJoined(
    chat: ChatInfo,
    atendimento: IAtendimentoChat,
    socketId: string | number,
    isWhatsapp = false,
    broadcast = false
  ): Promise<void> {
    const emitObject = {
      room: atendimento._id,
      user: atendimento.user,
      socketId,
      recipientId: chat._id,
      conversation: atendimento.messages,
      sector: atendimento.sector,
      isWhatsapp,
    };
    if (broadcast) {
      this.socket?.broadcast.emit(
        this.SOCKET_MESSAGES_EMITER.USER_JOINED,
        emitObject
      );
    } else {
      this.socket?.emit(this.SOCKET_MESSAGES_EMITER.USER_JOINED, emitObject);
    }
  }
  async emitWhatsappMessageReceived(
    room: string,
    message: string,
    origin: string,
    messageId: string,
    sector: string
  ): Promise<void> {
    this.socket?.emit(this.SOCKET_MESSAGES_EMITER.WHATSAPP_MESSAGE_RECEIVED, {
      message,
      room,
      origin,
      messageId,
      sector,
    });
  }
  async emitBotStateChanged(room: string, botState: boolean): Promise<void> {
    this.socket?.emit(this.SOCKET_MESSAGES_EMITER.BOT_STATE_CHANGED, {
      room,
      botState,
    });
  }
  async emitMessageStatusChanged(
    userNumber: string,
    messageId: string,
    messageStatus: string,
    id: string
  ): Promise<void> {
    this.socket?.emit(this.SOCKET_MESSAGES_EMITER.MESSAGE_STATUS_CHANGED, {
      number: userNumber,
      messageId,
      messageStatus,
      id,
    });
  }
  private emitUserDisconnected() {
    this.socket?.broadcast.emit(
      this.SOCKET_MESSAGES_EMITER.USER_DISCONNECTED,
      this.socket?.id
    );
  }
  async emitCloseChat(room: string): Promise<void> {
    this.socket?.emit(this.SOCKET_MESSAGES_EMITER.CLOSE_CHAT, { room });
  }
}
