const express = require('express');
const movies = require('../data/movies');
const people = require('../data/people');
const router = express.Router();

function requireQuery(req, res, next) {
  if (!req.query.query) {
    res.json({
      msg: 'a search query is required',
    });
  }
  next();
}

router.use(requireQuery);

// /search/movie
router.get('/movie', function (req, res, next) {
  // res.json('hello from search/movie');
  const searchTerm = req.query.query.toLowerCase();
  const foundMovies = movies.filter(
    (movie) =>
      movie.title.toLowerCase().includes(searchTerm) ||
      movie.overview.toLowerCase().includes(searchTerm)
  );
  // console.log('found movies count: ', foundMovies.length);
  // console.log(foundMovies.map((x) => x.title));
  res.json({
    status: 200,
    matchCount: foundMovies.length,
    results: foundMovies,
  });
});

// /search/person

router.get('/person', function (req, res, next) {
  // res.json('hello from search/movie');
  const searchTerm = req.query.query.toLowerCase();
  const foundPeople = people.filter((person) =>
    person.name.toLowerCase().includes(searchTerm)
  );

  console.log({
    matchCount: foundPeople.length,
  });
  res.json({
    status: 200,
    matchCount: foundPeople.length,
    results: foundPeople,
  });
});

module.exports = router;
