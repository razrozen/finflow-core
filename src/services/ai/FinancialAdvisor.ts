// src/services/ai/FinancialAdvisor.ts
export function generateFinancialStrategy(monthlyRevenue: number): string {
  if (monthlyRevenue < 10000) {
    return "המלצה: הגבר מכירות דרך פרסום דיגיטלי. הפחת הוצאות קבועות ב-15%.";
  } else if (monthlyRevenue < 50000) {
    return "המלצה: בצע אופטימיזציה על תזרים המזומנים. שקול השקעות קטנות.";
  } else {
    return "המלצה: התחל לבנות תשתית להשקעות לטווח ארוך ופתח מוצרים פסיביים.";
  }
}
