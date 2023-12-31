import { OpenAIStream, OpenAIStreamPayload } from "@/utils/openAIStream";
import {
  TranscriptBlock,
  Notes,
  preparePrompt,
  preparePromptKorean,
} from "@/utils/generateNotesHelpers";
import { NextResponse } from "next/server";

if (!process.env.OPENAI_API_KEY) {
  throw new Error("Missing env var from OpenAI");
}

export async function OPTIONS(request: Request) {
  const allowedOrigin = request.headers.get("origin");
  const response = new NextResponse(null, {
    status: 200,
    headers: {
      "Access-Control-Allow-Origin": allowedOrigin || "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
      "Access-Control-Allow-Headers":
        "Content-Type, Authorization, X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Date, X-Api-Version",
      "Access-Control-Max-Age": "86400",
    },
  });

  return response;
}

export async function POST(req: Request): Promise<Response> {
  const {
    newTransriptBlock,
    previousTranscriptBlocks,
    previousNotes,
    language,
  } = (await req.json()) as {
    newTransriptBlock: TranscriptBlock;
    previousTranscriptBlocks: TranscriptBlock[];
    previousNotes: Notes;
    language: string;
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
        content:
          language === "한국어"
            ? preparePromptKorean(
                previousTranscriptBlocks,
                previousNotes,
                newTransriptBlock
              )
            : preparePrompt(
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
  const response = new NextResponse(stream);

  return response;
}
