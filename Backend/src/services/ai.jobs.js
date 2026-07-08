const axios = require("axios");

const getJobDetails = async (jobId, country = "us") => {
    const options = {
        method: "GET",
        url: "https://jsearch.p.rapidapi.com/job-details",
        params: {
            job_id: jobId,
            country,
        },
        headers: {
            "x-rapidapi-key": process.env.RAPID_API_KEY,
            "x-rapidapi-host": "jsearch.p.rapidapi.com",
        },
    };

    const response = await axios.request(options);
    return response.data;
};

const searchJobs = async (role, location = "India") => {
    try {
        const options = {
            method: "GET",
            url: "https://jsearch.p.rapidapi.com/search-v2",
            params: {
                query: `${role} ${location}`,
                page: "1",
                num_pages: "1",
                country: "in"
            },
            headers: {
                "x-rapidapi-key": process.env.RAPID_API_KEY,
                "x-rapidapi-host": "jsearch.p.rapidapi.com",
            },
        };

        const response = await axios.request(options);
        const jobs = response.data?.data?.jobs ?? [];

return jobs.map(job => ({
    id: job.job_id,
    title: job.job_title,
    company: job.employer_name,
    logo: job.employer_logo,
    location: job.job_location,
    employmentType: job.job_employment_type,
    remote: job.job_is_remote,
    applyLink: job.job_apply_link,
    // description: job.job_description,
    salary: job.job_salary_string || "Not disclosed",
    posted: job.job_posted_at,
    publisher: job.job_publisher,
}));
        // return response.data.data.map(job => ({
        //     id: job.job_id,
        //     title: job.job_title,
        //     company: job.employer_name,
        //     logo: job.employer_logo,
        //     location: `${job.job_city}, ${job.job_state}`,
        //     employmentType: job.job_employment_type,
        //     remote: job.job_is_remote,
        //     applyLink: job.job_apply_link,
        //     salary:
        //         job.job_min_salary && job.job_max_salary
        //             ? `₹${job.job_min_salary} - ₹${job.job_max_salary}`
        //             : "Not disclosed",
        //     posted: job.job_posted_at_datetime_utc,
        //     publisher: job.job_publisher,
        // }));
    } catch (err) {
        console.error(err.response?.data || err.message);
        throw err;
    }
};

module.exports = {
    searchJobs,
    getJobDetails
};

