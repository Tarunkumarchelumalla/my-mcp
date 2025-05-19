import { AppService } from './app.service';
export declare class AppController {
    private readonly appService;
    constructor(appService: AppService);
    getHello(body: {
        message: string;
        ticketId: string;
    }): Promise<{
        Table: import("@anthropic-ai/sdk/resources/messages").ContentBlock[];
    }>;
    getintrol(body: {
        IntroId: string;
    }): Promise<{
        Table: import("@anthropic-ai/sdk/resources/messages").ContentBlock[];
    }>;
}
