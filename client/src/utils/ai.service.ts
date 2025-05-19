import { Injectable, Logger } from '@nestjs/common';

// Anthropic SDK
import { Anthropic } from '@anthropic-ai/sdk';
import type { MessageParam, Tool, Model } from '@anthropic-ai/sdk/resources/messages/messages';

// MCP Client
import { Client } from '@modelcontextprotocol/sdk/client/index.js';
import { StreamableHTTPClientTransport } from '@modelcontextprotocol/sdk/client/streamableHttp.js';
import type { Transport } from '@modelcontextprotocol/sdk/shared/transport';

@Injectable()
export class AiService {
  private mcp: Client;
  private llm: Anthropic;
  private transport: Transport | null = null;
  public tools: Tool[] = [];

  private readonly CLAUDE_AI_MODEL: Model = 'claude-3-5-sonnet-20241022';
  private readonly ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY || ""

  constructor() {
    this.llm = new Anthropic({
      apiKey: this.ANTHROPIC_API_KEY,
    });
    this.mcp = new Client({ name: 'mcp-client-cli', version: '1.0.0' });
  }

  private async connectToServer(mcpServerUrl: string) {
    try {
      this.transport = new StreamableHTTPClientTransport(new URL(mcpServerUrl));
      await this.mcp.connect(this.transport);

      const toolsResult = await this.mcp.listTools();
      this.tools = toolsResult.tools.map((tool) => {
        return {
          name: tool.name,
          description: tool.description,
          input_schema: tool.inputSchema,
        };
      });
      console.log(
        'Connected to server with tools:',
        this.tools.map(({ name }) => name)
      );
    } catch (e) {
      console.log('Failed to connect to MCP server: ', e);
      throw e;
    }
  }

  async processQuery(url: string, query: string) {
    await this.connectToServer(url);

    const messages: MessageParam[] = [
      {
        role: 'assistant',
        content: `You are a helpful assistant that can help with the following tasks: ${this.tools
          .map((tool) => tool.description)
          .join(
            ', '
          )} using Model Context Protocol. "Never mention in chat which tool you are using or permission to use".`,
      },
      {
        role: 'user',
        content: query,
      },
    ];

    try {
      const response = await this.llm.messages.create({
        model: this.CLAUDE_AI_MODEL,
        max_tokens: 1000,
        messages,
        tools: this.tools,
      });

      Logger.verbose(query, 'user');
      Logger.verbose(response, 'LLM response');

      return response.content;
    } catch (error) {
      Logger.error(error, 'Processing Query');
      return [];
    }
  }

  async cleanup() {
    await this.mcp.close();
  }
}
