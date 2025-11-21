const express = require('express');
const router = express.Router();
const movies = require('../data/movies');
const movieDetails = require('../data/movieDetails');

function requiredJSON(req, res, next) {
  if (!req.is('application/json')) {
    res.json({ msg: 'content-type must be application/json' });
  } else {
    // res.json('test');
    next();
  }
}

router.param('movieId', (req, res, next) => {
  console.log('movieId route was hit!');
  next();
});

/* GET movie page. */
router.get('/', function (req, res, next) {
  res.render('index', {});
});

router.get('/most_popular', (req, res) => {
  console.log('came here');
  //this is handled at the application level
  // if (req.query.api_key != 123456789) {
  //   res.json('Invalid API key');
  // }

  let page = req.query.page || 1;

  let results = movies.filter((movie) => movie.most_popular);
  console.log('results:', results);

  const startIdx = (page - 1) * 20;
  const endIdx = startIdx + 19;
  results = results.slice(startIdx, endIdx);

  // console.log('results', results);

  res.json({ results });
});

router.get('/top_rated', (req, res) => {
  let page = req.query.page || 1;

  const startIdx = (page - 1) * 20;
  const endIdx = startIdx + 19;
  // results = results.slice(startIdx, endIdx);

  const _movies = movies.map((x) => x);
  _movies.sort((a, b) => b.vote_average - a.vote_average);

  _movies.slice(startIdx, endIdx);
  // const sorted = _movies.map((movie) => movie.vote_average);

  // console.log('sorted: ', sorted);

  res.json({ sorted: _movies });
});

router.get('/:movieId', (req, res) => {
  const movieId = req.params.movieId;

  console.log('path hit');

  const foundMovie = movieDetails.find((movie) => {
    return Number(movie.id) === Number(movieId);
  });

  // console.log('foundMovie: ', foundMovie);

  if (!foundMovie) {
    res.json({ msg: 'movie not found!', production_companies: [] });
  } else {
    res.json(foundMovie);
  }
});

//post
router.post('/:movieId/rating', requiredJSON, (req, res) => {
  const movie_id = req.params.movieId;
  // console.log('content-type: ', req.get('content-type'));
  // console.log('content-type: ', req.headers['content-type']);
  // if(!req.headers['content-type']) {

  // }
  // requiredJSON(res, res);

  const { userRating } = req.body;
  // res.json('hello');

  if (userRating < 0.5 || userRating > 10) {
    res.json({ msg: 'rating must be between .5 & 10' });
  }

  res.json({
    msg: 'thanks for the rating!',
    status: 200,
  });
});

//delete
router.delete('/:movieId/rating', requiredJSON, (req, res, next) => {
  res.json({ msg: 'rating deleted' });
});

module.exports = router;
