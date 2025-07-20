import { openai } from "../core/openaiClient";

export const BusinessAdvisorExpert = {
  name: "יועץ עסקי",
  emoji: "💼",
  ask: async (question: string) => {
    const prompt = `אתה יועץ עסקי אסטרטגי עם ניסיון של 15 שנה. התמחותך באסטרטגיה עסקית, ניתוח שוק, פיתוח יתרון תחרותי וחדשנות עסקית. ענה בעברית בצורה אסטרטגית ומעשית. שאלה: ${question}`;
    
    try {
      const response = await openai.chat.completions.create({
        model: "gpt-4",
        messages: [{ role: "user", content: prompt }],
        max_tokens: 300,
        temperature: 0.7,
      });

      const answer = response.choices[0].message?.content || "מצטער, לא הצלחתי לענות על השאלה.";
      return `💼 [יועץ עסקי]: ${answer}`;
    } catch (_error) {
      return `💼 [יועץ עסקי]: מצטער, יש בעיה בשירות. אנא נסה שוב מאוחר יותר.`;
    }
  },
};
