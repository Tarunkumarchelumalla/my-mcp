import { MCPTool } from "mcp-framework";
import { z } from "zod";
class ExampleTool extends MCPTool {
    name = "example_tool";
    description = "Tool that geneates Intros ";
    schema = {
        message: {
            type: z.string(),
            description: "Message to process",
        },
        introId: {
            type: z.string(),
            description: "Id to keep in Mind for Each Introduction"
        }
    };
    async execute(input) {
    }
}
export default ExampleTool;
