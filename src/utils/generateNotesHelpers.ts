export type TranscriptBlock = {
  text: string;
};

export type Notes = {
  text: string;
  title: string;
};

const preparePreviousBlocksText = (blocks: TranscriptBlock[]): string => {
  return blocks
    .map(
      (block, index) => `**Block ${index + 1} Transcript:**\n${block.text}\n`
    )
    .join("\n");
};

export const preparePrompt = (
  previousTranscriptBlocks: TranscriptBlock[],
  previousNote: Notes,
  newTranscriptBlock: TranscriptBlock
): string => {
  const previousBlocksText = preparePreviousBlocksText(
    previousTranscriptBlocks
  );
  const previousNoteText = `**Previous Notes:**\n${previousNote.text}\n`;
  const newBlockText = `**New Block Transcript:**\n${newTranscriptBlock.text}\n`;

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
