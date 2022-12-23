import express from "express"
import { getUser, login, register, verifyToken } from "../controllers/AuthController.js"
const router = express.Router()
// import multer from 'multer'

// import fs from 'fs'

// const storage = multer.diskStorage({
//     destination:(req,file, cb)=>{
//     cb(null, 'uploads')
//     },
//     filename:(req, file, cb)=>{
//         cb(null, file.originalname)
//     }
// })

// const upload = multer({storage:storage})

// REGISTER
router.post("/register", register)

// LOGIN
router.post("/login", login) 
router.get("/user", verifyToken, getUser) 
router.post("/createpost") 

// router.post("/image", upload.single('testImage'), (req,res)=>{
//     try {
//         const saveImage = new imgModel({
//             name:req.body.name,
//             img:{
//                 data:fs.readFileSync("uploads/" + req.file.filename),
//                 contentType:"image/png"
//             }
//         })
//       saveImage.save()
//         res.status(200).json(saveImage)
//     } catch (error) {
//         res.send(error.message) 
//     }
// })



export default router