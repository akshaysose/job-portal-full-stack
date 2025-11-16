import express from 'express'
import { applyForJob, getUserData, getUserJobApplications, updateUserResume } from '../controllers/userController.js'
import upload from '../config/multer.js'
import clerkAuth from "../middleware/clerkAuth.js";
import { applyForJob } from "../controllers/companyController.js";



const router = express.Router()

// Get user Data
router.get('/user', getUserData)

// // Apply for a job
// router.post('/apply', applyForJob)
router.post("/apply", clerkAuth, applyForJob);


// Get applied jobs data
router.get('/applications', getUserJobApplications)

// Update user profile (resume)
router.post('/update-resume', upload.single('resume'), updateUserResume)

export default router;