import { Anthropic } from '@anthropic-ai/sdk';
import type { Tool } from '@anthropic-ai/sdk/resources/messages/messages';
export declare class AiService {
    private mcp;
    private llm;
    private transport;
    tools: Tool[];
    private readonly CLAUDE_AI_MODEL;
    private readonly ANTHROPIC_API_KEY;
    constructor();
    private connectToServer;
    processQuery(url: string, query: string): Promise<Anthropic.Messages.ContentBlock[]>;
    cleanup(): Promise<void>;
}
