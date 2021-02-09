import { ChatRepository } from './repository/implementations/ChatRepostiory';
import socketIO from 'socket.io';
import http from 'http';
import { ChatSocketIO } from './helper/implementations/ChatSocketIO';
import { UserRepository } from './repository/implementations/UserRepository';
import userModel from '@/common/entities/User';
import atendimentoModel from '@/common/entities/Atendimento';
import { Twilio } from '@/common/providers/whatsapp/implements/Twilio';
const whatsappProvider = new Twilio();
const userRepository = new UserRepository(userModel);
const chatRepository = new ChatRepository(atendimentoModel);

function socketMiddleware(server: http.Server): void {
  new ChatSocketIO(
    socketIO(server),
    chatRepository,
    userRepository,
    whatsappProvider
  );
}

export default socketMiddleware;

export { socketMiddleware };
