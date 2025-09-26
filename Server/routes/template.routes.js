import express from "express";
import authMiddleware from "../middleware/auth.middleware.js";
import templateController from "../controllers/template.controller.js";

const templateRouter = express.Router()

templateRouter.post('/create' , authMiddleware,templateController.createTemplate )
templateRouter.get('/get-all' , authMiddleware,templateController.getTemplates )
templateRouter.get('/get/:id' , authMiddleware,templateController.getTemplateById )
templateRouter.put('/update/:id' , authMiddleware,templateController.updateTemplate )
templateRouter.delete('/delet/:id' , authMiddleware,templateController.deleteTemplate )
templateRouter.get('/preview/:id' , authMiddleware,templateController.previewTemplate )

export default templateRouter