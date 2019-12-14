const express = require('express');
const actions = require('../../data/helpers/actionModel');
const { validateAction, validateActionId } = require('../../middleware/');
const router = express.Router({ mergeParams: true });

router.get("/", (req, res, next) => {
  actions.get()
    .then(actions => {
      res.status(200).json(actions)
    })
    .catch(error => {
      next(error)
    })
})

router.get("/:id", validateActionId, (req, res, next) => {
  res.json(req.action)
})

router.post("/:id", validateActionId, validateAction, (req, res, next) => {
  const { id } = req.params
  const { description, notes } = req.body

  actions.insert({ project_id: id, description, notes })
    .then(action => {
      res.status(201).json(action)
    })
    .catch(error => {
      next(error)
    })
})

router.put("/:id", validateActionId, validateAction, (req, res, next) => {
  const { id } = req.params
  const { description, notes } = req.body

  actions.update(id, { description, notes })
    .then(action => {
      res.status(200).json(action)
    })
    .catch(error => {
      next(error)
    })
})

router.delete("/:id", validateActionId, (req, res, next) => {
  const { id } = req.params

  actions.remove(id)
    .then(action => {
      return res.status(200).json(action)
    })
    .catch(error => {
      next(error)
    })
})

module.exports = router;