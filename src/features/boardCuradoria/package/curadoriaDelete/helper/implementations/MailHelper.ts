import fs from 'fs';
import path from 'path';
import hogan from 'hogan.js';

import { IMailFields, IMailHelper } from '../IMailHelper';
import { MailService } from '../../services/implementations/MailService';
import { ICuradoriaDTO } from '../../CuradoriaDTO';
import { emailHeaderColors, REMOVE_ACTION } from '../constants';
import getConfig from 'next/config';

const { serverRuntimeConfig } = getConfig();

export class MailHelper implements IMailHelper {
  constructor(private mailService: MailService) {}

  sendCuradoriaItemDeletedMail(infos: IMailFields): void {
    const template = fs.readFileSync(
      path.join(serverRuntimeConfig.TEMPLATES_FOLDER, 'curadoria.html'),
      'utf-8'
    );
    const compiledTemplate = hogan.compile(template);
    const fields = infos.alteredFields?.length
      ? `Campos alterados: ${infos.alteredFields.join(', ')}`
      : '';

    const data = {
      project: infos.project,
      subject: infos.newData?.subject || infos.oldData?.subject,
      acao: REMOVE_ACTION,
      color: emailHeaderColors[REMOVE_ACTION],
      alteredFields: fields,
      fieldsTable: this.generateFieldsTable(infos.newData, infos.oldData),
      answerTable: this.generateAnswerTable(infos.newData, infos.oldData),
      questionsTable: this.generateQuestionsTable(infos.newData, infos.oldData),
    };

    this.mailService.sendMail({
      to: process.env.EMAIL_RECEIVER,
      subject: `Curadoria - ${infos.project} - ${REMOVE_ACTION} - ${infos.newData?.subject} - ${process.env.CLIENT_NAME}`,
      html: compiledTemplate.render(data),
    });
  }

  private generateQuestionsTable(
    newData?: ICuradoriaDTO,
    oldData?: ICuradoriaDTO
  ) {
    const maxLength = Math.max(
      newData?.examples?.length ?? 0,
      oldData?.examples?.length ?? 0
    );
    let table = '<h3>Exemplos de perguntas</h3><table style="width:100%">';
    table += '<tr> <th>Valores anteriores</th> <th>Novos valores</th> </tr>';
    for (let i = 0; i < maxLength; i++) {
      table += `
      <tr> 
        <td>${
          oldData?.examples && oldData.examples[i]
            ? oldData.examples[i].text
            : ''
        }</td> 
        <td>${
          newData?.examples && newData.examples[i]
            ? newData.examples[i].text
            : ''
        }</td>
      </tr>`;
    }
    table += '</table>';
    return table;
  }

  private generateAnswerTable(
    newData?: ICuradoriaDTO,
    oldData?: ICuradoriaDTO
  ) {
    let table = '<h3>Resposta</h3><table style="width:100%">';
    table += '<tr> <th>Valores anteriores</th> <th>Novos valores</th> </tr>';
    table += `<tr> <td>${oldData?.expectedOutput}</td> <td>${newData?.expectedOutput}</td> </tr>`;
    table += '</table>';
    return table;
  }

  private generateFieldsTable(
    newData?: ICuradoriaDTO,
    oldData?: ICuradoriaDTO
  ) {
    const fields = [
      { title: 'Assunto', field: 'subject' },
      { title: 'Flag', field: 'flag' },
    ];

    let table = '<table style="width:100%">';
    table +=
      '<tr> <th></th> <th>Valores anteriores</th> <th>Novos valores</th> </tr>';
    fields.forEach((item) => {
      table += `
      <tr> 
        <td>${item.title}</td> 
        <td>${oldData?.get(item.field)}</td> 
        <td>${newData?.get(item.field)}</td> 
      </tr>`;
    });

    table += '</table>';
    return table;
  }
}
