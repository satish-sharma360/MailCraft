import TemplateModels from "../Models/Template.models.js";

class TemplateService {
    async saveTemplate(userId, name, html) {
        if (!userId || !name || !html) {
            const err = new Error("UserId, name, and html are required");
            err.statusCode = 400;
            throw err;
        }

        const newTemplate = await TemplateModels.create({
            user: userId,
            name,
            html
        })
        return newTemplate;
    }
    async findTemplatesByUser(userId) {
        if (!userId) {
            const err = new Error("UserId is required");
            err.statusCode = 400;
            throw err;
        }

        const templets = await TemplateModels.find({ user: userId }).sort({ createdAt: -1 })
        return templets
    }

    async getTemplateById(userId, templateId) {
        const template = await TemplateModels.findById({ _id: templateId, user: userId })
        if (!templateId) {
            const err = new Error("Template not found");
            err.statusCode = 404;
            throw err;
        }
        return template
    }

    async updateTemplate(userId, templateId, data) {
        const template = await TemplateModels.findOne({ _id: templateId, user: userId })

        if (!template) {
            const err = new Error("Template not found");
            err.statusCode = 404;
            throw err;
        }

        if (data.name) {
            template.name = data.name;
        }
        if (data.html) {
            template.html = data.html;
        }

        await template.save()
        return template;
    }

    async deleteTemplate(userId, templateId) {
        const template = await TemplateModels.findOneAndDelete({ _id: templateId, user: userId })
        if (!template) {
            const err = new Error("Template not found");
            err.statusCode = 404;
            throw err;
        }
        return template;
    }

    async previewTemplate(userId, templateId) {
        const template = await TemplateModels.findOne({ _id: templateId, user: userId })
        if (!template) {
            const err = new Error("Template not found");
            err.statusCode = 404;
            throw err;
        }
        return template;
    }
}

export default new TemplateService()