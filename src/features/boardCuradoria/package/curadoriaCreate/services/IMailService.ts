import { SentMessageInfo } from 'nodemailer';
import Mail from 'nodemailer/lib/mailer';

export interface IMailService {
  sendMail(infos: Mail.Options): Promise<SentMessageInfo>;
}
