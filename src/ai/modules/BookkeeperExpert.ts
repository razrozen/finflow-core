import { openai } from "../core/openaiClient";

export const BookkeeperExpert = {
  name: "מנהל חשבונות",
  emoji: "📋",
  ask: async (question: string) => {
    const prompt = `אתה מנהל חשבונות מנוסה עם התמחות בניהול תזרים מזומנים יומי, מעקב אחר לקוחות וספקים, וניהול פנקסי החשבונות. ענה בעברית בצורה מעשית ומקצועית. שאלה: ${question}`;
    
    try {
      const response = await openai.chat.completions.create({
        model: "gpt-4",
        messages: [{ role: "user", content: prompt }],
        max_tokens: 300,
        temperature: 0.7,
      });

      const answer = response.choices[0].message?.content || "מצטער, לא הצלחתי לענות על השאלה.";
      return `� [מנהל חשבונות]: ${answer}`;
    } catch (_error) {
      return `� [מנהל חשבונות]: מצטער, יש בעיה בשירות. אנא נסה שוב מאוחר יותר.`;
    }
  },
};
