"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AiService = void 0;
const common_1 = require("@nestjs/common");
const sdk_1 = require("@anthropic-ai/sdk");
const index_js_1 = require("@modelcontextprotocol/sdk/client/index.js");
const streamableHttp_js_1 = require("@modelcontextprotocol/sdk/client/streamableHttp.js");
let AiService = class AiService {
    mcp;
    llm;
    transport = null;
    tools = [];
    CLAUDE_AI_MODEL = 'claude-3-5-sonnet-20241022';
    ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY || "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";
    constructor() {
        this.llm = new sdk_1.Anthropic({
            apiKey: this.ANTHROPIC_API_KEY,
        });
        this.mcp = new index_js_1.Client({ name: 'mcp-client-cli', version: '1.0.0' });
    }
    async connectToServer(mcpServerUrl) {
        try {
            this.transport = new streamableHttp_js_1.StreamableHTTPClientTransport(new URL(mcpServerUrl));
            await this.mcp.connect(this.transport);
            const toolsResult = await this.mcp.listTools();
            this.tools = toolsResult.tools.map((tool) => {
                return {
                    name: tool.name,
                    description: tool.description,
                    input_schema: tool.inputSchema,
                };
            });
            console.log('Connected to server with tools:', this.tools.map(({ name }) => name));
        }
        catch (e) {
            console.log('Failed to connect to MCP server: ', e);
            throw e;
        }
    }
    async processQuery(url, query) {
        await this.connectToServer(url);
        const messages = [
            {
                role: 'assistant',
                content: `You are a helpful assistant that can help with the following tasks: ${this.tools
                    .map((tool) => tool.description)
                    .join(', ')} using Model Context Protocol. "Never mention in chat which tool you are using or permission to use".`,
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
            common_1.Logger.verbose(query, 'user');
            common_1.Logger.verbose(response, 'LLM response');
            return response.content;
        }
        catch (error) {
            common_1.Logger.error(error, 'Processing Query');
            return [];
        }
    }
    async cleanup() {
        await this.mcp.close();
    }
};
exports.AiService = AiService;
exports.AiService = AiService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], AiService);
//# sourceMappingURL=ai.service.js.map