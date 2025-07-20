import { openai } from "../core/openaiClient";

export const AccountantExpert = {
  name: "רואה חשבון",
  emoji: "�",
  ask: async (question: string) => {
    const prompt = `אתה רואה חשבון בכיר עם ניסיון של 20 שנה. ענה בעברית בצורה מקצועית ומעשית. התמחה במיסוי, דוחות חשבונאיים, מאזנים ודוח רווח והפסד. שאלה: ${question}`;
    
    try {
      const response = await openai.chat.completions.create({
        model: "gpt-4",
        messages: [{ role: "user", content: prompt }],
        max_tokens: 300,
        temperature: 0.7,
      });

      const answer = response.choices[0].message?.content || "מצטער, לא הצלחתי לענות על השאלה.";
      return `� [רואה חשבון]: ${answer}`;
    } catch (error) {
      return `� [רואה חשבון]: מצטער, יש בעיה בשירות. אנא נסה שוב מאוחר יותר.`;
    }
  },
};
