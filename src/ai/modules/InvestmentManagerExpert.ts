import { openai } from "../core/openaiClient";

export const InvestmentManagerExpert = {
  name: "מנהל השקעות",
  emoji: "📈",
  ask: async (question: string) => {
    const prompt = `אתה מנהל השקעות מקצועי עם ניסיון של 12 שנה בשוקי ההון. התמחותך בניתוח פיננסי, פיזור סיכונים, בניית תיק השקעות וניתוח יחס תשואה-סיכון. ענה בעברית בצורה מקצועית עם המלצות מעשיות. שאלה: ${question}`;
    
    try {
      const response = await openai.chat.completions.create({
        model: "gpt-4",
        messages: [{ role: "user", content: prompt }],
        max_tokens: 300,
        temperature: 0.7,
      });

      const answer = response.choices[0].message?.content || "מצטער, לא הצלחתי לענות על השאלה.";
      return `📈 [מנהל השקעות]: ${answer}`;
    } catch (error) {
      return `📈 [מנהל השקעות]: מצטער, יש בעיה בשירות. אנא נסה שוב מאוחר יותר.`;
    }
  },
};
