// Business API Module
// מודול API לניהול עסקים

// Main API functions
export { default as businessApi } from './businessApi';
export { default as businessApiExamples } from './businessApiExamples';

// Individual function exports for convenience
export {
  fetchBusinesses,
  createBusiness,
  updateBusiness,
  deleteBusiness,
  fetchBusinessById,
  searchBusinesses,
  setUserSelectedBusiness,
  getUserSelectedBusiness,
  getBusinessStats,
  getUserBusinessSummary,
  checkApiHealth,
  getApiVersion,
} from './businessApi';

// Type exports
export type {
  Business,
  CreateBusinessRequest,
  UpdateBusinessRequest,
} from './businessApi';

// Re-export entity types for convenience
export type { Industry } from '../entities/business';
export { INDUSTRIES } from '../entities/business';
