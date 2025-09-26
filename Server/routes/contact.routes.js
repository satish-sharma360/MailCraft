import express from "express";
import contactController from "../controllers/contact.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";

const contactRouter = express.Router();

contactRouter.post("/create", authMiddleware, contactController.createContact);
contactRouter.get("/all", authMiddleware, contactController.getAllContacts);
contactRouter.get("/:id", authMiddleware, contactController.getContactById);
contactRouter.put("/:id", authMiddleware, contactController.updateContact);
contactRouter.delete("/:id", authMiddleware, contactController.deleteContact);
contactRouter.post("/bulk-upload", authMiddleware, contactController.bulkCreateContacts);

export default contactRouter;
