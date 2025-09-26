import contactService from "../services/contact.service.js";

class ContactController {
    async createContact(req, res) {
        try {
            const contact = await contactService.createContact(req.user.id, req.body)
            res.json({ success: true, message: "Contact created successfully", data: contact });
        } catch (error) {
            res.status(error.statusCode || 500).json({ success: false, message: error.message });
        }
    }
    async getAllContacts(req, res) {
        try {
            const contacts = await contactService.getAllContacts(req.user.id)
            res.json({ success: true, message: "Fetch all successfully", data: contacts });
        } catch (error) {
            res.status(error.statusCode || 500).json({ success: false, message: error.message });
        }
    }
    async getContactById(req, res) {
        try {
            const contact = await contactService.getContactById(req.user.id, req.params.id)
            if (!contact) return res.status(404).json({ success: false, message: "Contact not found" });
            res.json({ success: true, data: contact });
        } catch (error) {
            res.status(error.statusCode || 500).json({ success: false, message: error.message });
        }
    }
    async updateContact(req, res) {
        try {
            const contact = await contactService.updateContact(req.user.id, req.params.id , req.body)
            res.json({ success: true, message: "Contact updated successfully", data: contact });
        } catch (error) {
            res.status(error.statusCode || 500).json({ success: false, message: error.message });
        }
    }
    async deleteContact(req, res) {
        try {
            const contact = await contactService.deleteContact(req.user.id, req.params.id)
            res.json({ success: true, message: "Contact delete successfully"});
        } catch (error) {
            res.status(error.statusCode || 500).json({ success: false, message: error.message });
        }
    }
    async bulkCreateContacts(req, res) {
        try {
            const insertedContacts = await contactService.bulkCreateContacts(req.user.id, req.body.contacts)
            res.json({ success: true, message: "Contacts uploaded successfully", data: insertedContacts });
        } catch (error) {
            res.status(error.statusCode || 500).json({ success: false, message: error.message });
        }
    }
}
export default new ContactController()