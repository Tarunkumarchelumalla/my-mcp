import { Body, Controller, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('/ai-answer')
 async getHello(@Body() body: {
    message:string;
    ticketId:string;
  }) {
    const result = await this.appService.getHello(body);
    return {
      Table:result
    }
  }
  @Post('/ai/processIntro')
 async getintrol(@Body() body: {
    IntroId:string;
  }) {
    const result = await this.appService.getIntro(body);
    return {
      Table:result
    }
  }
}
