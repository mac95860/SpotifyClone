import React, { useEffect, useState } from 'react';
import './App.css';
import Login from './Pages/Login'
import Player from './Pages/Player/Player';
import {getTokenFromUrl} from './util/spofify'
import SpotifyWebApi from 'spotify-web-api-js';
import { useDataLayerValue } from './util/StateProvider';


const spotify = new SpotifyWebApi();

function App() {

  const [token, setToken] = useState(null);
  const [ {user}, dispatch ] = useDataLayerValue();

  useEffect(() => {
    const hash = getTokenFromUrl();
    window.location.hash = "";
    const _token = hash.access_token;

    if(_token){
      setToken(_token);
      spotify.setAccessToken(_token);
      spotify.getMe().then((user) => {
        dispatch({
          type: 'SET_USER',
          user: user,
        });
      });
    }

    console.log('I HAVE A TOKEN>>>> ', token)
  }, []);

  console.log("THE USER IS>>>", user);

  return (
    <div className="App">
      {
        token ? (
          <Player/>
        ) : (
          <Login/>
        )
      }
    </div>
  );
}

export default App;
