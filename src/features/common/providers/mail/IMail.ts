import { SentMessageInfo } from 'nodemailer';
import Mail from 'nodemailer/lib/mailer';

export interface IMailProvider {
  sendMail(message: Mail.Options): Promise<SentMessageInfo>;
}
