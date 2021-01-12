import React, { useEffect, useState } from 'react';
import './App.css';
import Login from './Pages/Login'
import {getTokenFromUrl} from './util/spofify'
import SpotifyWebApi from 'spotify-web-api-js';

const spotify = new SpotifyWebApi();

function App() {

  const [token, setToken] = useState(null);

  useEffect(() => {
    const hash = getTokenFromUrl();
    window.location.hash = "";
    const _token = hash.access_token;

    if(_token){
      setToken(_token);

      spotify.setAccessToken(_token);
      spotify.getMe().then(user => {
        console.log('User: ', user);
      })
    }

    console.log('I HAVE A TOKEN>>>> ', token)
  }, []);

  return (
    <div className="App">
      {
        token ? (
          <h1>I am logged in</h1>
        ) : (
          <Login/>
        )
      }
    </div>
  );
}

export default App;
