import templateService from "../services/template.service.js";

class TemplateController{
    constructor(){
        this.createTemplate = this.createTemplate.bind(this)
        // this.findTemplatesByUser = this.findTemplatesByUser.bind(this)
    }

    async createTemplate(req,res){
        const {name,html} = req.body;

        if (!name || !html) {
            return res.status(400).json({ success: false, message: 'Template name and HTML are required.'})
        }

        try {
            const newTemplate = await templateService.saveTemplate(req.user.id , name , html)
            res.status(201).json({ success: true, message: 'Template saved successfully.', template:newTemplate})
        } catch (error) {
            console.error('Error saving template:', error);
            res.status(500).json({ success: false, message: 'Internal server error.' });
        }
    }

    async getTemplates(req,res){
        try {
            const templates = await templateService.findTemplatesByUser(req.user.id)
            res.status(200).json({success: true, message: 'fetched all Templets', templates});
        } catch (error) {
            console.error('Error fetching templates:', error);
            res.status(500).json({ success: false, message: 'Internal server error.' });
        }
    }
}
export default new TemplateController()