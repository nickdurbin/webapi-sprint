const actions = require('../data/helpers/actionModel');
const projects = require('../data/helpers/projectModel')

function validateActionId(req, res, next) {
  const { id } = req.params
  actions.get(id)
  .then(action => {
    if (action) {
      req.action = action
      next()
    } else {
      res.status(400).json({ message: "Invalid action id." })
    }
  })
  next()
}

function validateAction(req, res, next) { 
  if (!req.body) {
    return res.satus(400).json({ message: "Please fill in the actions."})
  } else if (!req.body.description || !req.body.notes) {
    return res.status(400).json({ message: "Please fill out the description and notes." })
  } else if (req.body.description.length > 128) {
    return res.status(400).json({ message: "Description is too long. Please keep under 128 characters."})
  }
  next()
}

function validateProject(req, res, next) {
  const { description, name } = req.body
  if (Object.keys(req.body).length === 0) {
    return res.satus(400).json({ message: "Please fill in the actions."})
  } else if (!description || !name) {
    return res.status(400).json({ message: "Please fill out the description and name." })
  }
  next()
}

function validateProjectId(req, res, next) {
  projects.get(req.params.id)
  .then(project => {
    if (project) {
      req.project = project
      next()
    } else {
      res.status(400).json({ message: "Invalid project id." })
    }
  })
  next()
};

module.exports = {
  validateActionId, validateAction, validateProject, validateProjectId
}