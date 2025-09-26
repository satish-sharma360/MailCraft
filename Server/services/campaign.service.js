import AnalyticsModels from "../Models/Analytics.models.js";
import CampaignModels from "../Models/Campaign.models.js";
import TemplateModels from "../Models/Template.models.js";

class CampaignService {
    async createCampaignService(userId, data) {
        const { template, subject, recipients, scheduledAt } = data;
        const existingTemplate = await TemplateModels.findOne({ _id: template, user: userId })
        if (!existingTemplate) {
            const err = new Error("Template not found");
            err.statusCode = 404;
            throw err;
        }

        const campaign = await CampaignModels.create({
            user: userId,
            template,
            subject,
            recipients,
            scheduledAt,
        });

        return campaign;
    }

    async getAllCampaigns(userId) {
        return await CampaignModels.find({ user: userId }).populate("template")
    }

    async getCampaignById(userId, campaignId) {
        return await CampaignModels.findOne({ _id: campaignId, user: userId }).populate("template");
    }

    async updateCampaign(userId, campaignId, data) {
        const campaign = await CampaignModels.findOne({ _id: campaignId, user: userId })

        if (!campaign) {
            const err = new Error("Campaign not found");
            err.statusCode = 404;
            throw err;
        }

        if (data.subject) campaign.subject = data.subject;
        if (data.recipients) campaign.recipients = data.recipients;
        if (data.scheduledAt) campaign.scheduledAt = data.scheduledAt;

        await campaign.save()
        return campaign
    }

    async deleteCampaign(userId, campaignId) {
        const campaign = await CampaignModels.findOneAndDelete({ _id: campaignId, user: userId });
        if (!campaign) {
            const err = new Error("Campaign not found");
            err.statusCode = 404;
            throw err;
        }
        return true;
    }

    async sendCampaign(userId, campaignId) {
        const campaign = await CampaignModels.findOne({ _id: campaignId, user: userId });
        if (!campaign) {
            const err = new Error("Campaign not found");
            err.statusCode = 404;
            throw err;
        }

        // Create dummy analytics
        const analyticsList = campaign.recipients.map((email) => ({
            campaign: campaign._id,
            recipient: email,
            status: "sent",
            opened: false,
            clickedLinks: [],
        }));

        await AnalyticsModels.insertMany(analyticsList);

        campaign.status = "sent";
        campaign.sentCount = campaign.recipients.length;
        await campaign.save();

        return campaign;
    }
}

export default new CampaignService()
