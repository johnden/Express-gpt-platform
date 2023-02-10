import { Injectable, Logger } from '@nestjs/common'
// import { ChatGPTAPI } from 'chatgpt'
import { oraPromise } from 'ora'
export const importDynamic = new Function('modulePath', 'return import(modulePath)');


@Injectable()
export class AppService {
  gptApi: any;
  private readonly logger = new Logger(AppService.name);

  constructor() {}

  async onModuleInit() {
    await this.initGPT();
  }

  async initGPT() {
    const { ChatGPTAPIBrowser } = await importDynamic('chatgpt')
    try {
      this.logger.log('Initing GPT')
      // const chatgpt = await import('chatgpt')
      // const api = new ChatGPTAPI({ apiKey: process.env.OPENAI_API_KEY })
      const api = new ChatGPTAPIBrowser({ apiKey: process.env.OPENAI_API_KEY })
      this.gptApi = api
    } catch (e) {
      console.log(e)
    }
  }

  async sendMessage(
    message: string,
    conversationId: string | undefined,
    parentMessageId: string | undefined,
  ): Promise<string> {
    this.logger.log(`Send Message ${message}`);
    let response: string | undefined;
    if (!conversationId) {
      response = await this.gptApi.sendMessage(message, {
        timeoutMs: 2 * 60 * 1000,
      });
    } else {
      response = await this.gptApi.sendMessage(message, {
        conversationId,
        parentMessageId,
        timeoutMs: 2 * 60 * 1000,
      });
    }
    return response ?? '';
    // return message
  }


}
