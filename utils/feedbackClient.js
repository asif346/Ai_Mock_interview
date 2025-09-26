import { GoogleGenAI } from '@google/genai'

/**
 * Generate interview Q&A JSON array using Google GenAI.
 * Returns an array of objects: [{ question, answer }, ...]
 */
export async function GenerateFeedback(MockInterviewQuestion,UserAnswer,activeQuestionIndex,question) {
  const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error('Missing NEXT_PUBLIC_GEMINI_API_KEY');
  }

    const feedbackPrompt='Question:'+MockInterviewQuestion[activeQuestionIndex]?.question+
      ', User Answer:'+UserAnswer+', Depends on a question and user answer for given interview Question'+
      'please give use rating for answer and feedback as area of improvement if any'+
      'in just 3 to 5 lines to improve it in JSON format with rating field adn feedback field'

    const genAI = new GoogleGenAI({ apiKey });

  // Use models.generateContent based on available surface from @google/genai v1.16.0
  const result = await genAI.models.generateContent({
    model: 'gemini-2.0-flash',
    contents: [{ role: 'user', parts: [{ text: feedbackPrompt }] }],
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
