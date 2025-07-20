<!-- This file is part of the FinFlow Documentation Package - Owner: FinFlow Core Team -->

# Security Policy - מדיניות אבטחת מידע

## 📋 סקירה כללית

מדיניות אבטחת מידע מקיפה למערכת FinFlow Core, כוללת הנחיות לאבטחת נתונים, ניהול הרשאות, גיבויים, ובקרת גישה.

## 🛡️ עקרונות אבטחה יסודיים

### 🔐 Security by Design
- **אבטחה מהשורש**: כל תכונה מתוכננת עם שיקולי אבטחה
- **הרשאות מינימליות**: גישה רק למה שנדרש למשימה
- **הצפנה תמיד**: נתונים מוצפנים במנוחה ובתנועה
- **ולידציה מרובת שכבות**: בדיקות בfrontend, backend, ודאטאבייס

### 🎯 מודל Zero Trust
```typescript
// עקרון "אל תאמן, תמיד תאמת"
interface ZeroTrustPrinciples {
  verifyExplicitly: boolean;      // אמת כל בקשה
  leastPrivilegeAccess: boolean;  // הרשאות מינימליות
  assumeBreach: boolean;          // נניח שיש חדירה
}
```

## 🔑 ניהול זהויות והרשאות

### 👤 מודל משתמשים והרשאות

```typescript
// מבנה הרשאות היררכי
interface UserRoles {
  owner: {
    permissions: ['all'];
    description: 'בעלי עסק - גישה מלאה לעסק שלהם';
  };
  
  advisor: {
    permissions: ['read', 'create_reports', 'view_analytics'];
    description: 'יועצים - גישה לצפייה ודוחות';
  };
  
  accountant: {
    permissions: ['read', 'write', 'create_reports', 'manage_transactions'];
    description: 'רואי חשבון - גישה לניהול פיננסי';
  };
  
  admin: {
    permissions: ['system_admin', 'user_management'];
    description: 'מנהלי מערכת - ניהול טכני';
  };
  
  viewer: {
    permissions: ['read'];
    description: 'צופים - גישת צפייה בלבד';
  };
}
```

### 🔐 אימות ואבטחת כניסה

#### JWT Token Strategy
```typescript
interface AuthenticationStrategy {
  // אסטרטגיית אסימונים
  accessToken: {
    duration: '15 minutes';
    algorithm: 'RS256';
    payload: ['userId', 'role', 'permissions', 'businessId'];
  };
  
  refreshToken: {
    duration: '7 days';
    storage: 'httpOnly cookie';
    rotation: true; // החלפה בכל שימוש
  };
  
  // אימות דו-שלבי
  mfa: {
    methods: ['TOTP', 'SMS', 'Email'];
    required: ['admin', 'accountant']; // חובה לתפקידים רגישים
    backupCodes: 8; // קודי גיבוי
  };
}
```

#### Password Policy
```typescript
const passwordPolicy = {
  minLength: 12,
  requireUppercase: true,
  requireLowercase: true,
  requireNumbers: true,
  requireSpecialChars: true,
  prohibitCommon: true,        // מניעת סיסמאות נפוצות
  prohibitPersonalInfo: true,  // מניעת מידע אישי
  historyCheck: 12,           // לא לחזור על 12 סיסמאות קודמות
  expirationDays: 90,         // החלפה כל 90 יום
  maxLoginAttempts: 5,        // נעילה אחרי 5 ניסיונות
  lockoutDuration: 30         // נעילה ל-30 דקות
};
```

### 🏗️ בקרת גישה מבוססת תפקידים (RBAC)

```typescript
// מטריצת הרשאות
interface PermissionMatrix {
  business: {
    create: ['owner'];
    read: ['owner', 'advisor', 'accountant', 'viewer'];
    update: ['owner', 'accountant'];
    delete: ['owner'];
    share: ['owner'];
  };
  
  financial_data: {
    create: ['owner', 'accountant'];
    read: ['owner', 'advisor', 'accountant'];
    update: ['owner', 'accountant'];
    delete: ['owner'];
    export: ['owner', 'accountant'];
  };
  
  reports: {
    create: ['owner', 'advisor', 'accountant'];
    read: ['owner', 'advisor', 'accountant', 'viewer'];
    schedule: ['owner', 'accountant'];
    share: ['owner', 'advisor'];
  };
  
  system: {
    user_management: ['admin'];
    system_settings: ['admin'];
    audit_logs: ['admin'];
    backups: ['admin'];
  };
}
```

## 🔒 אבטחת נתונים

### 🛡️ הצפנת נתונים

#### Data at Rest (נתונים במנוחה)
```typescript
interface DataEncryption {
  database: {
    algorithm: 'AES-256-GCM';
    keyManagement: 'AWS KMS / Azure Key Vault';
    fieldLevel: ['ssn', 'credit_card', 'bank_account'];
  };
  
  fileStorage: {
    algorithm: 'AES-256-CTR';
    keyRotation: 'monthly';
    compressionFirst: true;
  };
  
  backups: {
    algorithm: 'AES-256-GCM';
    separateKeys: true;
    offlineStorage: true;
  };
}
```

#### Data in Transit (נתונים בתנועה)
```typescript
interface TransitSecurity {
  webTraffic: {
    protocol: 'TLS 1.3';
    cipherSuites: ['TLS_AES_256_GCM_SHA384'];
    certificates: 'EV SSL';
    hsts: true; // HTTP Strict Transport Security
  };
  
  apiCommunication: {
    protocol: 'TLS 1.3';
    clientCertificates: true;
    apiKeyEncryption: true;
    requestSigning: true;
  };
  
  internalServices: {
    protocol: 'mTLS'; // Mutual TLS
    certificateRotation: 'weekly';
    networkSegmentation: true;
  };
}
```

### 🗄️ מיקומי אחסון ובטחון

```typescript
interface DataStorage {
  primary: {
    location: 'Israel / EU (GDPR compliant)';
    provider: 'AWS / Azure';
    redundancy: '3x replica + cross-AZ';
    backups: 'daily + weekly + monthly';
  };
  
  sensitive: {
    pii: 'encrypted fields only';
    financial: 'separate encrypted volume';
    credentials: 'dedicated secrets manager';
    logs: 'anonymized after 90 days';
  };
  
  retention: {
    transactional: '7 years'; // חובה חוקית
    analytical: '3 years';
    logs: '1 year';
    backups: '1 year';
  };
}
```

## 📊 אבטחת אפליקציה

### 🕷️ הגנה מפני התקפות נפוצות

#### OWASP Top 10 Protection
```typescript
interface SecurityMeasures {
  injectionAttacks: {
    sqlInjection: 'parameterized queries + ORM';
    xss: 'content security policy + sanitization';
    commandInjection: 'input validation + whitelisting';
  };
  
  brokenAuthentication: {
    sessionManagement: 'secure tokens + rotation';
    bruteForce: 'rate limiting + captcha';
    credentialStuffing: 'account lockout + monitoring';
  };
  
  sensitiveDataExposure: {
    encryption: 'AES-256 everywhere';
    keyManagement: 'external key vault';
    dataMinimization: 'collect only necessary';
  };
  
  xxeAttacks: {
    xmlParsing: 'disable external entities';
    inputValidation: 'strict XML schema';
    libraryUpdates: 'regular patching';
  };
  
  brokenAccessControl: {
    authorization: 'role-based + resource-level';
    urlAccess: 'deny by default';
    fileAccess: 'path traversal protection';
  };
}
```

#### Input Validation & Sanitization
```typescript
interface InputSecurity {
  validation: {
    clientSide: 'basic UX validation only';
    serverSide: 'comprehensive validation';
    whitelisting: 'allow known good inputs';
    blacklisting: 'block known bad patterns';
  };
  
  sanitization: {
    htmlInputs: 'DOMPurify library';
    sqlInputs: 'parameterized queries';
    fileUploads: 'virus scanning + type validation';
    jsonInputs: 'schema validation';
  };
  
  rateLimiting: {
    loginAttempts: '5 per 15 minutes per IP';
    apiCalls: '100 per minute per user';
    fileUploads: '10 per hour per user';
    reportGeneration: '5 per hour per user';
  };
}
```

### 🚨 Logging & Monitoring

#### Security Event Logging
```typescript
interface SecurityLogging {
  authenticationEvents: {
    login: ['success', 'failure', 'timestamp', 'ip', 'userAgent'];
    logout: ['timestamp', 'sessionDuration'];
    passwordChange: ['timestamp', 'forced'];
    mfaEvents: ['setup', 'use', 'bypass_attempts'];
  };
  
  authorizationEvents: {
    permissionDenied: ['resource', 'attemptedAction', 'user'];
    privilegeEscalation: ['fromRole', 'toRole', 'method'];
    dataAccess: ['resource', 'action', 'result'];
  };
  
  systemEvents: {
    configChanges: ['setting', 'oldValue', 'newValue', 'user'];
    userManagement: ['action', 'targetUser', 'changes'];
    dataExport: ['type', 'volume', 'destination'];
  };
  
  securityEvents: {
    suspiciousActivity: ['pattern', 'confidence', 'response'];
    attackAttempts: ['type', 'source', 'blocked'];
    vulnerabilities: ['discovered', 'severity', 'patched'];
  };
}
```

#### Real-time Monitoring
```typescript
interface SecurityMonitoring {
  alertRules: {
    failedLogins: {
      threshold: 5,
      timeWindow: '15 minutes',
      action: 'lock_account + notify_admin'
    };
    
    unusualAccess: {
      newLocation: 'immediate_alert',
      offHours: 'log_for_review',
      bulkDownload: 'immediate_alert'
    };
    
    systemAnomalies: {
      highCpuUsage: 'investigate_if_persistent',
      memoryLeaks: 'immediate_alert',
      diskSpaceHigh: 'warn_at_80_critical_at_95'
    };
  };
  
  responseActions: {
    automatic: ['rate_limiting', 'ip_blocking', 'session_termination'];
    manual: ['user_investigation', 'forensic_analysis', 'incident_response'];
    escalation: ['security_team', 'management', 'law_enforcement'];
  };
}
```

## 💾 גיבויים ושחזור

### 🔄 אסטרטגיית גיבויים

#### 3-2-1 Backup Strategy
```typescript
interface BackupStrategy {
  // 3 עותקים של הנתונים
  copies: {
    primary: 'live database';
    secondary: 'daily backup to same datacenter';
    tertiary: 'weekly backup to different region';
  };
  
  // 2 סוגי מדיה שונים
  media: {
    online: 'cloud storage (S3/Azure Blob)';
    offline: 'encrypted tape/cold storage';
  };
  
  // 1 עותק offsite
  offsite: {
    location: 'different geographic region';
    encryption: 'AES-256 with separate keys';
    access: 'emergency personnel only';
  };
}
```

#### גיבוי אוטומטי
```typescript
interface AutomatedBackup {
  frequency: {
    fullBackup: 'weekly on Sunday 2 AM';
    incrementalBackup: 'daily at 2 AM';
    transactionLog: 'every 15 minutes';
    configBackup: 'after each change';
  };
  
  retention: {
    daily: '30 days';
    weekly: '12 weeks';
    monthly: '12 months';
    yearly: '7 years'; // חובה חוקית
  };
  
  verification: {
    integrity: 'checksums verified daily';
    restoration: 'test restore monthly';
    consistency: 'logical consistency checks';
  };
}
```

### 🚑 תכנית שחזור בחירום (DRP)

#### Recovery Time Objectives (RTO)
```typescript
interface RecoveryObjectives {
  rto: { // זמן מקסימלי לשחזור
    critical: '4 hours';      // נתונים קריטיים
    important: '24 hours';    // נתונים חשובים
    normal: '72 hours';       // נתונים רגילים
  };
  
  rpo: { // נפח מקסימלי של אובדן נתונים
    critical: '1 hour';       // מקסימום שעה של נתונים
    important: '4 hours';     // מקסימום 4 שעות
    normal: '24 hours';       // מקסימום יום
  };
}
```

#### תהליך שחזור
```bash
# תהליך שחזור בחירום
#!/bin/bash

# 1. הערכת מצב
echo "Assessing disaster scope and impact..."
./assess_disaster.sh

# 2. הפעלת תכנית חירום
echo "Activating disaster recovery plan..."
./activate_dr_site.sh

# 3. שחזור נתונים
echo "Restoring data from backups..."
./restore_from_backup.sh --latest --verify

# 4. בדיקת תקינות
echo "Performing integrity checks..."
./verify_data_integrity.sh

# 5. הפעלת שירותים
echo "Starting services..."
./start_services.sh --production

# 6. בדיקות עשן
echo "Running smoke tests..."
./smoke_tests.sh

# 7. הודעה לצוות
echo "Notifying stakeholders..."
./notify_recovery_complete.sh
```

## 🔍 ביקורת ותאימות

### 📋 Compliance Standards

#### GDPR (General Data Protection Regulation)
```typescript
interface GDPRCompliance {
  dataProtection: {
    lawfulBasis: 'legitimate interest / consent';
    dataMinimization: 'collect only necessary data';
    purposeLimitation: 'use only for stated purpose';
    accuracyMaintenance: 'keep data accurate and updated';
  };
  
  userRights: {
    accessRight: 'data export within 30 days';
    rectificationRight: 'correction within 30 days';
    erasureRight: 'deletion within 30 days';
    portabilityRight: 'structured data export';
    objectRight: 'opt-out of processing';
  };
  
  dataBreachResponse: {
    detection: 'automated monitoring';
    assessment: 'within 24 hours';
    notification: 'authorities within 72 hours';
    userNotification: 'high risk cases immediately';
  };
}
```

#### SOX (Sarbanes-Oxley) - לחברות ציבוריות
```typescript
interface SOXCompliance {
  auditTrail: {
    completeness: 'all financial transactions logged';
    integrity: 'tamper-proof audit logs';
    retention: '7 years minimum';
    accessibility: 'auditor access within 24 hours';
  };
  
  accessControls: {
    segregationOfDuties: 'separation of roles';
    leastPrivilege: 'minimal necessary access';
    regularReview: 'quarterly access reviews';
    terminationProcess: 'immediate access revocation';
  };
}
```

### 🔍 Audit Logging

```typescript
interface AuditLogging {
  financialAudit: {
    transactionLogging: {
      create: ['amount', 'category', 'user', 'timestamp', 'approver'];
      modify: ['oldValue', 'newValue', 'reason', 'user', 'timestamp'];
      delete: ['originalRecord', 'reason', 'user', 'approval'];
    };
    
    reportGeneration: {
      creation: ['parameters', 'data_range', 'user', 'timestamp'];
      access: ['viewer', 'timestamp', 'duration'];
      export: ['format', 'destination', 'user', 'approval'];
    };
  };
  
  systemAudit: {
    configurationChanges: ['setting', 'old_value', 'new_value', 'user'];
    userManagement: ['action', 'target_user', 'role_changes', 'admin'];
    securityEvents: ['event_type', 'source', 'result', 'response'];
  };
  
  accessAudit: {
    login: ['user', 'source_ip', 'timestamp', 'mfa_used', 'result'];
    dataAccess: ['resource', 'action', 'user', 'business_context'];
    privilegedOperations: ['operation', 'user', 'justification', 'approval'];
  };
}
```

## 🚨 תגובה לאירועי אבטחה

### 🎯 Incident Response Plan

#### דירוג חומרת אירועים
```typescript
interface IncidentSeverity {
  critical: {
    description: 'חדירה למערכת / דליפת נתונים רגישים';
    responseTime: '15 minutes';
    escalation: 'immediate C-level notification';
    actions: ['isolate systems', 'preserve evidence', 'notify authorities'];
  };
  
  high: {
    description: 'ניסיון חדירה / חשיפת נתונים פנימיים';
    responseTime: '1 hour';
    escalation: 'security team + management';
    actions: ['investigate', 'contain', 'monitor'];
  };
  
  medium: {
    description: 'פעילות חשודה / הפרת מדיניות';
    responseTime: '4 hours';
    escalation: 'security team';
    actions: ['log', 'investigate', 'review policies'];
  };
  
  low: {
    description: 'חריגות מינוריות / אזהרות מערכת';
    responseTime: '24 hours';
    escalation: 'IT team';
    actions: ['document', 'monitor trends'];
  };
}
```

#### תהליך תגובה לאירוע
```bash
# Incident Response Workflow
#!/bin/bash

# Phase 1: Identification & Assessment
./identify_incident.sh --severity --scope --impact

# Phase 2: Containment
./contain_incident.sh --isolate --preserve-evidence

# Phase 3: Eradication
./eradicate_threat.sh --remove-malware --patch-vulnerabilities

# Phase 4: Recovery
./recover_systems.sh --restore-services --monitor

# Phase 5: Lessons Learned
./post_incident_review.sh --document --improve-controls
```

## 📚 הכשרה ומודעות

### 👨‍💼 הכשרת עובדים

#### תכנית הכשרה שנתית
```typescript
interface SecurityTraining {
  mandatory: {
    allEmployees: {
      topics: ['password security', 'phishing awareness', 'data handling'];
      frequency: 'quarterly';
      assessment: 'pass 80% to proceed';
    };
    
    privilegedUsers: {
      topics: ['advanced threats', 'incident response', 'compliance'];
      frequency: 'monthly';
      certification: 'annual certification required';
    };
  };
  
  specialized: {
    developers: {
      topics: ['secure coding', 'OWASP Top 10', 'threat modeling'];
      frequency: 'bi-monthly';
    };
    
    administrators: {
      topics: ['system hardening', 'access management', 'audit logging'];
      frequency: 'monthly';
    };
  };
}
```

#### מבחני מודעות
```typescript
interface SecurityAwareness {
  phishingSimulation: {
    frequency: 'monthly';
    scenarios: ['credential_harvesting', 'malware_delivery', 'ceo_fraud'];
    failureResponse: 'immediate_training';
  };
  
  socialEngineeringTests: {
    frequency: 'quarterly';
    methods: ['phone_calls', 'physical_access', 'information_gathering'];
    metrics: ['success_rate', 'reporting_rate', 'response_time'];
  };
}
```

## 📊 מטריקות ו-KPIs

### 📈 מדדי ביצוע אבטחה

```typescript
interface SecurityKPIs {
  preventive: {
    patchingTime: 'average time to patch critical vulnerabilities';
    accessReviews: 'percentage of quarterly access reviews completed';
    trainingCompletion: 'percentage of mandatory training completed';
  };
  
  detective: {
    meanTimeToDetection: 'average time to detect security incidents';
    falsePositiveRate: 'percentage of false security alerts';
    logCoverage: 'percentage of systems with security logging';
  };
  
  responsive: {
    meanTimeToResponse: 'average time to respond to incidents';
    meanTimeToRecover: 'average time to recover from incidents';
    escalationAccuracy: 'percentage of correctly escalated incidents';
  };
  
  compliance: {
    auditFindings: 'number of audit findings per quarter';
    complianceScore: 'percentage compliance with standards';
    regulatoryFines: 'amount of regulatory fines (target: 0)';
  };
}
```

---

*עודכן לאחרונה: ${new Date().toLocaleDateString('he-IL')}*
