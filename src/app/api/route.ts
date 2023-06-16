import { OpenAIStream, OpenAIStreamPayload } from "@/utils/openAIStream";
import {
  TranscriptBlock,
  Notes,
  preparePrompt,
} from "@/utils/generateNotesHelpers";
const cors = require("cors");

if (!process.env.OPENAI_API_KEY) {
  throw new Error("Missing env var from OpenAI");
}

export const runtime = "edge"; // 'nodejs' (default) | 'edge'

export async function POST(req: Request): Promise<Response> {
  const { newTransriptBlock, previousTranscriptBlocks, previousNotes } =
    (await req.json()) as {
      newTransriptBlock: TranscriptBlock;
      previousTranscriptBlocks: TranscriptBlock[];
      previousNotes: Notes;
    };

  let missingParams = [];

  if (!newTransriptBlock) {
    missingParams.push("newTransriptBlock");
  }
  if (!previousTranscriptBlocks) {
    missingParams.push("previousTranscriptBlocks");
  }
  if (!previousNotes) {
    missingParams.push("previousNotes");
  }

  if (missingParams.length) {
    return new Response(
      `Missing required parameter(s) in the request: ${missingParams.join(
        ", "
      )}`,
      { status: 400 }
    );
  }

  const payload: OpenAIStreamPayload = {
    model: "gpt-3.5-turbo-16k",
    messages: [
      {
        role: "system",
        content:
          "You are tasked with generating additional study notes based on a new block of a video transcript. The new block builds upon previous ones. Generate notes for the new block only and ensure they coherently follow on from the existing notes. Please do not repeat any information already captured in the previous notes",
      },
      {
        role: "user",
        content: preparePrompt(
          previousTranscriptBlocks,
          previousNotes,
          newTransriptBlock
        ),
      },
    ],
    temperature: 0.7,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
    max_tokens: 1000,
    stream: true,
    n: 1,
  };

  const stream = await OpenAIStream(payload);
  return new Response(stream, {
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
  });
}
