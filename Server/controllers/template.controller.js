import templateService from "../services/template.service.js";

class TemplateController {
    constructor() {
        this.createTemplate = this.createTemplate.bind(this)
        // this.findTemplatesByUser = this.findTemplatesByUser.bind(this)
    }

    async createTemplate(req, res) {
        const { name, html } = req.body;

        if (!html || !name) {
            return res.status(400).json({ success: false, message: 'Template name and HTML are required.' })
        }

        try {
            const newTemplate = await templateService.saveTemplate(req.user.id, name, html)
            res.status(201).json({ success: true, message: 'Template saved successfully.', template: newTemplate })
        } catch (error) {
            console.error('Error saving template:', error);
            res.status(500).json({ success: false, message: 'Internal server error.' });
        }
    }

    async getTemplates(req, res) {
        try {
            const templates = await templateService.findTemplatesByUser(req.user.id)
            res.status(200).json({ success: true, message: 'fetched all Templets', templates, count: templates.length, });
        } catch (error) {
            console.error('Error fetching templates:', error);
            res.status(500).json({ success: false, message: 'Internal server error.' });
        }
    }

    async getTemplateById(req, res) {
        try {
            const template = await templateService.getTemplateById(req.user._id, req.params.id)
            res.json({ success: true, data: template });
        } catch (error) {
            console.error('Error fetching templates:', error);
            res.status(500).json({ success: false, message: 'Internal server error.' });
        }
    }

    async updateTemplate(req, res) {
        try {
            if (!req.body.name && !req.body.html) {
                return res.status(400).json({ success: false, message: "At least one field (name or html) must be provided", });
            }
            const template = await templateService.updateTemplate(req.user.id, req.params.id, req.body)
            res.json({ success: true, message: "Template updated successfully", data: template, });
        } catch (error) {
            console.error('Error Updating templates:', error);
            res.status(500).json({ success: false, message: 'Internal server error.' });
        }
    }
    async deleteTemplate(req, res) {
        try {
            await templateService.deleteTemplate(req.user.id, req.params.id)
            res.json({ success: true, message: "Template deleted successfully" });
        } catch (error) {
            console.error('Error deleting templates:', error);
            res.status(500).json({ success: false, message: 'Internal server error.' });
        }
    }
    async previewTemplate(req, res) {
        try {
            const template = await templateService.previewTemplate(req.user.id, req.params.id)
            res.set("Content-Type", "text/html");
            res.send(template.html);
        } catch (error) {
            console.error('Error preview templates:', error);
            res.status(500).json({ success: false, message: 'Internal server error.' });
        }
    }
}
export default new TemplateController()