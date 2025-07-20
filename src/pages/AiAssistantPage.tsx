import { useState } from "react";
import { 
  AccountantExpert, 
  BookkeeperExpert, 
  BusinessAdvisorExpert, 
  InvestmentManagerExpert 
} from "../ai/modules";
import { useAuth } from "../contexts/AuthContext";
import { Link } from "react-router-dom";

const experts = [
  AccountantExpert,
  BookkeeperExpert,
  BusinessAdvisorExpert,
  InvestmentManagerExpert,
];

const AiAssistantPage = () => {
  const { user } = useAuth();
  const [messages, setMessages] = useState<string[]>([]);
  const [input, setInput] = useState("");

  // הגנת הרשאות - רק ליועצים ומעלה
  if (user?.role === "owner") {
    return (
      <div className="min-h-screen bg-gray-50 p-6 flex items-center justify-center">
        <div className="max-w-md bg-white rounded-lg shadow-lg p-8 text-center">
          <div className="text-6xl mb-4">🤖</div>
          <h2 className="text-2xl font-bold text-orange-800 mb-4">AI מתקדם - גישה מוגבלת</h2>
          <p className="text-orange-600 mb-6">
            מערכת ה-AI המתקדמת זמינה ליועצים עסקיים ומנהלי מערכת בלבד.
          </p>
          <div className="space-y-3">
            <Link 
              to="/advisor"
              className="block bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition-colors"
            >
              🧠 נסה את היועץ החכם
            </Link>
            <Link 
              to="/dashboard"
              className="block bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition-colors"
            >
              🏠 חזרה לדשבורד
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = `👤 [אתה]: ${input}`;
    setMessages((prev) => [...prev, userMessage]);

    const expertPromises = experts.map((expert) => expert.ask(input));
    const expertReplies = await Promise.all(expertPromises);

    setMessages((prev) => [...prev, ...expertReplies]);
    setInput("");
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6" dir="rtl">
      <h1 className="text-3xl font-bold text-slate-800">
        העוזר העסקי החכם – ניתוח רב תחומי
      </h1>

      <form onSubmit={handleSubmit} className="flex space-x-2">
        <input
          type="text"
          placeholder="כתוב שאלה על העסק שלך..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 p-3 rounded-lg border text-right"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          שלח
        </button>
      </form>

      <div className="bg-white shadow rounded-lg p-4 space-y-3">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`p-2 rounded ${
              msg.startsWith("👤") ? "bg-slate-100" : "bg-slate-50"
            }`}
          >
            <pre className="whitespace-pre-wrap text-right">{msg}</pre>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AiAssistantPage;
