let router = require('express').Router()
let Tasks = require('../models/task')

//GET
router.get('/', (req, res, next) => {
  // @ts-ignore
  Tasks.find({ authorId: req.session.id })
    .then(data => {
      res.send(data)
    })
    .catch(err => {
      console.log(err)
      next()
    })
})



//POST
router.post('/', (req, res, next) => {
  // @ts-ignore
  req.body.authorId = req.session.uid
  Tasks.create(req.body)
    .then(newTask => {
      res.send(newTask)
    })
    .catch(err => {
      console.log(err)
      next()
    })
})

//PUT
router.put('/:id', (req, res, next) => {
  Tasks.findById(req.params.id)
    .then(task => {
      // @ts-ignore
      if (!task.authorId.equals(req.session.uid)) {
        return res.status(401).send("ACCESS DENIED!")
      }
      task.update(req.body, (err) => {
        if (err) {
          console.log(err)
          next()
          return
        }
        res.send("Successfully Updated")
      });
    })
    .catch(err => {
      console.log(err)
      next()
    })
})

//DELETE
//deletes a whole board
// @ts-ignore
router.delete('/:id', (req, res, next) => {
  Tasks.findById(req.params.id)
    .then(task => {
      // @ts-ignore
      if (!task.authorId.equals(req.session.uid)) {
        return res.status(401).send("ACCESS DENIED!")
      }
      Tasks.findByIdAndRemove(req.params.id)
        // @ts-ignore
        .then(data => {
          res.send('DELORTED')
        })
    })
})

// api/listId/tasks/commentId
router.get('/:taskId/comments', (req, res, next) => {
  // @ts-ignore
  Comments.find({ taskId: req.params.taskId })
    .then(data => {
      res.send(data)
    })
    .catch(err => {
      console.log(err)
      next()
    })
})

module.exports = router