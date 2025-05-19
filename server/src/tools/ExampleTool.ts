import { MCPTool } from "mcp-framework";
import { z } from "zod";

interface ExampleInput {
  message: string;
  introId:string;
}

class ExampleTool extends MCPTool<ExampleInput> {
  name = "example_tool";
  description = "Tool that geneates Intros ";

  schema = {
    message: {
      type: z.string(),
      description: "Message to process",
    },

    introId:{
      type:z.string(),
      description:"Id to keep in Mind for Each Introduction"
    }

  };

  async execute(input: ExampleInput) {
   
  }
}

export default ExampleTool;