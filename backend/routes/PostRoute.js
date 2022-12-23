import express from "express"
import { login, register } from "../controllers/AuthController.js"
const router = express.Router()
import { createPost, deletePost, getAllPost, update } from "../controllers/PostController.js"

// const storage = multer.diskStorage({
//     destination:(req,file, cb)=>{
//     cb(null, 'uploads')
//     },
//     filename:(req, file, cb)=>{
//         cb(null, file.originalname)
//     }
// })

// const upload = multer({storage:storage})


router.post("/createpost", createPost) 
router.get("/posts", getAllPost) 
router.delete("/delete/:id", deletePost) 
router.put("/update/:id", update) 


export default router