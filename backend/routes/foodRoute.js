import express from "express";
import { addFood, listFood, removeFood } from "../controllers/foodController.js";
import multer from "multer";


const foodRouter = express.Router();

// Add logic that will put the image in uploads folder.
const storage = multer.diskStorage({
    destination: "uploads",
    filename: (req, file, cb) => {
        return cb(null, `${Date.now()}${file.originalname}`); // this will make sure the file name has unique name
    }
});

// middleware upload
const upload = multer({storage: storage});

//below is the post request, this is where we get information from the form and the image will be uploaded as well
foodRouter.post("/add", upload.single("image"),addFood);
foodRouter.get("/list", listFood);
foodRouter.post("/remove", removeFood);



export default foodRouter;