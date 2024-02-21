import './SongSearch.css';
import { useState, useEffect } from 'react';
function SongSearch() {
  const [data, setData] = useState();
  const [search, setSearch] = useState();
  const [songs, setSongs] = useState();
  const [song, setSong] = useState();
  useEffect(() => {
    // Fetch data from the backend
    fetch('http://localhost:8000/songs')
      .then((response) => response.json())
      .then((data) => {
        setSongs(data);
      });
  }, [song]);

  function submitHandler(e) {
    e.preventDefault();
    fetch(`http://localhost:8000/search-song/?q=${search}`)
      .then((response) => response.json())
      .then((data) => {
        setData(data.tracks.items);
      });
  }

  function clickHandler(e, item) {
    e.preventDefault();
    const song1 = item;
    let artists = [];
    for (let artist of song1.artists) {
      // Loop through each artist object in the input array
      artists.push(artist.name); // Push the name field of the current artist object to the names array
    }

    const song = {
      name: song1.name,
      artist: artists,
      album: song1.album.name,
      durationMs: song1.duration_ms,
      listenLink: song1.external_urls.spotify,
      art: song1.album.images[1].url,
      spotifyId: song1.id,
      spotifyUri: song1.uri,
    };
    setSongs([
      // with a new array
      ...songs, // that contains all the old items
      {
        name: song1.name,
        artist: artists,
        album: song1.album.name,
        durationMs: song1.duration_ms,
        listenLink: song1.external_urls.spotify,
        art: song1.album.images[1].url,
        spotifyId: song1.id,
        spotifyUri: song1.uri,
      }, // and one new item at the end
    ]);
    songs.push(song);
    console.log('song', song);
    fetch('http://localhost:8000/addsong', {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify(song),
    })
      .then(function (res) {
        console.log('res', res);

        // setMessage(res.message);
      })
      .catch(function (res) {
        console.log(res);
      });
  }

  function deleteHandler(e, songid, spotifyId) {
    e.preventDefault();

    setSongs(songs.filter((song) => song.spotifyId !== spotifyId));

    fetch(`http://localhost:8000/song/${songid}`, {
      //   headers: {
      //     Accept: 'application/json',
      //     'Content-Type': 'application/json',
      //   },
      method: 'DELETE',
      //   body: JSON.stringify({ songId: songid }),
    })
      .then(function (res) {
        console.log('res', res);
        // setMessage(res.message);
      })
      .catch(function (res) {
        console.log(res);
      });
  }
  return (
    <div style={{}}>
      <h1>Song Library</h1>
      {songs && songs.length > 0 ? (
        <table className="songTable">
          <thead>
            <tr>
              <th>Name</th>
              <th>Artists</th>
              <th>Album</th>
              <th>Duration</th>
              <th>Link</th>
              <th>Art</th>
              <th>ID</th>
              <th>URI</th>
              <th>Add</th>
            </tr>
          </thead>
          <tbody>
            {songs &&
              songs.map((item) => (
                <tr className="tableRow">
                  <td>{item.name}</td>
                  <td>{item.album}</td>
                  <td>
                    {item.artist.map((artist) => (
                      <p>{artist}</p>
                    ))}
                  </td>
                  <td>
                    {Math.floor(item.durationMs / 60000)} minutes
                    {((item.durationMs % 60000) / 1000).toFixed(0)} seconds
                  </td>
                  <td>
                    <a href={item.listenLink}>
                      <button className="button-sm">Listen</button>
                    </a>
                  </td>
                  <td>
                    <img
                      src={item.art}
                      alt="albumArt"
                      width="80"
                      height="80"
                    ></img>
                  </td>
                  <td>{item.spotifyId}</td>
                  <td> {item.spotifyUri}</td>
                  <td>
                    <button
                      onClick={(e) =>
                        deleteHandler(e, item._id, item.spotifyId)
                      }
                      className="button-sm"
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      ) : (
        <h2>No Songs in Library</h2>
      )}
      <h1>Song Search</h1>
      <form onSubmit={submitHandler}>
        <label>Search</label>
        <input
          type="text"
          id="search"
          name="search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="searchInput"
        ></input>
        <button type="submit" className="button-sm">
          Submit
        </button>
      </form>
      <table className="songTable">
        <thead>
          <tr className="tableRow">
            <th>Name</th>
            <th>Artists</th>
            <th>Album</th>
            <th>Duration</th>
            <th>Link</th>
            <th>Art</th>
            <th>ID</th>
            <th>URL</th>
            <th>Add</th>
          </tr>
        </thead>
        <tbody>
          {data &&
            data.slice(0, 6).map((item) => (
              <tr className="tableRow">
                <td>{item.name}</td>
                <td>{item.album.name}</td>
                <td>
                  {item.artists.map((artist) => (
                    <p>{artist.name}</p>
                  ))}
                </td>
                <td>
                  {Math.floor(item.duration_ms / 60000)} minutes
                  {((item.duration_ms % 60000) / 1000).toFixed(0)} seconds
                </td>
                <td>
                  <a href={item.external_urls.spotify}>
                    <button className="button-sm">Listen</button>
                  </a>
                </td>
                <td>
                  <img
                    src={item.album.images[0].url}
                    alt="albumArt"
                    width="80"
                    height="80"
                  ></img>
                </td>
                <td>{item.id}</td>
                <td> {item.uri}</td>
                {/* <form><select></select></form> */}
                <td>
                  {songs.find((o) => o.spotifyId === item.id) ? (
                    <button
                      className="button-sm"
                      style={{ backgroundColor: '#b3f2ddff' }}
                    >
                      In Library
                    </button>
                  ) : (
                    <button
                      onClick={(e) => clickHandler(e, item)}
                      className="button-sm"
                    >
                      Add to Library
                    </button>
                  )}
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      {/* {data &&
        data.map((item) => (
          <div className="songDisplay">
            <div>
              Song Name: {item.name}
              Album: {item.album.name}
              Artist: {item.artists[0].name}{' '}
            </div>
            <a href={item.external_urls.spotify}>Listen</a>
            <img
              src={item.album.images[1].url}
              alt="albumArt"
              width="300"
              height="300"
            ></img>
            ID: {item.id}
            URI: {item.uri}
            <br></br>
          </div>
        ))} */}
    </div>
  );
}

export default SongSearch;
