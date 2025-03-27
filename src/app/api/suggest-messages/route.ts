import axios from 'axios';

const API_KEY = process.env.GEMINI_API_KEY;

export async function POST() {
    const prompt = "Create a list of three open-ended and engaging questions formatted as a single string. Each question should be separated by '||'. These questions are for an anonymous social messaging platform, like Qooh.me, and should be suitable for a diverse audience. Avoid personal or sensitive topics, focusing instead on universal themes that encourage friendly interaction. For example, your output should be structured like this: 'What’s a hobby you’ve recently started?||If you could have dinner with any historical figure, who would it be?||What’s a simple thing that makes you happy?'. Ensure the questions are intriguing, foster curiosity, and contribute to a positive and welcoming conversational environment.";
    try {
        //API URL for gemini-2.0-flash
        const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`;
    
        // Correct payload format
        const requestBody = {
          contents: [
            {
              parts: [
                {
                  text: prompt, 
                },
              ],
            },
          ],
        };
    
        // Make API call to Gemini 2.0 Flash
        const response = await axios.post(url, requestBody, {
          headers: {
            'Content-Type': 'application/json',
          },
        });
    
        const output =
          response.data?.candidates?.[0]?.content?.parts?.[0]?.text ||
          'No response received.';
    
        return Response.json({ output });
      } catch (error: any) {
        console.error('Error:', error.response?.data || error.message);
        return Response.json(
          { error: 'Failed to generate response.' },
          { status: 500 }
        );
      }
    }