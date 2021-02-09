import { IMessagesRepository } from './repositories/IMessagesRepository';
export class MessagesUseCase {
  constructor(private messagesRepository: IMessagesRepository) {}
  async execute(
    id: string,
    message: string,
    context: unknown,
    misunderstood: boolean
  ): Promise<void> {
    return this.messagesRepository.upsert(
      id,
      message,
      JSON.stringify(context),
      misunderstood
    );
  }
}
