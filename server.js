const express = require('express');
const port = 5000;

const app = express();

app.get('/', (req, res) => {
  res.send({ message: 'Hello World!' });
});

app.get('/api/ideas', (req, res) => {
  res.send(ideas);
});

app.get('/api/ideas/:id', (req, res) => {
  const idea = ideas.find((idea) => idea.id === +req.params.id);

  if (!idea) {
    res.status(404).send('The idea with the given ID was not found.');
    return;
  }

  res.send(idea);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
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
