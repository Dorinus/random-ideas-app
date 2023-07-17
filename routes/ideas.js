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
  } catch (error) {
    console.log(error);
    res.status(500).send(error.message);
  }
});

//Delete idea
router.delete('/:id', async (req, res) => {
  try {
    const deletedIdea = await Idea.findByIdAndDelete(req.params.id);
    res.send(deletedIdea);
  } catch (error) {
    console.log(error);
    res.status(500).send(error.message);
  }
});

const ideas = [
  {
    id: 1,
    text: 'Positive NewsLetter, a newsletter that only shares positive, uplifting news',
    tag: 'Technology',
    username: 'TonyStark',
    date: '2022-01-02',
  },
  {
    id: 2,
    text: 'Milk cartons that turn a different color the older that your milk is getting',
    tag: 'Inventions',
    username: 'SteveRogers',
    date: '2022-01-02',
  },
  {
    id: 3,
    text: 'ATM location app which lets you know where the closest ATM is and if it is in service',
    tag: 'Software',
    username: 'BruceBanner',
    date: '2022-01-02',
  },
];

module.exports = router;
