import express from "express";
import {
  createAdminAccessRule,
  deleteAdminAccessRule,
  getAdminAccessRules,
  getAdminPermissionConfig,
  getAppSettingsConfig,
  getOrderSettingsConfig,
  getTaskSettingsConfig,
  saveAdminPermissionConfig,
  saveAppSettingsConfig,
  saveOrderSettingsConfig,
  saveTaskSettingsConfig,
} from "../controllers/adminSettingsController.js";

const router = express.Router();

router.get("/access-rules", getAdminAccessRules);
router.post("/access-rules", createAdminAccessRule);
router.delete("/access-rules/:id", deleteAdminAccessRule);

router.get("/permission-config", getAdminPermissionConfig);
router.put("/permission-config", saveAdminPermissionConfig);

router.get("/app-config", getAppSettingsConfig);
router.put("/app-config", saveAppSettingsConfig);

router.get("/order-config", getOrderSettingsConfig);
router.put("/order-config", saveOrderSettingsConfig);

router.get("/task-config", getTaskSettingsConfig);
router.put("/task-config", saveTaskSettingsConfig);

export default router;
