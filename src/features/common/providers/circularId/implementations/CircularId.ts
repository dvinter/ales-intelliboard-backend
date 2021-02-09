import { ICircularId } from '../ICircularId';
import axios, { AxiosInstance } from 'axios';
export class CircularId implements ICircularId {
  private api: AxiosInstance;
  private ENDPOINTS = {
    getUUID: '/api/uuid',
  };
  constructor() {
    if (!process.env.SESSION_BASE_URL)
      throw {
        message: 'Missing SESSION_BASE_URL',
      };
    this.api = axios.create({
      baseURL: process.env.SESSION_BASE_URL,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
  async getId(projectName: string): Promise<string> {
    const {
      data: { id },
    } = await this.api.get(this.ENDPOINTS.getUUID, {
      params: {
        project: projectName,
      },
    });
    return id;
  }
}
