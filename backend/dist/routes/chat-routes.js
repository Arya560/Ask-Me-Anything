import { Router } from "express";
import { verifyToken } from "../libs/jwt-token-generator.js";
import { chatCompletionValidator, validate, } from "../libs/data-validators.js";
import { deleteChats, generateChatCompletion, sendChatsToUser, } from "../controllers/chat-controllers.js";
//protected api
const chatRoutes = Router();
chatRoutes.post("/new", validate(chatCompletionValidator), verifyToken, generateChatCompletion);
chatRoutes.get("/all-chats", verifyToken, sendChatsToUser);
chatRoutes.delete("/delete", verifyToken, deleteChats);
export default chatRoutes;
//# sourceMappingURL=chat-routes.js.map