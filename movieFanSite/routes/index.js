const express = require('express');
const router = express.Router();
const axios = require('axios');

const apiKey = 123456789;
const apiBaseUrl = 'http://localhost:3030';
const nowPlayingUrl = `${apiBaseUrl}/movie/most_popular?api_key=${apiKey}`;

// const apiKey = `424f14249d7ed6721e1d3fbd1d00fba2`;
// const apiBaseUrl = 'http://api.themoviedb.org/3';
// const nowPlayingUrl = `${apiBaseUrl}/movie/now_playing?api_key=${apiKey}`;
const imageBaseUrl = 'http://image.tmdb.org/t/p/w300';

router.use((req, res, next) => {
  res.locals.imageBaseUrl = imageBaseUrl;
  next();
});
/* GET home page. */
router.get('/', async function (req, res, next) {
  // res.render('index', {});

  const response = await axios.get(nowPlayingUrl);
  // console.log(response);
  // res.json(response);
  // res.json(response);
  const movieData = await response.data;
  // console.log(movieData.results);
  // console.log(results);
  // res.render('index', {
  //   response.results,
  // });

  // console.log('movieData', movieData);

  res.render('index', {
    parsedData: movieData.results,
  });
});

router.get('/movie/:id', async (req, res, next) => {
  const { id: movieId } = req.params;
  // res.json(id);

  const movieUrl = `${apiBaseUrl}/movie/${movieId}?api_key=${apiKey}`;
  // res.send(movieUrl);

  const movieDetails = await axios.get(movieUrl);
  const data = await movieDetails.data;

  // console.log(data);
  res.render('single-movie', {
    movie: data,
  });
});

router.post('/search', async (req, res) => {
  const query = req.query;
  const { cat: category, movieSearch: searchTerm } = req.body;
  // console.log({ category, searchTerm });
  // console.log('query,', query);

  const uriEncodedSearchTerm = encodeURI(searchTerm);
  // res.send(uriEncodedSearchTerm);

  const searchUrl = `${apiBaseUrl}/search/${category}?query=${uriEncodedSearchTerm}&api_key=${apiKey}`;
  // res.send(searchUrl);

  const searchResult = await axios.get(searchUrl);
  // console.log('searchResult', searchResult);
  // const data = await searchResult
  // res.send(data);
  // res.json(searchResult.data.results);

  if (category === 'person') {
    searchResult.data.results = searchResult.data.results[0].known_for;
  }
  res.render('index', {
    parsedData: searchResult.data.results,
  });
});

module.exports = router;
