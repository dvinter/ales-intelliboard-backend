import nodemailer, { SentMessageInfo } from 'nodemailer';
import smtpTransport from 'nodemailer-smtp-transport';
import Mail from 'nodemailer/lib/mailer';

import { IMailProvider } from '../IMail';

export class MailProvider implements IMailProvider {
  private transporter;
  private emailUser;
  constructor(
    emailHost: string,
    emailPort: number,
    emailUser: string,
    emailPass: string,
    tlsCipher = 'SSLv3',
    tlsRejectUnauthorized = false
  ) {
    this.emailUser = emailUser;

    const transportOptions = smtpTransport({
      host: emailHost,
      port: emailPort,
      auth: {
        user: emailUser,
        pass: emailPass,
      },
      tls: {
        ciphers: tlsCipher,
        rejectUnauthorized: tlsRejectUnauthorized,
      },
    });
    this.transporter = nodemailer.createTransport(transportOptions);
  }

  sendMail(infos: Mail.Options): Promise<SentMessageInfo> {
    return this.transporter.sendMail({ ...infos, from: this.emailUser });
  }
}
