import ContactModels from "../Models/Contact.models.js";

class ContactService {
    async createContact(userId, data) {
        const { name, email, tags, source } = data;
        if (!email) {
            const err = new Error("Email is required");
            err.statusCode = 400;
            throw err;
        }
        const contact = await ContactModels.create({
            user: userId,
            name,
            email,
            tags: tags || [],
            source: source || "manual"
        })
        return contact
    }
    async getAllContacts(userId) {
        return await ContactModels.find({ user: userId });
    }
    async getContactById(userId, contactId) {
        return await ContactModels.findOne({ _id: contactId, user: userId });
    }

    async updateContact(userId, contactId, data) {
        const contact = await ContactModels.findOne({ _id: contactId, user: userId });
        if (!contact) {
            const err = new Error("Contact not found");
            err.statusCode = 404;
            throw err;
        }

        if (data.name) contact.name = data.name;
        if (data.email) contact.email = data.email;
        if (data.tags) contact.tags = data.tags;
        if (data.source) contact.source = data.source;

        await contact.save();
        return contact;
    }

    async deleteContact(userId, contactId) {
        const contact = await ContactModels.findOneAndDelete({ _id: contactId, user: userId });
        if (!contact) {
            const err = new Error("Contact not found");
            err.statusCode = 404;
            throw err;
        }
        return true;
    }

    // Bulk insert contacts (CSV upload)
    async bulkCreateContacts(userId, contactsArray) {
        // contactsArray = [{ name, email, tags, source }, ...]
        const contacts = contactsArray.map(c => ({
            user: userId,
            name: c.name || "",
            email: c.email,
            tags: c.tags || [],
            source: c.source || "csv"
        }));

        const insertedContacts = await ContactModels.insertMany(contacts);
        return insertedContacts;
    }
}
export default new ContactService()