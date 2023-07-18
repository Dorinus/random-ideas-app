const express = require('express');
const router = express.Router();
const Idea = require('../models/Idea');

//Get ideas
router.get('/', async (req, res) => {
  try {
    const ideas = await Idea.find();
    res.send(ideas);
  } catch (error) {
    console.log(error);
    res.status(500).send(error.message);
  }
});

//Get single idea
router.get('/:id', async (req, res) => {
  try {
    const idea = await Idea.findById(req.params.id);
    res.send(idea);
  } catch (error) {
    console.log(error);
    res.status(500).send(error.message);
  }
});

//Create idea
router.post('/', async (req, res) => {
  const idea = new Idea({
    text: req.body.text,
    tag: req.body.tag,
    username: req.body.username,
  });

  try {
    const savedIdea = await idea.save();
    res.send(savedIdea);
  } catch (error) {
    console.log(error);
    res.status(500).send(error.message);
  }
});

//Update idea
router.put('/:id', async (req, res) => {
  try {
    const idea = await Idea.findById(req.params.id);

    if (idea.username === req.body.username) {
      const updatedIdea = await Idea.findByIdAndUpdate(
        req.params.id,
        {
          $set: {
            text: req.body.text,
            tag: req.body.tag,
          },
        },
        { new: true }
      );
      res.send(updatedIdea);
    }

    if (idea.username !== req.body.username) {
      return res.status(403).send('You can only update your own ideas');
    }
  } catch (error) {
    console.log(error);
    res.status(500).send(error.message);
  }
});

//Delete idea
router.delete('/:id', async (req, res) => {
  try {
    const idea = await Idea.findById(req.params.id);
    if (idea.username !== req.body.username) {
      return res.status(403).send('You can only delete your own ideas');
    }

    if (idea.username === req.body.username) {
      const deletedIdea = await Idea.findByIdAndDelete(req.params.id);
      res.send(deletedIdea);
    }
  } catch (error) {
    console.log(error);
    res.status(500).send(error.message);
  }
});

module.exports = router;
