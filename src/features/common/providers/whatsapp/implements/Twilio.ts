import {
  IWhatsappMessage,
  IWhatsappProvider,
  IWhatsappResponse,
} from '../IWhatsapp';
import twilio from 'twilio';
export class Twilio implements IWhatsappProvider {
  private client;
  constructor(
    private approvedNumber?: string,
    accountSid?: string,
    authToken?: string
  ) {
    this.client = twilio(
      accountSid ?? process.env.TWILIO_ACCOUNT_SID,
      authToken ?? process.env.TWILIO_AUTH_TOKEN
    );
  }
  async sendMessage(message: IWhatsappMessage): Promise<IWhatsappResponse> {
    const response = await this.client.messages.create({
      to: message.to,
      body: message.content,
      from: message.from ?? this.approvedNumber,
    });
    return {
      sid: response.sid,
    };
  }
}
