export type TranscriptBlock = {
  // text: string;
  finalizedText: string;
};

export type Notes = {
  text: string;
  title: string;
};

const preparePreviousBlocksText = (blocks: TranscriptBlock[]): string => {
  return blocks.map((block, index) => `\n${block.finalizedText}\n`).join("\n");
};

export const preparePrompt = (
  previousTranscriptBlocks: TranscriptBlock[],
  previousNote: Notes,
  newTranscriptBlock: TranscriptBlock
): string => {
  const previousBlocksText = preparePreviousBlocksText(
    previousTranscriptBlocks
  );
  const previousNoteText = `Previous Notes: \n${previousNote.text}\n`;
  const newBlockText = `New Transcript text: \n${newTranscriptBlock.finalizedText}\n`;

  return `As a focused student, you're deeply engrossed in a video lecture on entrepreneurship and taking comprehensive study notes for future reference. Some parts of the video's transcript might be incorrect, and notes from earlier segments of the lecture have been provided.

Here are the segments from the previous transcript:

${previousBlocksText}

Here are the notes from previous segments:

${previousNoteText}

The new segment from the video's transcript is as follows:

${newBlockText}

Your goal is to extract key information and create additional study notes from this new part of the transcript. Aim for clarity, depth, and accuracy. Blend these new notes with the existing ones to maintain continuity and logical progression, as they will be appended to the current notes. Try to encapsulate the speaker's main points, arguments, and subtleties in your notes. When you return your notes, do so without using any labels or titles. Simply provide the pure note content.`;

  return `Imagine yourself as a dedicated student, thoroughly engaged in a video lecture on entrepreneurship and preparing detailed study notes for future revision. Here are certain portions from the video's transcript that might contain inaccuracies, along with some notes previously drafted about this lecture.\n\n${previousBlocksText}\n\n${previousNoteText}\n\nA new portion of the transcript is provided here:\n\n${newBlockText}\n\nYour task is to distill vital information and generate more study notes from this newly provided portion of the transcript. Strive for clarity, depth, and accuracy in your notes. Integrate your new notes with the existing ones ensuring the continuity and logical flow of the content, as they will be included at the end of the current notes. Try to capture the speaker's main points, arguments, and nuances in your notes. When you return your notes, do so without using any labels or titles. Simply return the pure note content.`;

  return `Imagine yourself as a dedicated student, thoroughly engaged in a video lecture on entrepreneurship and preparing detailed study notes for future revision. Here are certain portions from the video's transcript that might contain inaccuracies, along with some notes previously drafted about this lecture.\n\n${previousBlocksText}\n\n${previousNoteText}\n\nA new portion of the transcript is provided here:\n\n${newBlockText}\n\nYour task is to distill vital information and generate more study notes from this newly provided portion of the transcript. Strive for clarity, depth, and accuracy in your notes. Integrate your new notes with the existing ones ensuring the continuity and logical flow of the content, as they will be included at the end of the current notes. Try to capture the speaker's main points, arguments, and nuances in your notes. Please produce the content of your new notes without using any labels to preface them.`;

  return `Visualize yourself as a meticulous student, deeply immersed in a video lecture about entrepreneurship, and formulating comprehensive study notes for subsequent use. Presented below are excerpts from the video's transcript, which may contain some inaccuracies, accompanied by some previously prepared notes pertaining to the video lecture.\n\n${previousBlocksText}\n\n${previousNoteText}\n\nA new section of the transcript is now presented to you:\n\n${newBlockText}\n\nYour task is to extract crucial points and create additional study notes based on this new segment of the transcript. Aim for clarity, thoroughness, and accuracy in your notes. Link your new notes to the previous ones in a way that ensures the overall coherence and flow of the topic, as they will be appended to the end of the current notes. Endeavor to encapsulate the speaker's key ideas, arguments, and subtle messages in your notes. Please return the content of your new notes, without prefacing them with the label 'New Notes:'`;

  return `Envision yourself as a diligent student, thoroughly watching a video lecture on entrepreneurship and compiling meticulous study notes for future review. Below are excerpts from the video's transcript, which might contain some inaccuracies, accompanied by some previously prepared notes about the video lecture.\n\n${previousBlocksText}\n\n${previousNoteText}\n\nNow, a new block of the transcript has been presented to you:\n\n${newBlockText}\n\nYour task is to extract key insights and generate additional study notes from this new transcript section. When compiling your notes, aim for clarity, depth, and precision. Connect your new notes to the previous ones in a manner that maintains the flow and continuity of the subject matter, as they will be attached at the end of the existing notes. Try to reflect the main ideas, concepts, and the nuances of the speaker's message in your notes. Return only the text of the new notes you've created.`;

  return `Imagine that you are a student, attentively watching a video lecture and preparing study notes for future reference. Provided below are segments of the video's transcript, which may contain inaccuracies, and some notes previously prepared about this video lecture.\n\n${previousBlocksText}\n\n${previousNoteText}\n\nAlso provided is a new transcript block:\n\n${newBlockText}\n\nYour task is to create additional study notes based on this new block of the transcript. Please ensure your notes are clear, concise, and able to blend seamlessly with the pre-existing notes, as they will be added to the end. The end goal is to produce a cohesive and comprehensive set of study notes. Return only the newly added note text.`;

  return `Assume you are a learner watching a video and taking notes for later review. Here are some previous text blocks of the possibly inaccurate video transcript, along with some notes about this video.\n\n${previousBlocksText}\n${previousNoteText}\n${newBlockText}Please make additional study notes based on this new block for yourself as a learner, ensuring that they are coherent and well-integrated with the previous notes as they will be appended at the end. Just return the new notes text.`;
};

// Usage
// const prompt = preparePrompt(
//   previousTranscriptBlocks,
//   previousNotes,
//   newTransriptBlock
// );

export const preparePromptKorean = (
  previousTranscriptBlocks: TranscriptBlock[],
  previousNote: Notes,
  newTranscriptBlock: TranscriptBlock
): string => {
  const previousBlocksText = preparePreviousBlocksText(
    previousTranscriptBlocks
  );
  const previousNoteText = `이전 노트: \n${previousNote.text}\n`;
  const newBlockText = `새로운 트랜스크립트 텍스트: \n${newTranscriptBlock.finalizedText}\n`;

  return `당신은 창업에 관한 비디오 강의에 깊이 몰입한 열심히 공부하는 학생이라고 상상해보세요. 비디오의 일부 트랜스크립트는 잘못된 부분이 있을 수 있으며, 강의의 이전 세그먼트에 대한 노트가 제공됩니다.

다음은 이전 트랜스크립트의 세그먼트입니다:

${previousBlocksText}

다음은 이전 세그먼트의 노트입니다:

${previousNoteText}

비디오 트랜스크립트의 새 세그먼트는 다음과 같습니다:

${newBlockText}

당신의 목표는 이 새 부분의 트랜스크립트에서 핵심 정보를 추출하고 이를 기반으로 추가 학습 노트를 만드는 것입니다. 명확성, 깊이, 정확성을 목표로 노트를 작성하세요. 이 새로운 노트는 기존의 노트에 추가되어 연속성과 논리적 진행을 유지해야 합니다. 스피커의 주요 포인트, 논점, 그리고 미묘한 표현을 노트에 포함하세요. 노트를 반환할 때 레이블이나 제목을 사용하지 마세요. 순수한 노트 내용만 제공하세요.`;
};
