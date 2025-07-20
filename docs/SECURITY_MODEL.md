<!-- נוצר אוטומטית על ידי GitHub Copilot עבור תיעוד מערכת FinFlow -->

# 🔐 מודל אבטחת מידע והרשאות - FinFlow

## 👥 סוגי משתמשים והגדרות תפקידים

### היררכיית תפקידים
```typescript
interface UserRoleHierarchy {
  // מנהל מערכת עליון
  SystemAdmin: {
    level: 0; // הרמה הגבוהה ביותר
    description: 'מנהל מערכת כללי עם גישה לכל הפונקציות';
    scope: 'כל המערכת והעסקים';
    inheritance: 'כולל את כל ההרשאות של תפקידים אחרים';
  };
  
  // מנהל עסק - בעלים
  BusinessOwner: {
    level: 1;
    description: 'בעלים או מנהל ראשי של עסק';
    scope: 'עסק ספציפי בלבד';
    inheritance: 'כולל הרשאות של Manager, Accountant, Viewer';
  };
  
  // מנהל פיננסי / רואה חשבון
  FinancialManager: {
    level: 2;
    description: 'רואה חשבון או מנהל פיננסי מוקצה';
    scope: 'נתונים פיננסיים של עסק ספציפי';
    inheritance: 'כולל הרשאות של Accountant, Viewer';
  };
  
  // רואה חשבון חיצוני
  ExternalAccountant: {
    level: 3;
    description: 'רואה חשבון חיצוני עם גישה מוגבלת';
    scope: 'נתונים נדרשים לביקורת ודיווח מס';
    inheritance: 'כולל הרשאות של Viewer בתחומים ספציפיים';
  };
  
  // צופה / מבקר
  Viewer: {
    level: 4;
    description: 'גישת צפייה בלבד לדוחות ונתונים';
    scope: 'נתונים מוגבלים לפי הגדרות הבעלים';
    inheritance: 'אין הרשאות נוספות';
  };
  
  // משתמש אורח
  Guest: {
    level: 5;
    description: 'גישה מוגבלת מאוד לצורכי הדגמה';
    scope: 'נתוני דמו בלבד';
    inheritance: 'אין גישה לנתונים אמיתיים';
  };
}
```

### מטריצת הרשאות מפורטת
```typescript
interface PermissionMatrix {
  // ניהול עסק וגישה בסיסית
  business_management: {
    create_business: {
      SystemAdmin: true;
      BusinessOwner: true; // יכול ליצור עסקים נוספים
      FinancialManager: false;
      ExternalAccountant: false;
      Viewer: false;
      Guest: false;
    };
    
    edit_business_details: {
      SystemAdmin: true;
      BusinessOwner: true;
      FinancialManager: false; // לא יכול לשנות פרטי עסק
      ExternalAccountant: false;
      Viewer: false;
      Guest: false;
    };
    
    delete_business: {
      SystemAdmin: true;
      BusinessOwner: true;
      FinancialManager: false;
      ExternalAccountant: false;
      Viewer: false;
      Guest: false;
    };
    
    view_business_list: {
      SystemAdmin: true; // רואה את כל העסקים
      BusinessOwner: true; // רואה רק את העסקים שלו
      FinancialManager: true; // רואה עסקים שהוקצו לו
      ExternalAccountant: true; // רואה עסקים שהוקצו לו
      Viewer: true; // רואה עסקים שיש לו גישה אליהם
      Guest: false;
    };
  };
  
  // ניהול נתונים פיננסיים
  financial_data: {
    view_all_transactions: {
      SystemAdmin: true;
      BusinessOwner: true;
      FinancialManager: true;
      ExternalAccountant: true;
      Viewer: true;
      Guest: false;
    };
    
    create_transaction: {
      SystemAdmin: true;
      BusinessOwner: true;
      FinancialManager: true;
      ExternalAccountant: false; // לא יכול להוסיף עסקאות
      Viewer: false;
      Guest: false;
    };
    
    edit_transaction: {
      SystemAdmin: true;
      BusinessOwner: true;
      FinancialManager: true;
      ExternalAccountant: false;
      Viewer: false;
      Guest: false;
    };
    
    delete_transaction: {
      SystemAdmin: true;
      BusinessOwner: true;
      FinancialManager: false; // יכול לערוך אבל לא למחוק
      ExternalAccountant: false;
      Viewer: false;
      Guest: false;
    };
    
    view_sensitive_financial_data: {
      SystemAdmin: true;
      BusinessOwner: true;
      FinancialManager: true;
      ExternalAccountant: 'limited'; // גישה מוגבלת לנתונים רגישים
      Viewer: false;
      Guest: false;
    };
  };
  
  // דוחות ואנליטיקה
  reports_analytics: {
    view_basic_reports: {
      SystemAdmin: true;
      BusinessOwner: true;
      FinancialManager: true;
      ExternalAccountant: true;
      Viewer: true;
      Guest: true; // דוחות דמו בלבד
    };
    
    view_advanced_reports: {
      SystemAdmin: true;
      BusinessOwner: true;
      FinancialManager: true;
      ExternalAccountant: false;
      Viewer: false;
      Guest: false;
    };
    
    export_reports: {
      SystemAdmin: true;
      BusinessOwner: true;
      FinancialManager: true;
      ExternalAccountant: true;
      Viewer: 'limited'; // ייצוא מוגבל
      Guest: false;
    };
    
    create_custom_reports: {
      SystemAdmin: true;
      BusinessOwner: true;
      FinancialManager: true;
      ExternalAccountant: false;
      Viewer: false;
      Guest: false;
    };
  };
  
  // תכונות AI ומתקדמות
  ai_features: {
    access_ai_insights: {
      SystemAdmin: true;
      BusinessOwner: true;
      FinancialManager: true;
      ExternalAccountant: false;
      Viewer: false;
      Guest: false;
    };
    
    configure_ai_settings: {
      SystemAdmin: true;
      BusinessOwner: true;
      FinancialManager: false;
      ExternalAccountant: false;
      Viewer: false;
      Guest: false;
    };
    
    view_ai_recommendations: {
      SystemAdmin: true;
      BusinessOwner: true;
      FinancialManager: true;
      ExternalAccountant: false;
      Viewer: 'limited';
      Guest: false;
    };
  };
  
  // ניהול משתמשים והרשאות
  user_management: {
    invite_users: {
      SystemAdmin: true;
      BusinessOwner: true;
      FinancialManager: false;
      ExternalAccountant: false;
      Viewer: false;
      Guest: false;
    };
    
    assign_roles: {
      SystemAdmin: true;
      BusinessOwner: true; // רק בעסק שלו
      FinancialManager: false;
      ExternalAccountant: false;
      Viewer: false;
      Guest: false;
    };
    
    remove_users: {
      SystemAdmin: true;
      BusinessOwner: true;
      FinancialManager: false;
      ExternalAccountant: false;
      Viewer: false;
      Guest: false;
    };
    
    view_user_activity: {
      SystemAdmin: true;
      BusinessOwner: true;
      FinancialManager: false;
      ExternalAccountant: false;
      Viewer: false;
      Guest: false;
    };
  };
}
```

## 🔒 מודל הצפנה ואבטחת נתונים

### שכבות הצפנה
```typescript
interface EncryptionLayers {
  // הצפנה בזמן אחסון (Data at Rest)
  dataAtRest: {
    database_encryption: {
      method: 'AES-256-GCM';
      key_management: 'AWS KMS / Azure Key Vault';
      scope: 'כל נתוני המסד ברמת השדה';
      rotation: 'מפתחות מתחלפים כל 90 יום';
    };
    
    file_encryption: {
      method: 'ChaCha20-Poly1305';
      scope: 'קבצים מועלים, גיבויים, לוגים';
      key_derivation: 'PBKDF2 עם 100,000 iterations';
    };
    
    sensitive_fields: {
      financial_amounts: 'הצפנה ברמת השדה';
      personal_data: 'הצפנה + tokenization';
      business_secrets: 'הצפנה כפולה עם מפתחות נפרדים';
    };
  };
  
  // הצפנה בזמן העברה (Data in Transit)
  dataInTransit: {
    external_apis: {
      protocol: 'TLS 1.3';
      certificate: 'Extended Validation SSL';
      pinning: 'Certificate pinning לאפליקציות מובייל';
      hsts: 'HTTP Strict Transport Security';
    };
    
    internal_communication: {
      protocol: 'mTLS (Mutual TLS)';
      authentication: 'Client certificates';
      validation: 'Certificate chain validation';
    };
    
    websockets: {
      protocol: 'WSS (WebSocket Secure)';
      authentication: 'JWT tokens במסגרת WebSocket';
    };
  };
  
  // הצפנה בזמן עיבוד (Data in Processing)
  dataInProcessing: {
    memory_protection: {
      technique: 'Homomorphic encryption לחישובים רגישים';
      secure_enclaves: 'Intel SGX/ARM TrustZone כשזמין';
      memory_clearing: 'ניקוי זיכרון מיידי לאחר שימוש';
    };
    
    application_level: {
      field_level_encryption: 'הצפנה ברמת השדה בקוד';
      tokenization: 'החלפת נתונים רגישים בטוקנים';
      masking: 'הסוואת נתונים בלוגים ובממשקים';
    };
  };
}
```

### ניהול סיסמאות ואימות
```typescript
interface PasswordSecurity {
  // אחסון סיסמאות
  passwordHashing: {
    primary_method: 'Argon2id';
    parameters: {
      memory: '64MB per hash';
      iterations: '3 iterations';
      parallelism: '4 threads';
      salt_length: '32 bytes (crypto-random)';
    };
    
    fallback_method: 'bcrypt';
    bcrypt_rounds: 12; // לתאימות עם מערכות קיימות
    
    upgrade_strategy: 'Hash upgrade בהתחברות הבאה';
  };
  
  // מדיניות סיסמאות
  passwordPolicy: {
    minimum_length: 12;
    complexity_requirements: [
      'אות גדולה אחת לפחות',
      'אות קטנה אחת לפחות',
      'ספרה אחת לפחות',
      'תו מיוחד אחד לפחות'
    ];
    
    forbidden_patterns: [
      'סיסמאות נפוצות (top 10,000)',
      'מידע אישי (שם, תאריך לידה)',
      'דפוסים מקלדת (qwerty, 123456)',
      'מילים מהמילון'
    ];
    
    expiration: 'אין פקיעה אוטומטית - עידוד לשינוי וולונטרי';
    history: 'מניעת שימוש ב-5 סיסמאות אחרונות';
  };
  
  // אימות רב-גורמי (MFA)
  multiFactorAuth: {
    required_for: [
      'BusinessOwner ומעלה',
      'גישה לנתונים רגישים',
      'פעולות מנהליות',
      'גישה מרחוק'
    ];
    
    supported_methods: [
      'TOTP (Google Authenticator, Authy)',
      'SMS (כגיבוי בלבד)',
      'Hardware tokens (YubiKey)',
      'Biometric (בנייד בלבד)'
    ];
    
    backup_codes: {
      count: 10;
      single_use: true;
      regeneration: 'לפי בקשת משתמש';
    };
  };
}
```

## 🏢 הפרדת נתונים בין עסקים

### אבטחה ברמת העסק
```typescript
interface BusinessDataSeparation {
  // הפרדה פיזית
  physicalSeparation: {
    database_level: {
      strategy: 'Row Level Security (RLS) + Tenant ID';
      implementation: 'כל שורה מכילה business_id';
      validation: 'אימות business_id בכל שאילתה';
      indexes: 'אינדקסים מותנים בusiness_id';
    };
    
    file_storage: {
      strategy: 'הפרדה ברמת התיקיות';
      structure: '/data/{business_id}/*';
      permissions: 'הרשאות file system לפי business_id';
    };
    
    cache_separation: {
      strategy: 'מפתחות cache עם prefix של business_id';
      implementation: 'cache_key = f"{business_id}:{actual_key}"';
      ttl: 'TTL נפרד לכל עסק';
    };
  };
  
  // בקרת גישה ברמת האפליקציה
  applicationLevelSecurity: {
    context_validation: {
      business_context: 'ולידציה של business_id בכל בקשה';
      user_business_mapping: 'אימות שהמשתמש שייך לעסק';
      cross_business_prevention: 'מניעת גישה בין עסקים';
    };
    
    api_security: {
      endpoint_protection: 'הגנה על endpoints ברמת העסק';
      request_filtering: 'סינון בקשות לפי business_id';
      response_filtering: 'סינון תגובות לפי הרשאות';
    };
  };
  
  // מניעת data leakage
  dataLeakagePrevention: {
    query_analysis: {
      sql_injection_prevention: 'Parameterized queries בלבד';
      business_id_enforcement: 'הכרחת business_id בכל שאילתה';
      result_filtering: 'סינון תוצאות לפי הרשאות';
    };
    
    logging_separation: {
      log_isolation: 'לוגים נפרדים לכל עסק';
      sensitive_data_masking: 'הסוואת נתונים בלוגים';
      audit_trail: 'מעקב מלא אחר גישות נתונים';
    };
  };
}
```

## 🔐 OAuth Scopes ואינטגרציות

### מדיניות Least Privilege
```typescript
interface OAuthSecurityModel {
  // עקרונות בסיסיים
  leastPrivilegePrinciples: {
    minimal_scopes: 'מתן מינימום הרשאות נדרש לתפקוד';
    time_limited: 'הגבלת זמן תוקף לטוקנים';
    purpose_specific: 'הרשאות ספציפיות למטרה';
    revocable: 'יכולת ביטול מיידי';
  };
  
  // Scopes מוגדרים
  definedScopes: {
    // קריאת נתונים בסיסיים
    'read:basic': {
      description: 'קריאת מידע בסיסי על העסק';
      includes: ['business_name', 'industry', 'created_date'];
      excludes: 'כל נתון פיננסי או רגיש';
      required_role: 'Viewer ומעלה';
    };
    
    // קריאת נתונים פיננסיים
    'read:financial': {
      description: 'קריאת נתונים פיננסיים';
      includes: ['transactions', 'balances', 'reports'];
      excludes: 'פרטי בנק, מספרי חשבון';
      required_role: 'FinancialManager ומעלה';
    };
    
    // כתיבת נתונים
    'write:transactions': {
      description: 'יצירה ועריכה של עסקאות';
      includes: ['create_transaction', 'update_transaction'];
      excludes: 'מחיקת עסקאות';
      required_role: 'FinancialManager ומעלה';
    };
    
    // גישה לתכונות AI
    'access:ai': {
      description: 'שימוש ביכולות בינה מלאכותית';
      includes: ['ai_insights', 'recommendations', 'predictions'];
      excludes: 'הגדרות AI';
      required_role: 'BusinessOwner ומעלה';
    };
    
    // ניהול מתקדם
    'admin:business': {
      description: 'ניהול מלא של העסק';
      includes: ['user_management', 'settings', 'integrations'];
      excludes: 'מחיקת עסק';
      required_role: 'BusinessOwner בלבד';
    };
  };
  
  // אבטחת טוקנים
  tokenSecurity: {
    access_tokens: {
      format: 'JWT (JSON Web Tokens)';
      expiration: '15 דקות';
      algorithm: 'RS256 (RSA with SHA-256)';
      claims: ['sub', 'business_id', 'role', 'scopes', 'iat', 'exp'];
    };
    
    refresh_tokens: {
      format: 'Random secure string (256-bit)';
      expiration: '30 יום';
      storage: 'מוצפן במסד נתונים';
      rotation: 'טוקן חדש בכל refresh';
    };
    
    token_validation: {
      signature_verification: 'אימות חתימה דיגיטלית';
      expiration_check: 'בדיקת תוקף בכל בקשה';
      revocation_check: 'בדיקה מול blacklist';
      scope_validation: 'אימות scopes לכל endpoint';
    };
  };
}
```

### אבטחת אינטגרציות חיצוניות
```typescript
interface ExternalIntegrationSecurity {
  // בקרת אינטגרציות
  integrationControl: {
    approved_services: {
      criteria: [
        'ביקורת אבטחה מעמיקה',
        'תאימות GDPR מלאה',
        'הסכמי SLA מחייבים',
        'מוניטורינג רציף'
      ];
      
      approval_process: [
        'הערכת סיכונים',
        'ביקורת טכנית',
        'אישור משפטי',
        'בדיקות אבטחה',
        'אישור סופי'
      ];
    };
    
    data_sharing_limits: {
      no_raw_data: 'אין העברת נתונים גולמיים';
      anonymized_only: 'רק נתונים מאנונמיים';
      aggregated_data: 'נתונים מצורפים בלבד';
      purpose_limitation: 'שימוש למטרה מוגדרת בלבד';
    };
  };
  
  // ניטור ובקרה
  monitoringControl: {
    real_time_monitoring: {
      api_calls: 'מעקב כל קריאות API';
      data_transfers: 'מעקב העברות נתונים';
      authentication: 'מעקב אימותים ונסיונות כושלים';
      anomaly_detection: 'זיהוי התנהגות חריגה';
    };
    
    automated_responses: {
      rate_limiting: 'הגבלה אוטומטית בעת חריגה';
      temporary_blocking: 'חסימה זמנית של שירותים חשודים';
      alert_escalation: 'התרעות מיידיות לצוות אבטחה';
      automatic_revocation: 'ביטול אוטומטי בזיהוי חדירה';
    };
  };
}
```

## 🛡️ אבטחה ברמת התשתית

### הגנה מפני איומים נפוצים
```typescript
interface ThreatProtection {
  // הגנה מפני OWASP Top 10
  owaspProtection: {
    injection_attacks: {
      sql_injection: 'Parameterized queries + ORM validation';
      nosql_injection: 'Input sanitization + schema validation';
      ldap_injection: 'LDAP encoding + input validation';
      os_injection: 'Command whitelist + sandboxing';
    };
    
    broken_authentication: {
      session_management: 'Secure session handling';
      password_security: 'Strong hashing + MFA';
      token_protection: 'JWT best practices';
      account_lockout: 'Brute force protection';
    };
    
    sensitive_data_exposure: {
      encryption_everywhere: 'Encryption at rest + in transit';
      data_classification: 'סיווג נתונים לפי רגישות';
      access_controls: 'בקרות גישה מתקדמות';
      secure_protocols: 'TLS 1.3 + secure ciphers';
    };
    
    security_misconfiguration: {
      hardening_guidelines: 'מדריכי חיזוק מערכת';
      default_passwords: 'שינוי כל סיסמאות ברירת מחדל';
      error_handling: 'טיפול מאובטח בשגיאות';
      security_headers: 'HTTP security headers';
    };
  };
  
  // הגנה ברמת האפליקציה
  applicationSecurity: {
    input_validation: {
      server_side: 'ולידציה בצד שרת לכל קלט';
      client_side: 'ולידציה בצד לקוח לחוויית משתמש';
      sanitization: 'ניקוי וסניטיזציה של נתונים';
      encoding: 'קידוד מתאים לכל הקשר';
    };
    
    output_encoding: {
      html_encoding: 'קידוד HTML למניעת XSS';
      url_encoding: 'קידוד URL';
      json_encoding: 'קידוד JSON בטוח';
      sql_encoding: 'קידוד SQL parameters';
    };
    
    csrf_protection: {
      token_based: 'CSRF tokens בכל טופס';
      same_site_cookies: 'SameSite cookie attribute';
      origin_validation: 'אימות מקור הבקשה';
      double_submit: 'Double submit cookie pattern';
    };
  };
}
```

---

*מודל האבטחה הזה מבטיח הגנה מלאה על נתוני FinFlow בכל השכבות - מהמשתמש ועד לתשתית, תוך עמידה בסטנדרטים הבינלאומיים הגבוהים ביותר*
