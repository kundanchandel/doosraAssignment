const express = require("express");
const app = express();

const threshold = 10;

const drivers = [
  {
    id: 1,
    name: "driver1",
    isAvailable: true,
    isDriving: false,
    driver_x: 10,
    driver_y: 15,
  },
  {
    id: 2,
    name: "driver2",
    isAvailable: true,
    isDriving: false,
    driver_x: 12,
    driver_y: 18,
  },
];

const getDistance = (x1, y1, x2, y2) => {
  return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1));
};

const getActiveDrivers = () => {
  return drivers.filter((driver) => driver.isAvailable && !driver.isDriving);
};

//API to get a driver
app.get("/trip/cab", (req, res) => {
  try {
    const { rider_x, rider_y } = req.query;
    const activeDrivers = getActiveDrivers();
    let minDistance = 999999;
    driver = null;

    activeDrivers.forEach((tempDrive) => {
      const { driver_x, driver_y } = tempDrive;
      const distance = getDistance(rider_x, rider_y, driver_x, driver_y);
      if (distance < threshold && distance < minDistance) {
        minDistance = distance;
        driver = tempDrive;
      }
    });

    if (driver) throw Error("No driver avialable");

    res.send({
      data: driver,
    });
  } catch (err) {
    res.status(400).send({ error: err.toString() });
  }
});

app.post("/driver/:driverId/availability", (req, res) => {
  try {
    const { availability, driver_x, driver_y } = req.body;
    const { driverId } = req.params;
    let DRIVER;
    // get driver by driverId, let say DRIVER
    // update DRIVER.isAvailable with availibility
    if (availability) {
      // update DRIVER.driver_x = driver_x
      // update DRIVER.driver_y = driver_y
    }
    // Save the DRIVER
    res.send({ data: DRIVER });
  } catch (err) {
    res.status(400).send({ error: err.toString() });
  }
});

app.listen(8000, () => {
  console.log("listening");
});
