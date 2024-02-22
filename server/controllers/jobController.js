const Job = require("../models/jobModel");
// Create and Save a new Job
exports.create = (req, res) => {
  // Validate request
  if (!req.body.title) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }
  // Create a Job
  const job = new Job({
    title: req.body.title,
    description: req.body.description,
    location: req.body.location,
    minCTC: req.body.minCTC,
    maxCTC: req.body.maxCTC,
  });
  // Save Job in the database
  job
    .save(job)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the Job.",
      });
    });
};
// Retrieve all Jobs from the database.
exports.findAll = (req, res) => {
  const title = req.query.title;
  var condition = title
    ? { title: { $regex: new RegExp(title), $options: "i" } }
    : {};
  Job.find(condition)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving Jobs.",
      });
    });
};
