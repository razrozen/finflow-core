const TermsOfUsePage = () => {
  return (
    <div className="p-8 max-w-4xl mx-auto space-y-6 text-right" dir="rtl">
      <h1 className="text-3xl font-bold text-slate-800">תנאי שימוש</h1>
      <p className="text-slate-600">
        השימוש בשירות FinFlow כפוף לתנאים הבאים. המשך השימוש מהווה הסכמה מלאה להם:
      </p>
      <ul className="list-disc pr-6 space-y-2 text-slate-600">
        <li>אין לעשות שימוש לרעה בשירות.</li>
        <li>השירות מסופק כפי שהוא (As-Is), ללא אחריות מוחלטת.</li>
        <li>הקניין הרוחני שייך לבעל המערכת בלבד.</li>
        <li>השירות עשוי להשתנות או להיפסק בכל עת.</li>
      </ul>

      <h2 className="text-xl font-bold text-slate-700 mt-6">📌 סעיף 7 – בעלות על קניין רוחני (IP Ownership)</h2>
      <p className="text-slate-600">
        כלל הקוד, האלגוריתמים, התוכן והעיצוב שנוצרו במערכת זו שייכים באופן בלעדי לבעל המיזם. אין לעשות כל שימוש חוזר, העתקה, או מסירה לצד ג' ללא אישור בכתב.
      </p>
    </div>
  );
};

export default TermsOfUsePage;
