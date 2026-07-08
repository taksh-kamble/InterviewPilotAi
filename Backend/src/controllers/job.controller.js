const { searchJobs, getJobDetails } = require("../services/ai.jobs");

// GET /api/jobs/search?role=Full Stack Developer&location=India
const searchJobsController = async (req, res) => {
    try {
        const { role, location } = req.query;

        if (!role) {
            return res.status(400).json({
                success: false,
                message: "Role is required"
            });
        }

        const jobs = await searchJobs(role, location || "India");

        res.status(200).json({
            success: true,
            count: jobs.length,
            jobs
        });

    } catch (err) {
        console.error(err);

        res.status(500).json({
            success: false,
            message: "Unable to fetch jobs"
        });
    }
};

// GET /api/jobs/:jobId
const getJobDetailsController = async (req, res) => {
    try {

        const { jobId } = req.params;

        const job = await getJobDetails(jobId);

        res.status(200).json({
            success: true,
            job
        });

    } catch (err) {

        console.error(err);

        res.status(500).json({
            success: false,
            message: "Unable to fetch job details"
        });

    }
};

module.exports = {
    searchJobsController,
    getJobDetailsController
};