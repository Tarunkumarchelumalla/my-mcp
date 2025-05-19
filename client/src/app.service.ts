import { Injectable } from '@nestjs/common';
import { AiService } from './utils/ai.service';

@Injectable()
export class AppService {

  constructor(private Aiservice:AiService){

  }

  async getHello( body: {
    message:string;
    ticketId:string;
  }) {

    return await this.Aiservice.processQuery('http://localhost:1337/mcp',`
      query=${body.message},
      introId=${body.ticketId},
      `)

  }
  async getIntro( body: {
    IntroId:string;
  }) {

    return await this.Aiservice.processQuery('http://localhost:1337/mcp',`
      query=${body.IntroId},
      phone=${ "6664465"},
      introId=${body.IntroId},
      `)

  }
}
