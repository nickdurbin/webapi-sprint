const express = require('express')
const projects = require('../../data/helpers/projectModel')
const { validateProject, validateProjectId } = require('../../middleware')
const router = express.Router({ mergeParams: true });

router.get("/", (req, res, next) => {
  projects.get()
    .then(projects => {
      return res.status(200).json(projects)
    })
    .catch(error => {
      next(error)
    })
})

router.get("/:id", validateProjectId, (req, res, next) => {
  res.json(req.project)
})

router.get("/:id/actions", validateProjectId, validateProject, (req, res, next) => {
  const { id } = req.params

  projects.getProjectActions(id)
    .then(actions => {
      res.status(200).json(actions)
    })
    .catch(error => {
      next(error)
    })
})

router.post("/", validateProject, (req, res, next) => {
  const { name, description } = req.body

  projects.insert({ name, description })
    .then(project => {
      res.status(201).json(project)
    })
    .catch(error => {
      next()
    })
})

router.put("/:id", validateProjectId, validateProject, (req, res, next) => {
  const { id } = req.params
  const { name, description } = req.body

  projects.update(id, { name, description })
    .then(project => {
      res.status(200).json(project)
    })
    .catch(error => [
      next(error)
    ])
})

router.delete("/:id", validateProjectId, (req, res, next) => {
  const { id } = req.params

  projects.remove(id)
    .then(project => {
      return res.status(200).json(project)
    })
    .catch(error => {
      next(error)
    })
})



module.exports = router;