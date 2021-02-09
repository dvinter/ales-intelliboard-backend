import { IMessagesDTO } from './MessagesDTO';
import { IMessagesRepository } from './repositories/IMessagesRepository';
export class MessagesUseCase {
  constructor(private messagesRepository: IMessagesRepository) {}
  async execute(id: string): Promise<IMessagesDTO | null> {
    const data = await this.messagesRepository.findById(id);
    if (data) {
      data.messages = data?.messages?.map((message) => ({
        ...message,
        from:
          message.text.split(':')[0] === 'Assistente'
            ? 'Assistente'
            : 'Usuário',
      }));
    }
    return data;
  }
}
