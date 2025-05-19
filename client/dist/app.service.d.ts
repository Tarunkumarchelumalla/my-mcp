import { AiService } from './utils/ai.service';
export declare class AppService {
    private Aiservice;
    constructor(Aiservice: AiService);
    getHello(body: {
        message: string;
        ticketId: string;
    }): Promise<import("@anthropic-ai/sdk/resources/messages").ContentBlock[]>;
    getIntro(body: {
        IntroId: string;
    }): Promise<import("@anthropic-ai/sdk/resources/messages").ContentBlock[]>;
}
