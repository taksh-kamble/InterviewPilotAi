
const express = require("express")
const jobsController = require("../controllers/job.controller")
const authMiddleware = require("../middlewares/auth.middleware")

const jobsRouter = express.Router()

jobsRouter.get("/search", jobsController.searchJobsController)
jobsRouter.get("/:jobId", jobsController.getJobDetailsController)


module.exports = jobsRouter