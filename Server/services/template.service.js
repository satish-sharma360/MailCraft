import TemplateModels from "../Models/Template.models.js";

class TemplateService {
    async saveTemplate(userId, name, html) {
        if (!userId || !name || !html) {
            throw new Error('User ID, name, and HTML are required to save a template.');
        }

        const newTemplate = await TemplateModels.create({
            user:userId,
            name,
            html
        })
        return newTemplate;
    }
    async findTemplatesByUser(userId){
        if (!userId) {
            throw new Error('User ID is required to find templates.');
        }

        const templets = await TemplateModels.find({user : userId})
        return templets
    }
}
export default new TemplateService()