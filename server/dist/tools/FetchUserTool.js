import { MCPTool } from "mcp-framework";
import { z } from "zod";
class FetchUserTool extends MCPTool {
    name = "fetch-user";
    description = "A Tool that fetches user intro based on introlId and phone if exists";
    schema = {
        introlId: {
            type: z.string(),
            description: "Id number to process",
        },
        phone: {
            type: z.string(),
            description: "Id number to process",
        },
    };
    async execute(input) {
        console.log({ input });
    }
}
export default FetchUserTool;
