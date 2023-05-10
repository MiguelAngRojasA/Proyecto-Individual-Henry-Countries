const { CountryData, Activity } = require("../db.js");
const STATUS_OK = 200;
const STATUS_ERROR = 404;

async function addActivities(req, res) {
  const { id, name,description, dificulty, duration, season, countryId } = req.body;
  try {    
    if (!id || !name || !dificulty || !season  || !countryId  || !duration ) {
      return res
        .status(STATUS_ERROR)
        .json({ message: "The require information is missing" });
    }
    const activity = {
      id,
      name,
      description,
      dificulty,
      duration,
      season,
    };
    const act = await Activity.create(activity);

    for (let i = 0; i < countryId.length; i++) {
      if (countryId[i]) {
        var country = await CountryData.findByPk(countryId[i]);
        if (country) {
          await country.addActivities(act);
        }
      }
    }

    res.status(STATUS_OK).json(act);
  } catch (error) {
    res.status(STATUS_ERROR).json({ message: error.message });
  }
}
function getActivities(req, res) {
  try {
   //FindAll method of Sequelize is used to get all the activities in the table
    Activity.findAll().then((activities) => {
      if (activities) {
        res.status(STATUS_OK).json(activities);
      } else {
        res.status(STATUS_ERROR).json({ message: "Activities not found" });
      }
    });
  } catch (error) {
    res.status(500).json({ message: error });
  }
}
async function deleteActivity(req, res) {
  const { id } = req.params;
  try {
    if (!id) {
      return res.status(STATUS_ERROR).json({ message: "ID is missing" });
    }
    const act = await Activity.findByPk(id);
    if (act) {
      await Activity.destroy({
        where: {
          id,
        },
      });
      res.status(STATUS_OK).json(act);
    } else {
      return res.status(STATUS_ERROR).json({ message: "ID not found" });
    }
  } catch (error) {
    res.status(STATUS_ERROR).json({ message: error });
  }
}
async function updateActivity(req, res) {
  const { id, name,description, dificulty, duration, season } = req.body;
  try {
    if (!id) {
      return res.status(STATUS_ERROR).json({ message: "ID is missing" });
    }
    const activity = await Activity.findByPk(id);
    if (!activity) {
      return res.status(STATUS_ERROR).json({ message: "Activity not found" });
    }
    const updatedActivity = await activity.update({
      name,
      description,
      dificulty,
      duration,
      season,
    });
    res.status(STATUS_OK).json(updatedActivity);
  } catch (error) {
    res.status(STATUS_ERROR).json({ message: error.message });
  }
}

module.exports = {
  addActivities,
  getActivities,
  deleteActivity,
  updateActivity,
};
