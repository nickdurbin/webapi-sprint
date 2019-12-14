const actions = require('../data/helpers/actionModel');
const projects = require('../data/helpers/projectModel')

function validateActionId(req, res, next) {
  actions.get(req.params.id)
  .then(action => {
    if (action) {
      req.action = action
      next()
    } else {
      res.status(404).json({ message: "Invalid action id." })
    }
  })
  next()
}

function validateAction(req, res, next) { 
  const { description, notes } = req.body
  if (Object.keys(req.body).length === 0) {
    return res.satus(400).json({ message: "Please fill in the actions."})
  } else if (!description || !notes) {
    return res.status(400).json({ message: "Please fill out the description and notes." })
  } else if (description.length > 128) {
    return res.status(400).json({ message: "Description is too long. Please keep under 128 characters."})
  }
  next()
}

function validateProject(req, res, next) {
  next()
}

function validateProjectId(req, res, next) {
  next()
};

module.exports = {
  validateActionId, validateAction, validateProject, validateProjectId
}