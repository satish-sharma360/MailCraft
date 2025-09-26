import express from "express";
import authMiddleware from "../middleware/auth.middleware.js";
import campaignController from "../controllers/campaign.controller.js";


const campaignRouter = express.Router();

campaignRouter.post("/create", authMiddleware, campaignController.createCampaign);
campaignRouter.get("/all", authMiddleware, campaignController.getAllCampaigns);
campaignRouter.get("/:id", authMiddleware, campaignController.getCampaignById);
campaignRouter.put("/:id", authMiddleware, campaignController.updateCampaign);
campaignRouter.delete("/:id", authMiddleware, campaignController.deleteCampaign);
campaignRouter.post("/:id/send", authMiddleware, campaignController.sendCampaign);

export default campaignRouter;