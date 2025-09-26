import AnalyticsModels from "../Models/Analytics.models.js"
import CampaignModels from "../Models/Campaign.models.js"

class AnalyticsService {
    async getAllAnalytics(userId) {
        const campaign = await CampaignModels.find({ user: userId }).select({ _id })
        const campaignIds = campaign.map(c => c._id)

        return await AnalyticsModels.find({ campaign: { $in: campaignIds } })
    }
    async getAnalyticsByCampaign(userId, campaignId) {
        // Verify campaign belongs to user
        const campaign = await CampaignModels.findOne({ _id: campaignId, user: userId });
        if (!campaign) {
            const err = new Error("Campaign not found");
            err.statusCode = 404;
            throw err;
        }

        return await AnalyticsModels.find({ campaign: campaignId });
    }

    // Track email open (via invisible pixel)
    async trackOpen(campaignId, recipientEmail) {
        const record = await AnalyticsModels.findOne({ campaign: campaignId, recipient: recipientEmail });
        if (record && !record.opened) {
            record.opened = true;
            await record.save();
        }
        return record;
    }

    // Track link click
    async trackClick(campaignId, recipientEmail, link) {
        const record = await AnalyticsModels.findOne({ campaign: campaignId, recipient: recipientEmail });
        if (record) {
            record.clickedLinks.push(link);
            await record.save();
        }
        return record;
    }

    // Dashboard stats for user
    async getDashboardStats(userId) {
        const campaigns = await CampaignModels.find({ user: userId });
        const totalCampaigns = campaigns.length;

        let totalSent = 0;
        let totalFailed = 0;
        let totalOpened = 0;
        let totalClicks = 0;

        for (const c of campaigns) {
            totalSent += c.sentCount || 0;
            totalFailed += c.failedCount || 0;
            const analytics = await AnalyticsModels.find({ campaign: c._id });
            totalOpened += analytics.filter(a => a.opened).length;
            totalClicks += analytics.reduce((sum, a) => sum + (a.clickedLinks?.length || 0), 0);
        }
        return { totalCampaigns, totalSent, totalFailed, totalOpened, totalClicks };
    }
}
export default new AnalyticsService()