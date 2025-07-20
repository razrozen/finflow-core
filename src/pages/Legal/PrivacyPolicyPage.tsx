const PrivacyPolicyPage = () => {
  return (
    <div className="p-8 max-w-4xl mx-auto space-y-6 text-right" dir="rtl">
      <h1 className="text-3xl font-bold text-slate-800">מדיניות פרטיות</h1>
      <p className="text-slate-600">
        אנו ב-FinFlow מתחייבים לשמירה על פרטיותך. המידע שתספק ישמש לצורכי השירות בלבד ולא יועבר לצד ג' ללא הסכמתך.
      </p>
      <ul className="list-disc pr-6 space-y-2 text-slate-600">
        <li>שמירת נתונים מינימלית, מוצפנת ומאובטחת.</li>
        <li>שימוש במידע רק לשיפור השירות.</li>
        <li>המשתמש רשאי לבקש לעיין, לעדכן או למחוק את פרטיו בכל עת.</li>
        <li>השימוש בפלטפורמה מהווה הסכמה למדיניות זו.</li>
      </ul>
    </div>
  );
};

export default PrivacyPolicyPage;
