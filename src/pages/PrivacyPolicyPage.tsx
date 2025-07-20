// import React from 'react';

const PrivacyPolicyPage = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-8 text-right">
      <div className="bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-slate-800 mb-6">מדיניות פרטיות</h1>
        <p className="text-sm text-slate-600 mb-6">עדכון אחרון: {new Date().toLocaleDateString('he-IL')}</p>

        <div className="space-y-6">
          <section>
            <h2 className="text-xl font-semibold text-slate-700 mb-3">🔒 הצהרה כללית</h2>
            <p className="text-slate-600 leading-relaxed">
              FinFlow מחויבת להגנה על פרטיותכם. מדיניות זו מסבירה איך אנו אוספים, משתמשים ומגנים על המידע שלכם 
              בהתאם לתקנות הגנת הפרטיות הישראליות, GDPR האירופי ותקנים בינלאומיים.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-700 mb-3">📊 איסוף מידע</h2>
            <ul className="text-slate-600 space-y-2">
              <li>• <strong>מידע אישי:</strong> שם, אימייל, תחום עיסוק (רק מה שאתם מזינים מרצון)</li>
              <li>• <strong>מידע פיננסי:</strong> נתונים כלליים לצורך ייעוץ (ללא פרטי חשבון בנק)</li>
              <li>• <strong>שימוש טכני:</strong> עוגיות לשיפור החוויה, נתוני גלישה בסיסיים</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-700 mb-3">🎯 שימוש במידע</h2>
            <ul className="text-slate-600 space-y-2">
              <li>• מתן שירותי ייעוץ פיננסי מותאמים אישית</li>
              <li>• שיפור מודלי הבינה המלאכותית שלנו</li>
              <li>• יצירת קשר לגבי שירותים רלוונטיים (רק בהסכמה)</li>
              <li>• עמידה בדרישות חוקיות ורגולטוריות</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-700 mb-3">🛡️ הגנה על המידע</h2>
            <p className="text-slate-600 leading-relaxed">
              אנו משתמשים בהצפנה מתקדמת (SSL/TLS), שרתים מאובטחים, וגישה מוגבלת למידע. 
              הנתונים מאוחסנים באירופה בהתאם לתקני GDPR.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-700 mb-3">👤 זכויותיכם</h2>
            <div className="bg-blue-50 p-4 rounded-lg">
              <p className="text-slate-700 font-medium mb-2">בהתאם ל-GDPR וחוק הגנת הפרטיות, יש לכם זכות:</p>
              <ul className="text-slate-600 space-y-1">
                <li>• לדעת איזה מידע אנו שומרים עליכם</li>
                <li>• לתקן מידע שגוי</li>
                <li>• למחוק את המידע שלכם (Right to Erasure)</li>
                <li>• להעביר את המידע למערכת אחרת</li>
                <li>• להתנגד לעיבוד מסוים</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-700 mb-3">📞 יצירת קשר</h2>
            <div className="bg-slate-50 p-4 rounded-lg">
              <p className="text-slate-600">
                לשאלות על פרטיות או לממש את זכויותיכם:<br/>
                <strong>אימייל:</strong> privacy@finflow.co.il<br/>
                <strong>כתובת:</strong> רחוב החרושת 10, תל אביב<br/>
                <strong>קצין הגנת מידע:</strong> data.protection@finflow.co.il
              </p>
            </div>
          </section>
        </div>

        <div className="mt-8 pt-6 border-t border-slate-200">
          <p className="text-sm text-slate-500">
            מדיניות זו עשויה להתעדכן מעת לעת. שינויים מהותיים יימסרו לכם באימייל.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicyPage;
