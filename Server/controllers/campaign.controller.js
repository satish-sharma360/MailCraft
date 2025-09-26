import campaignService from "../services/campaign.service.js";

class CampaignController {
    async createCampaign(req, res) {
        const { template, subject, recipients, scheduledAt } = req.body;
        if (!template || !subject || !recipients?.length) {
            return res.status(400).json({
                success: false,
                message: "Template, subject, and recipients are required",
            });
        }
        try {
            const campaign = await campaignService.createCampaignService(req.user.id, req.body)
            res.json({ success: true, message: "Campaign created successfully", data: campaign });
        } catch (error) {
            console.error("Error creating campaign:", error);
            res.status(error.statusCode || 500).json({ success: false, message: error.message });
        }
    }
    async getAllCampaigns(req, res) {
        try {
            const campaigns = await campaignService.getAllCampaigns(req.user.id)
            res.json({ success: true, data: campaigns });
        } catch (error) {
            console.error("Error getting campaign:", error);
            res.status(error.statusCode || 500).json({ success: false, message: error.message });
        }
    }
    async getCampaignById(req, res) {
        try {
            const campaign = await campaignService.getCampaignById(req.params.id, req.user.id)
            if (!campaign) return res.status(404).json({ success: false, message: "Campaign not found" });
            res.json({ success: true, data: campaign });
        } catch (error) {
            console.error("Error getting campaign by id:", error);
            res.status(error.statusCode || 500).json({ success: false, message: error.message });
        }
    }
    async updateCampaign(req, res) {
        try {
            const campaign = await campaignService.updateCampaign(req.user.id, req.params.id, req.body)
            res.json({ success: true, message: "Campaign updated successfully", data: campaign });
        } catch (error) {
            console.error("Error getting campaign update", error);
            res.status(error.statusCode || 500).json({ success: false, message: error.message });
        }
    }
    async deleteCampaign(req, res) {
        try {
            await campaignService.deleteCampaign(req.user.id, req.params.id)
            res.json({ success: true, message: "Campaign delete successfully" });
        } catch (error) {
            console.error("Error getting campaign delete", error);
            res.status(error.statusCode || 500).json({ success: false, message: error.message });
        }
    }
    // Optional: send campaign immediately
    async sendCampaign(req, res) {
        try {
            const campaign = await campaignService.sendCampaign(req.user.id, req.params.id);
            res.json({ success: true, message: "Campaign sent successfully", data: campaign });
        } catch (error) {
            res.status(error.statusCode || 500).json({ success: false, message: error.message });
        }
    }
}
export default new CampaignController()