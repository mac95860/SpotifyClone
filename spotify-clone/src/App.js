import React, { useEffect, useState } from 'react';
import './App.css';
import Login from './Pages/Login'
import Player from './Pages/Player/Player';
import {getTokenFromUrl} from './util/spotify'
import SpotifyWebApi from 'spotify-web-api-js';
import { useDataLayerValue } from './util/DataLayer';

const spotify = new SpotifyWebApi();

function App() {

  
  const [ {user, token}, dispatch] = useDataLayerValue();

  useEffect(() => {
    const hash = getTokenFromUrl();
    window.location.hash = "";
    const _token = hash.access_token;

    if(_token){
      dispatch({
        type: "SET_TOKEN",
        token: _token,
      });
      
      spotify.setAccessToken(_token);
      
      spotify.getMe().then((user) => {
        dispatch({
          type: 'SET_USER',
          user: user,
        });
        
      });
    }
  }, []);

  console.log("THE USER IS >>>", user);
  console.log("THE TOKEN IS >>>", token);

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
