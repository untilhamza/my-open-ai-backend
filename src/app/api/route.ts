import { OpenAIStream, OpenAIStreamPayload } from "@/utils/openAIStream";
import {
  TranscriptBlock,
  Notes,
  preparePrompt,
} from "@/utils/generateNotesHelpers";
import { NextResponse } from "next/server";

if (!process.env.OPENAI_API_KEY) {
  throw new Error("Missing env var from OpenAI");
}

const whitelist = ["http://localhost:3000", "https://localhost:3000"];

function setCorsHeaders(response: NextResponse, origin: string | null) {
  response.headers.set("Access-Control-Allow-Origin", origin || "*");
  response.headers.set(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS"
  );
  response.headers.set(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization"
  );
  response.headers.set("Access-Control-Max-Age", "86400");
  console.log("response in cor func ", response);
  console.log("origin in cors func", origin);
  // allow all subdomains of 'slid.cc'
  // if (origin?.endsWith(".slid.cc")) {
  //   whitelist.push(origin);
  // }

  // if (!origin || whitelist.indexOf(origin) !== -1) {
  //   response.headers.set("Access-Control-Allow-Origin", origin || "*");
  //   response.headers.set(
  //     "Access-Control-Allow-Methods",
  //     "GET, POST, PUT, DELETE, OPTIONS"
  //   );
  //   response.headers.set(
  //     "Access-Control-Allow-Headers",
  //     "Content-Type, Authorization"
  //   );
  //   response.headers.set("Access-Control-Max-Age", "86400");
  // }
}

export async function OPTIONS(request: Request) {
  const allowedOrigin = request.headers.get("origin");
  console.log("OPTIONS found origin ", allowedOrigin);

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

export async function GET(request: Request) {
  const allowedOrigin = request.headers.get("origin");
  console.log("GET found origin ", allowedOrigin);

  const response = new NextResponse("Hello, Next.js!", {
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

  const allowedOrigin = req.headers.get("origin");

  console.log("post found origin ", allowedOrigin);

  const stream = await OpenAIStream(payload);
  const response = new NextResponse(stream, {
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
