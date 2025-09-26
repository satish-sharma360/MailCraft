import express from "express";
import analyticsController from "../controllers/analytics.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";

const analyticsRouter = express.Router();

analyticsRouter.get("/all", authMiddleware, analyticsController.getAllAnalytics);
analyticsRouter.get("/campaign/:id", authMiddleware, analyticsController.getAnalyticsByCampaign);
analyticsRouter.get("/track/open", analyticsController.trackOpen);  // pixel tracking
analyticsRouter.get("/track/click", analyticsController.trackClick); // click tracking
analyticsRouter.get("/dashboard", authMiddleware, analyticsController.getDashboardStats);

export default analyticsRouter;
