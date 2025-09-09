import { GoogleGenAI } from '@google/genai'

/**
 * Generate interview Q&A JSON array using Google GenAI.
 * Returns an array of objects: [{ question, answer }, ...]
 */
export async function generateInterviewQuestions(jobPosition, jobExperience, jobDescription) {
  const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error('Missing NEXT_PUBLIC_GEMINI_API_KEY');
  }

  const prompt = `Generate 5 JSON formatted interview questions and answers for a ${jobPosition} with ${jobExperience} years of experience, specializing in ${jobDescription}. The questions should cover a range of topics including React, JavaScript, and Tailwind CSS. Each question should be followed by a concise and accurate answer. Ensure the questions are relevant to the experience level and provide insights into both fundamental and advanced concepts. Format the output as a JSON array with each entry containing a "question" and an "answer" field.`;

  const genAI = new GoogleGenAI({ apiKey });

  // Use models.generateContent based on available surface from @google/genai v1.16.0
  const result = await genAI.models.generateContent({
    model: 'gemini-1.5-flash',
    contents: [{ role: 'user', parts: [{ text: prompt }] }],
  });

  // Normalize possible response shapes
  let text;
  if (result?.response?.text) {
    text = result.response.text();
  } else if (result?.text) {
    text = result.text;
  } else if (result?.candidates?.[0]?.content?.parts?.[0]?.text) {
    text = result.candidates[0].content.parts[0].text;
  } else {
    throw new Error('Unexpected response structure from AI');
  }

  // Parse JSON; if it fails, return single-item error payload
  try {
    // Clean the text - remove markdown code blocks if present
    let cleanText = text.trim();
    
    // Remove ```json and ``` markers
    if (cleanText.startsWith('```json')) {
      cleanText = cleanText.replace(/^```json\s*/, '').replace(/\s*```$/, '');
    } else if (cleanText.startsWith('```')) {
      cleanText = cleanText.replace(/^```\s*/, '').replace(/\s*```$/, '');
    }
    
    // Remove any leading/trailing whitespace
    cleanText = cleanText.trim();
    
    console.log('Cleaned text for parsing:', cleanText);
    
    const parsed = JSON.parse(cleanText);
    return parsed;
  } catch (err) {
    console.error('JSON parsing failed:', err);
    console.log('Raw text that failed to parse:', text);
    return [{ question: 'Error parsing response', answer: text }];
  }
}


