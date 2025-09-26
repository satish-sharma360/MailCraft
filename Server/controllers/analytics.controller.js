import analyticsService from "../services/analytics.service.js";

class AnalyticsController {
    async getAllAnalytics(req, res) {
        try {
            const analytics = await analyticsService.getAllAnalytics(req.user.id);
            res.json({ success: true, data: analytics });
        } catch (error) {
            res.status(error.statusCode || 500).json({ success: false, message: error.message });
        }
    }

    async getAnalyticsByCampaign(req, res) {
        try {
            const analytics = await analyticsService.getAnalyticsByCampaign(req.user.id, req.params.id);
            res.json({ success: true, data: analytics });
        } catch (error) {
            res.status(error.statusCode || 500).json({ success: false, message: error.message });
        }
    }

    async trackOpen(req, res) {
        try {
            const { campaignId, recipient } = req.query;
            const record = await analyticsService.trackOpen(campaignId, recipient);
            res.json({ success: true, data: record });
        } catch (error) {
            res.status(error.statusCode || 500).json({ success: false, message: error.message });
        }
    }

    async trackClick(req, res) {
        try {
            const { campaignId, recipient, link } = req.query;
            const record = await analyticsService.trackClick(campaignId, recipient, link);
            res.json({ success: true, data: record });
        } catch (error) {
            res.status(error.statusCode || 500).json({ success: false, message: error.message });
        }
    }

    async getDashboardStats(req, res) {
        try {
            const stats = await analyticsService.getDashboardStats(req.user.id);
            res.json({ success: true, data: stats });
        } catch (error) {
            res.status(error.statusCode || 500).json({ success: false, message: error.message });
        }
    }
}
export default new AnalyticsController()