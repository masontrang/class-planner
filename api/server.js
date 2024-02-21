// Require the modules
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv').config();
const cors = require('cors');
var bodyParser = require('body-parser');
const request = require('request');

// Create an express app
const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Connect to the database using Mongoose
mongoose
  .connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((db) => console.log('DB is connected'))
  .catch((err) => console.log(err));

// Define a schema for your data using Mongoose
const classSchema = new mongoose.Schema({
  id: { type: Number, unique: true, required: true },
  name: String,
  date: Date,
  sections: Array,
});

// Create a model for your data using Mongoose
const Class = mongoose.model('Class', classSchema);

// Create a route to get all users from the database using Mongoose
app.get('/classes', async (req, res) => {
  try {
    const classes = await Class.find({});
    res.json(classes);
  } catch (err) {
    res.status(500).send(err);
    console.log('err', err);
  }
});

// Create a route to create a new user and save it to the database using Mongoose
app.post('/classes', async (req, res) => {
  try {
    const class1 = new Class(req.body);
    await class1.save();
    res.status(201).json({ status: 'Message received successfully' });
  } catch (err) {
    res.status(400).send(err);
  }
});

// Create a route to create a new user and save it to the database using Mongoose
app.get('/classes/:id', async (req, res) => {
  try {
    const classes = await Class.find({ id: req.params.id });
    res.json(classes);
  } catch (err) {
    res.status(500).send(err);
    console.log('err', err);
  }
});

const moveTypeSchema = new mongoose.Schema({
  name: String,
});

const MoveType = mongoose.model('MoveType', moveTypeSchema);

// get all move types
app.get('/movetypes', async (req, res) => {
  try {
    const movetypes = await MoveType.find({});
    res.json(movetypes);
  } catch (err) {
    res.status(500).send(err);
    console.log('err', err);
  }
});

// add move type
app.post('/addmovetype', async (req, res) => {
  try {
    const moveType = new MoveType(req.body);
    console.log(moveType);
    await moveType.save();
    res.status(201).send({ message: 'moveType successfully added' });
    console.log('new moveType added', moveType);
  } catch (err) {
    res.status(400).send(err);
  }
});

const moveSchema = new mongoose.Schema({
  name: String,
  moveType: { type: mongoose.Schema.Types.ObjectId, ref: 'MoveType' },
  description: String,
});

const Move = mongoose.model('Move', moveSchema);

// get all moves
app.get('/moves', async (req, res) => {
  try {
    const moves = await Move.find({}).populate('moveType');

    res.json(moves);
  } catch (err) {
    res.status(500).send(err);
    console.log('err', err);
  }
});

// add move
app.post('/addmove', async (req, res) => {
  try {
    const move = new Move(req.body);

    await move.save();
    res.status(201).send({ message: 'move successfully added' });
    console.log('new move added', move);
  } catch (err) {
    res.status(400).send(err);
  }
});

const sectionSchema = new mongoose.Schema({
  name: String,
});

const Section = mongoose.model('Section', sectionSchema);

// get all moves
app.get('/sections', async (req, res) => {
  try {
    const sections = await Section.find({});
    res.json(sections);
  } catch (err) {
    res.status(500).send(err);
    console.log('err', err);
  }
});

// add move
app.post('/addsection', async (req, res) => {
  try {
    const section = new Section(req.body);

    await section.save();
    res.status(201).send({ message: 'section successfully added' });
    console.log('new move added', section);
  } catch (err) {
    res.status(400).send(err);
  }
});

// Songs

const songTypeSchema = new mongoose.Schema({
  name: String,
});

const SongType = mongoose.model('SongType', songTypeSchema);

// get all move types
app.get('/songtypes', async (req, res) => {
  try {
    const songtypes = await SongType.find({});
    res.json(songtypes);
  } catch (err) {
    res.status(500).send(err);
    console.log('err', err);
  }
});

// add move type
app.post('/addsongtype', async (req, res) => {
  try {
    const songType = new SongType(req.body);
    console.log(songType);
    await songType.save();
    res.status(201).send({ message: 'songType successfully added' });
    console.log('new moveType added', songType);
  } catch (err) {
    res.status(400).send(err);
  }
});

const songSchema = new mongoose.Schema({
  name: String,
  artist: Array,
  album: String,
  listenLink: String,
  art: String,
  spotifyId: String,
  spotifyUri: String,
  songType: String,
  durationMs: Number,
});

const Song = mongoose.model('Song', songSchema);

// get all moves
app.get('/songs', async (req, res) => {
  try {
    const songs = await Song.find({});

    res.json(songs);
    // console.log('songs', songs);
  } catch (err) {
    res.status(500).send(err);
    console.log('err', err);
  }
});

// add song
app.post('/addsong', async (req, res) => {
  try {
    const song = new Song(req.body);
    console.log('songbody', req.body);
    await song.save();
    res.status(201).send({ message: 'song successfully added' });
    console.log('new song added', song);
  } catch (err) {
    res.status(400).send(err);
  }
});

// delete song
// app.post('/deletesong', async (req, res) => {
//   try {
//     console.log('req', req.body.songId);
//     await Song.remove({ _id: ObjectId(req.body.songId) }, callback);
//     // const res = await Song.deleteOne(req.body.songId);
//     // await song.save();
//     res.status(201).send({ message: 'song successfully deleted' });
//     // console.log('new song added', song);
//   } catch (err) {
//     res.status(400).send(err);
//   }
// });

app.delete('/song/:id', async (req, res) => {
  try {
    // Await the deletion and store the result

    const result = await Song.findByIdAndDelete(req.params.id);
    // Log the result
    console.log(result);
    // Send a status code of 200 (OK) to the client
    res.sendStatus(200);
  } catch (err) {
    // Handle any errors
    console.error(err);
    // Send a status code of 500 (Internal Server Error) to the client
    res.sendStatus(500);
  }
});

// spotify
// access token
const client_id = process.env.SPOTIFY_CLIENT_ID;
const client_secret = process.env.SPOTIFY_SECRET;
const auth_token = Buffer.from(`${client_id}:${client_secret}`).toString(
  'base64'
);
let access_token = null;

var options = {
  url: 'https://accounts.spotify.com/api/token',
  headers: {
    Authorization: 'Basic ' + auth_token,
  },
  form: {
    grant_type: 'client_credentials',
  },
  json: true,
};

request.post(options, function (error, response, body) {
  if (!error && response.statusCode === 200) {
    access_token = body.access_token;
    console.log('success', access_token);
  } else {
    console.error('Error getting access token: ', error || body);
  }
});

app.get('/search-song', async (req, res) => {
  const searchTerm = req.query.q;
  if (!searchTerm)
    return res
      .status(400)
      .json({ error: 'Missing search term in query parameters' });

  var options = {
    url: 'https://api.spotify.com/v1/search',
    qs: {
      q: searchTerm,
      type: 'track',
    },
    headers: {
      Authorization: 'Bearer ' + access_token,
    },
    json: true,
  };

  request.get(options, function (error, response, body) {
    if (!error && response.statusCode === 200) {
      res.status(200).json(body);
      console.log('success', body.tracks.items[0]);
    } else {
      console.error('Error searching for song:', error || body);
      res
        .status(response.statusCode || 500)
        .json({ error: 'Failed to search for song' });
      // console.error('Error getting access token: ', error || body);
    }
  });
});

// Start the server and listen on a port
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server running on port ${port}`));
