import { IMailProvider } from '@/common/providers/mail/IMail';
import { IMailService } from '../IMailService';
import Mail from 'nodemailer/lib/mailer';
import { SentMessageInfo } from 'nodemailer';

export class MailService implements IMailService {
  constructor(private mailProvider: IMailProvider) {}

  async sendMail(infos: Mail.Options): Promise<SentMessageInfo> {
    return this.mailProvider.sendMail(infos);
  }
}
