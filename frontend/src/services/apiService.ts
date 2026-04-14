import axios from 'axios';
import type { AxiosInstance } from 'axios';

const API_BASE_URL = '/api';

type ApiPayload = object;
type ApiParams = object;

// Create axios instance
const apiClient: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Product Category APIs
export const productCategoryAPI = {
  getAll: (page = 1, limit = 25, search?: string) =>
    apiClient.get('/product-categories', { params: { page, limit, search } }),
  getById: (id: number) => apiClient.get(`/product-categories/${id}`),
  create: (data: ApiPayload) => apiClient.post('/product-categories', data),
  update: (id: number, data: ApiPayload) => apiClient.put(`/product-categories/${id}`, data),
  delete: (id: number) => apiClient.delete(`/product-categories/${id}`),
  toggleStatus: (id: number) => apiClient.patch(`/product-categories/${id}/toggle-status`),
};

// Product Sub Category APIs
export const productSubCategoryAPI = {
  getAll: (page = 1, limit = 25, categoryId?: number, search?: string) =>
    apiClient.get('/product-sub-categories', { params: { page, limit, categoryId, search } }),
  getById: (id: number) => apiClient.get(`/product-sub-categories/${id}`),
  create: (data: ApiPayload) => apiClient.post('/product-sub-categories', data),
  update: (id: number, data: ApiPayload) => apiClient.put(`/product-sub-categories/${id}`, data),
  delete: (id: number) => apiClient.delete(`/product-sub-categories/${id}`),
  toggleStatus: (id: number) => apiClient.patch(`/product-sub-categories/${id}/toggle-status`),
};

// Product APIs
export const productAPI = {
  getAll: (page = 1, limit = 25, categoryId?: number, search?: string) =>
    apiClient.get('/products', { params: { page, limit, categoryId, search } }),
  getById: (id: number) => apiClient.get(`/products/${id}`),
  create: (data: ApiPayload) => apiClient.post('/products', data),
  update: (id: number, data: ApiPayload) => apiClient.put(`/products/${id}`, data),
  delete: (id: number) => apiClient.delete(`/products/${id}`),
  toggleStatus: (id: number) => apiClient.patch(`/products/${id}/toggle-status`),
};

// Product Variant APIs
export const productVariantAPI = {
  getAll: (page = 1, limit = 10, productId?: number, search?: string) =>
    apiClient.get('/product-variants', { params: { page, limit, productId, search } }),
  getById: (id: number) => apiClient.get(`/product-variants/${id}`),
  create: (data: ApiPayload) => apiClient.post('/product-variants', data),
  update: (id: number, data: ApiPayload) => apiClient.put(`/product-variants/${id}`, data),
  delete: (id: number) => apiClient.delete(`/product-variants/${id}`),
  toggleStatus: (id: number) => apiClient.patch(`/product-variants/${id}/toggle-status`),
};

// Distributor APIs
export const distributorAPI = {
  getAll: (page = 1, limit = 25, countryId?: number, stateId?: number, city?: string, search?: string) =>
    apiClient.get('/distributors', { params: { page, limit, countryId, stateId, city, search } }),
  getById: (id: number) => apiClient.get(`/distributors/${id}`),
  create: (data: ApiPayload) => apiClient.post('/distributors', data),
  update: (id: number, data: ApiPayload) => apiClient.put(`/distributors/${id}`, data),
  delete: (id: number) => apiClient.delete(`/distributors/${id}`),
  toggleStatus: (id: number) => apiClient.patch(`/distributors/${id}/toggle-status`),
};

// Retailer APIs
export const retailerAPI = {
  getAll: (page = 1, limit = 25, distributorId?: number, stateId?: number, city?: string, search?: string) =>
    apiClient.get('/retailers', { params: { page, limit, distributorId, stateId, city, search } }),
  getById: (id: number) => apiClient.get(`/retailers/${id}`),
  create: (data: ApiPayload) => apiClient.post('/retailers', data),
  update: (id: number, data: ApiPayload) => apiClient.put(`/retailers/${id}`, data),
  delete: (id: number) => apiClient.delete(`/retailers/${id}`),
  toggleStatus: (id: number) => apiClient.patch(`/retailers/${id}/toggle-status`),
};

// Super Distributor APIs
export const superDistributorAPI = {
  getAll: (page = 1, limit = 25, search?: string) =>
    apiClient.get('/super-distributors', { params: { page, limit, search } }),
  getById: (id: number) => apiClient.get(`/super-distributors/${id}`),
  create: (data: ApiPayload) => apiClient.post('/super-distributors', data),
  update: (id: number, data: ApiPayload) => apiClient.put(`/super-distributors/${id}`, data),
  delete: (id: number) => apiClient.delete(`/super-distributors/${id}`),
  toggleStatus: (id: number) => apiClient.patch(`/super-distributors/${id}/toggle-status`),
};

// Customer Category APIs
export const customerCategoryAPI = {
  getAll: (page = 1, limit = 25, search?: string) =>
    apiClient.get('/customer-categories', { params: { page, limit, search } }),
  getById: (id: number) => apiClient.get(`/customer-categories/${id}`),
  create: (data: ApiPayload) => apiClient.post('/customer-categories', data),
  update: (id: number, data: ApiPayload) => apiClient.put(`/customer-categories/${id}`, data),
  delete: (id: number) => apiClient.delete(`/customer-categories/${id}`),
  toggleStatus: (id: number) => apiClient.patch(`/customer-categories/${id}/toggle-status`),
};

// Customer Sub Category APIs
export const customerSubCategoryAPI = {
  getAll: (page = 1, limit = 25, categoryId?: number, search?: string) =>
    apiClient.get('/customer-sub-categories', { params: { page, limit, categoryId, search } }),
  getById: (id: number) => apiClient.get(`/customer-sub-categories/${id}`),
  create: (data: ApiPayload) => apiClient.post('/customer-sub-categories', data),
  update: (id: number, data: ApiPayload) => apiClient.put(`/customer-sub-categories/${id}`, data),
  delete: (id: number) => apiClient.delete(`/customer-sub-categories/${id}`),
  toggleStatus: (id: number) => apiClient.patch(`/customer-sub-categories/${id}/toggle-status`),
};

// Beat Plan APIs
export const beatPlanAPI = {
  getAll: (page = 1, limit = 25, employeeId?: number, weekDay?: string, city?: string, search?: string) =>
    apiClient.get('/beat-plans', { params: { page, limit, employeeId, weekDay, city, search } }),
  getById: (id: number) => apiClient.get(`/beat-plans/${id}`),
  create: (data: ApiPayload) => apiClient.post('/beat-plans', data),
  update: (id: number, data: ApiPayload) => apiClient.put(`/beat-plans/${id}`, data),
  delete: (id: number) => apiClient.delete(`/beat-plans/${id}`),
  toggleStatus: (id: number) => apiClient.patch(`/beat-plans/${id}/toggle-status`),
};

// Job Location APIs
export const jobLocationAPI = {
  getAll: (page = 1, limit = 25) =>
    apiClient.get('/job-locations', { params: { page, limit } }),
  getByEmployeeId: (employeeId: number) => apiClient.get(`/job-locations/employee/${employeeId}`),
  create: (data: ApiPayload) => apiClient.post('/job-locations', data),
  update: (employeeId: number, data: ApiPayload) => apiClient.put(`/job-locations/${employeeId}`, data),
  delete: (employeeId: number) => apiClient.delete(`/job-locations/${employeeId}`),
};

// Daily Sales Report APIs
export const dailySalesReportAPI = {
  getAll: (page = 1, limit = 25, employeeId?: number, city?: string, distributor?: string, startDate?: string, endDate?: string, search?: string) =>
    apiClient.get('/daily-sales-report', { params: { page, limit, employeeId, city, distributor, startDate, endDate, search } }),
  getById: (id: number) => apiClient.get(`/daily-sales-report/${id}`),
  create: (data: ApiPayload) => apiClient.post('/daily-sales-report', data),
  update: (id: number, data: ApiPayload) => apiClient.put(`/daily-sales-report/${id}`, data),
  delete: (id: number) => apiClient.delete(`/daily-sales-report/${id}`),
};

// Task APIs
export const taskAPI = {
  getAll: () => apiClient.get('/tasks'),
  create: (data: ApiPayload) => apiClient.post('/tasks', data),
  update: (id: number, data: ApiPayload) => apiClient.put(`/tasks/${id}`, data),
  delete: (id: number) => apiClient.delete(`/tasks/${id}`),
  getCategories: () => apiClient.get('/tasks/categories'),
  getPriorities: () => apiClient.get('/tasks/priorities'),
};

// Ledger APIs
export const ledgerAPI = {
  getTransactions: (params: ApiParams) => apiClient.get('/ledger', { params }),
  createTransaction: (data: ApiPayload) => apiClient.post('/ledger', data),
  deleteTransaction: (id: number) => apiClient.delete(`/ledger/${id}`),
};

// Order APIs
export const orderAPI = {
  getAll: () => apiClient.get('/orders'),
  create: (data: ApiPayload) => apiClient.post('/orders', data),
  updateStatus: (id: number, status: string) => apiClient.put(`/orders/${id}/status`, { status }),
  delete: (id: number) => apiClient.delete(`/orders/${id}`),
};

// Unit Measurement APIs
export const unitMeasureAPI = {
  getAll: () => apiClient.get('/units'),
  create: (data: ApiPayload) => apiClient.post('/units', data),
  update: (id: number, data: ApiPayload) => apiClient.put(`/units/${id}`, data),
  delete: (id: number) => apiClient.delete(`/units/${id}`),
  toggleStatus: (id: number) => apiClient.patch(`/units/${id}/toggle-status`),
};

// Manager APIs
export const managerAPI = {
  getAll: () => apiClient.get('/managers'),
  getById: (id: number) => apiClient.get(`/managers/${id}`),
  create: (data: ApiPayload) => apiClient.post('/managers', data),
  update: (id: number, data: ApiPayload) => apiClient.put(`/managers/${id}`, data),
  delete: (id: number) => apiClient.delete(`/managers/${id}`),
};

// Quotation Config APIs
export const quotationConfigAPI = {
  getConfigs: () => apiClient.get('/quotation-config'),
  updateConfigs: (columns: unknown[]) => apiClient.post('/quotation-config/update', { columns }),
};

// Branch APIs
export const branchAPI = {
  getAll: () => apiClient.get('/branches'),
  getById: (id: number) => apiClient.get(`/branches/${id}`),
  create: (data: ApiPayload) => apiClient.post('/branches', data),
  update: (id: number, data: ApiPayload) => apiClient.put(`/branches/${id}`, data),
  delete: (id: number) => apiClient.delete(`/branches/${id}`),
};

// Department APIs
export const departmentAPI = {
  getAll: () => apiClient.get('/departments'),
  getById: (id: number) => apiClient.get(`/departments/${id}`),
  create: (data: ApiPayload) => apiClient.post('/departments', data),
  update: (id: number, data: ApiPayload) => apiClient.put(`/departments/${id}`, data),
  delete: (id: number) => apiClient.delete(`/departments/${id}`),
};

// Designation APIs
export const designationAPI = {
  getAll: () => apiClient.get('/designations'),
  getById: (id: number) => apiClient.get(`/designations/${id}`),
  create: (data: ApiPayload) => apiClient.post('/designations', data),
  update: (id: number, data: ApiPayload) => apiClient.put(`/designations/${id}`, data),
  delete: (id: number) => apiClient.delete(`/designations/${id}`),
};

// Employee APIs
export const employeeAPI = {
  getAll: (params?: ApiParams) => apiClient.get('/employees', { params }),
  getById: (id: number) => apiClient.get(`/employees/${id}`),
  create: (data: ApiPayload) => apiClient.post('/employees', data),
  update: (id: number, data: ApiPayload) => apiClient.put(`/employees/${id}`, data),
  delete: (id: number) => apiClient.delete(`/employees/${id}`),
};

// Employee Engagement APIs
export const engagementAPI = {
  getUpcomingEvents: (params?: ApiParams) => apiClient.get('/engagement/upcoming', { params }),
};

// Celebration Template APIs
export const celebrationTemplateAPI = {
  getAll: () => apiClient.get('/celebration-templates'),
  create: (data: ApiPayload) => apiClient.post('/celebration-templates', data),
  update: (id: number, data: ApiPayload) => apiClient.put(`/celebration-templates/${id}`, data),
  delete: (id: number) => apiClient.delete(`/celebration-templates/${id}`),
};

// FaceX App APIs
export const faceXAPI = {
  // Admins
  getAdmins: () => apiClient.get('/facex/admins'),
  generateAdmin: (data: { managerId: number }) => apiClient.post('/facex/admins/generate', data),
  deleteAdmin: (id: number) => apiClient.delete(`/facex/admins/${id}`),
  toggleAdminStatus: (id: number) => apiClient.patch(`/facex/admins/${id}/toggle`),

  // Devices
  getDevices: (params?: ApiParams) => apiClient.get('/facex/devices', { params }),
  updateDeviceStatus: (id: number, data: ApiPayload) => apiClient.patch(`/facex/devices/${id}/status`, data),

  // User Face Data
  getUserFaceData: (params?: ApiParams) => apiClient.get('/facex/user-face-data', { params }),
  deleteUserFaceData: (id: number) => apiClient.delete(`/facex/user-face-data/${id}`),

  // Change Requests
  getChangeRequests: (params?: ApiParams) => apiClient.get('/facex/change-requests', { params }),
  handleChangeRequest: (id: number, data: ApiPayload) => apiClient.patch(`/facex/change-requests/${id}/handle`, data),

  // Settings
  getSettings: () => apiClient.get('/facex/settings'),
  updateSettings: (data: ApiPayload) => apiClient.patch('/facex/settings', data),
};

// Event Management APIs
export const eventAPI = {
  getAll: (params?: ApiParams) => apiClient.get('/events', { params }),
  getById: (id: number) => apiClient.get(`/events/${id}`),
  create: (data: ApiPayload) => apiClient.post('/events', data),
  update: (id: number, data: ApiPayload) => apiClient.put(`/events/${id}`, data),
  delete: (id: number) => apiClient.delete(`/events/${id}`),
  rsvp: (data: ApiPayload) => apiClient.post('/events/rsvp', data),
  getReport: (params?: ApiParams) => apiClient.get('/events/report', { params }),
};

// Penalty Management APIs
export const penaltyAPI = {
  // Rules
  getRules: () => apiClient.get('/penalty/rules'),
  createRule: (data: ApiPayload) => apiClient.post('/penalty/rules', data),
  updateRule: (id: number, data: ApiPayload) => apiClient.put(`/penalty/rules/${id}`, data),
  deleteRule: (id: number) => apiClient.delete(`/penalty/rules/${id}`),
  
  // Conversions
  getConversions: () => apiClient.get('/penalty/conversions'),
  createConversion: (data: ApiPayload) => apiClient.post('/penalty/conversions', data),
  
  // Records
  getRecords: (params?: ApiParams) => apiClient.get('/penalty/records', { params }),
  approve: (id: number, data: ApiPayload) => apiClient.put(`/penalty/records/${id}/approve`, data),
  reject: (id: number, data: ApiPayload) => apiClient.put(`/penalty/records/${id}/reject`, data),
  deleteRecord: (id: number) => apiClient.delete(`/penalty/records/${id}`),
  
  // Reports
  getReport: (params?: ApiParams) => apiClient.get('/penalty/report', { params }),
};

// Company Gallery APIs
export const galleryAPI = {
  // Albums
  getAlbums: () => apiClient.get('/gallery/albums'),
  createAlbum: (data: ApiPayload) => apiClient.post('/gallery/albums', data),
  updateAlbum: (id: number, data: ApiPayload) => apiClient.put(`/gallery/albums/${id}`, data),
  deleteAlbum: (id: number) => apiClient.delete(`/gallery/albums/${id}`),
  setAlbumCover: (id: number, data: ApiPayload) => apiClient.put(`/gallery/albums/${id}/cover`, data),
  // Media
  getMediaByAlbum: (albumId: number) => apiClient.get(`/gallery/albums/${albumId}/media`),
  addMedia: (data: ApiPayload) => apiClient.post('/gallery/media', data),
  addBulkMedia: (data: ApiPayload) => apiClient.post('/gallery/media/bulk', data),
  deleteMedia: (id: number) => apiClient.delete(`/gallery/media/${id}`),
  likeMedia: (id: number) => apiClient.post(`/gallery/media/${id}/like`),
};

export const assetsAPI = {
  // Categories
  getCategories: () => apiClient.get('/assets/categories'),
  createCategory: (data: ApiPayload) => apiClient.post('/assets/categories', data),
  updateCategory: (id: number, data: ApiPayload) => apiClient.put(`/assets/categories/${id}`, data),
  deleteCategory: (id: number) => apiClient.delete(`/assets/categories/${id}`),

  // ID Settings
  getIDSettings: () => apiClient.get('/assets/id-settings'),
  updateIDSettings: (data: ApiPayload) => apiClient.put('/assets/id-settings', data),

  // Assets
  getAssets: (params?: ApiParams) => apiClient.get('/assets', { params }),
  createAsset: (data: ApiPayload) => apiClient.post('/assets', data),
  bulkUploadAssets: (data: ApiPayload) => apiClient.post('/assets/bulk', data),
  updateAsset: (id: number, data: ApiPayload) => apiClient.put(`/assets/${id}`, data),
  deleteAsset: (id: number) => apiClient.delete(`/assets/${id}`),
  assignAsset: (id: number, data: ApiPayload) => apiClient.post(`/assets/${id}/assign`, data),

  // Maintenance
  getMaintenance: (params?: ApiParams) => apiClient.get('/assets/maintenance', { params }),
  createMaintenance: (data: ApiPayload) => apiClient.post('/assets/maintenance', data),
  completeMaintenance: (id: number, data: ApiPayload) => apiClient.put(`/assets/maintenance/${id}/complete`, data),

  // Scrap
  getScrap: () => apiClient.get('/assets/scrap'),
  scrapAsset: (data: ApiPayload) => apiClient.post('/assets/scrap', data),

  // History & Stats
  getHistory: (assetId: number) => apiClient.get(`/assets/${assetId}/history`),
  getStats: () => apiClient.get('/assets/stats'),

  // Security Settings
  getSecuritySettings: () => apiClient.get('/assets/security-settings'),
  updateSecuritySetting: (data: ApiPayload) => apiClient.put('/assets/security-settings', data),
};


// Shift Management APIs
export const shiftAPI = {
  getAll: () => apiClient.get('/shifts'),
  getById: (id: number) => apiClient.get(`/shifts/${id}`),
};

// Leave Type APIs
export const leaveTypeAPI = {
  getAll: () => apiClient.get('/leaves/types'),
};

// Survey APIs
export const surveyAPI = {
  getAll: (params?: ApiParams) => apiClient.get('/surveys', { params }),
  getById: (id: number) => apiClient.get(`/surveys/${id}`),
  create: (data: ApiPayload) => apiClient.post('/surveys', data),
  update: (id: number, data: ApiPayload) => apiClient.put(`/surveys/${id}`, data),
  delete: (id: number) => apiClient.delete(`/surveys/${id}`),
  submitResponse: (data: ApiPayload) => apiClient.post('/surveys/submit', data),
};

export const pollAPI = {
  getAll: () => apiClient.get('/polls'),
  create: (data: ApiPayload) => apiClient.post('/polls', data),
  delete: (id: number) => apiClient.delete(`/polls/${id}`),
  vote: (optionId: number) => apiClient.post('/polls/vote', { optionId }),
};

// Nominee APIs
export const nomineeAPI = {
  getTypes: () => apiClient.get('/nominees/types'),
  createType: (data: ApiPayload) => apiClient.post('/nominees/types', data),
  updateType: (id: number, data: ApiPayload) => apiClient.put(`/nominees/types/${id}`, data),
  deleteType: (id: number) => apiClient.delete(`/nominees/types/${id}`),
  
  getAll: () => apiClient.get('/nominees'),
  create: (data: ApiPayload) => apiClient.post('/nominees', data),
  bulkUpload: (data: ApiPayload) => apiClient.post('/nominees/bulk', data),
  delete: (id: number) => apiClient.delete(`/nominees/${id}`),
};

// Lost & Found APIs
export const lostAndFoundAPI = {
  getItems: (params?: ApiParams) => apiClient.get('/lost-and-found/items', { params }),
  reportItem: (data: ApiPayload) => apiClient.post('/lost-and-found/items', data),
  updateItemStatus: (id: number, status: string) => apiClient.put(`/lost-and-found/items/${id}`, { status }),
  deleteItem: (id: number) => apiClient.delete(`/lost-and-found/items/${id}`),
  
  getClaims: () => apiClient.get('/lost-and-found/claims'),
  claimItem: (data: ApiPayload) => apiClient.post('/lost-and-found/claims', data),
  verifyClaim: (id: number, data: ApiPayload) => apiClient.put(`/lost-and-found/claims/${id}`, data),
};

// Dashboard APIs
export const dashboardAPI = {
  getStats: () => apiClient.get('/dashboard/stats'),
};

// App Banner APIs
export const appBannerAPI = {
  getAll: () => apiClient.get('/app-banners'),
  create: (data: ApiPayload) => apiClient.post('/app-banners', data),
  update: (id: number, data: ApiPayload) => apiClient.put(`/app-banners/${id}`, data),
  toggle: (id: number) => apiClient.patch(`/app-banners/${id}/toggle`),
  delete: (id: number) => apiClient.delete(`/app-banners/${id}`),
};

// LMS APIs
export const lmsAPI = {
  getCourses: () => apiClient.get('/lms/courses'),
  createCourse: (data: ApiPayload) => apiClient.post('/lms/courses', data),
  updateCourse: (id: number, data: ApiPayload) => apiClient.put(`/lms/courses/${id}`, data),
  deleteCourse: (id: number) => apiClient.delete(`/lms/courses/${id}`),
  getReport: () => apiClient.get('/lms/report'),
  createProgress: (data: ApiPayload) => apiClient.post('/lms/progress', data),
};

// Activity Logs APIs
export const activityLogAPI = {
  getAll: () => apiClient.get('/activity-logs'),
  create: (data: ApiPayload) => apiClient.post('/activity-logs', data),
};

// Admin Settings APIs
export const adminSettingsAPI = {
  getAccessRules: () => apiClient.get('/admin-settings/access-rules'),
  createAccessRule: (data: ApiPayload) => apiClient.post('/admin-settings/access-rules', data),
  deleteAccessRule: (id: number) => apiClient.delete(`/admin-settings/access-rules/${id}`),
  getPermissionConfig: () => apiClient.get('/admin-settings/permission-config'),
  savePermissionConfig: (data: ApiPayload) => apiClient.put('/admin-settings/permission-config', data),
  getAppConfig: () => apiClient.get('/admin-settings/app-config'),
  saveAppConfig: (data: ApiPayload) => apiClient.put('/admin-settings/app-config', data),
  getOrderConfig: () => apiClient.get('/admin-settings/order-config'),
  saveOrderConfig: (data: ApiPayload) => apiClient.put('/admin-settings/order-config', data),
  getTaskConfig: () => apiClient.get('/admin-settings/task-config'),
  saveTaskConfig: (data: ApiPayload) => apiClient.put('/admin-settings/task-config', data),
};

export default apiClient;

