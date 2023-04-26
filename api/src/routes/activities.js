const express = require("express");
const router = express.Router();

const {addActivities, getActivities, deleteActivity,updateActivity} = require("../controllers/activities")
 

router.post("/", addActivities);
router.get("/all", getActivities);
router.delete("/:id", deleteActivity);
router.put("/:id", updateActivity);



module.exports= router