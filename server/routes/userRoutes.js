import express from 'express'
import { applyForJob, getUserData, getUserJobApplications, updateUserResume } from '../controllers/userController.js'
import upload from '../config/multer.js'
import clerkAuth from "../middleware/clerkAuth.js";




const router = express.Router()

// Get user Data
router.get('/user', clerkAuth, getUserData)

// // Apply for a job
// router.post('/apply', applyForJob)
router.post("/apply", clerkAuth, applyForJob);


// Get applied jobs data
router.get('/applications', clerkAuth, getUserJobApplications)

// Update user profile (resume)
router.post('/update-resume', clerkAuth, upload.single('resume'), updateUserResume)

export default router;