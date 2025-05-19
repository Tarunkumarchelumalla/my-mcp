import { MCPTool } from "mcp-framework";
import { z } from "zod";

interface FetchUserInput {
  introlId: string;
  phone:string;
}

class FetchUserTool extends MCPTool<FetchUserInput> {
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

  async execute(input: FetchUserInput) {
    console.log({input})
  }
}

export default FetchUserTool;