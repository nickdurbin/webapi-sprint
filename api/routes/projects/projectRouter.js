const express = require('express')
const projects = require('../../data/helpers/projectModel')
const actions = require('../../data/helpers/actionModel')
const { validateProject, validateProjectId, validateAction } = require('../../middleware/validate')
const router = express.Router({ mergeParams: true });

router.get("/", (req, res, next) => {
  projects.get()
    .then(project => {
      res.status(200).json(project)
    })
    .catch(error => {
      next(error)
    })
})

router.get("/:id", validateProjectId(), (req, res, next) => {
  return res.json(req.project)
})

router.get("/:id/actions", validateProjectId(), validateProject(), (req, res, next) => {
  projects.getProjectActions(req.project.id)
    .then(actions => {
      if (actions) {
        res.status(200).json(actions)
      }
    })
    .catch(error => {
      next(error)
    })
})

router.post("/", validateProject(), (req, res, next) => {
  const { name, description } = req.body

  projects.insert({ name, description })
    .then(project => {
      res.status(201).json(project)
    })
    .catch(error => {
      next()
    })
})

router.post("/:id/actions", validateProjectId(), validateAction(),(req, res, next) => {
    const postAction = {
      project_id: req.project.id,
      description: req.body.description,
      notes: req.body.notes,
      completed: req.body.completed || false
    };

    actions.insert(postAction)
      .then(action => {
        return res.status(201).json(action);
      })
      .catch(error => {
        next(error);
      });
  }
);

router.put("/:id", validateProjectId(), validateProject(), (req, res, next) => {
  projects.update(req.project.id, req.body)
    .then(project => {
      if (project) {
        res.status(200).json(req.body)
      }
    })
    .catch(error => [
      next(error)
    ])
})

router.delete("/:id", validateProjectId(), (req, res, next) => {
  projects.remove(req.project.id)
    .then(project => {
      return res.status(200).json({ message: "Successfully deleted!"})
    })
    .catch(error => {
      next(error)
    })
})

module.exports = router;