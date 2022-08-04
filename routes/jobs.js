const express = require("express");
const router = express.Router();
const {
  getAlljobs,
  getJob,
  createJob,
  updateJob,
  deleteJob,
} = require("../controllers/jobs");

router.route("/").post(createJob).get(getAlljobs);
router.route("/:id").patch(updateJob).get(getJob).delete(deleteJob);

module.exports = router;
