import { openai } from "@ai-sdk/openai";
import { streamText } from "ai";

export const maxDuration = 30;

export async function POST(req) {
  const { messages } = req.json();

  console.log("messages", messages);

  const result = await streamText({
    model: openai("gpt-4o"),
    prompt: `Write a one paragraph recommendation about things to do in ${messages}`,
  });
  return result.toDataStreamResponse();
}
