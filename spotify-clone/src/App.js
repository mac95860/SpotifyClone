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

      spotify.setAccessToken(_token);
      
      dispatch({
        type: "SET_TOKEN",
        token: _token,
      });

      spotify.getPlaylist('37i9dQZEVXcBOv1HQpehFS').then(response => 
        dispatch({
          type: "SET_DISCOVER_WEEKLY",
          discover_weekly: response,
        })
      )
      
      spotify.getMe().then((user) => {
        dispatch({
          type: 'SET_USER',
          user: user,
        });
        
      });
      
      spotify.getUserPlaylists().then((playlists) => {
        dispatch({
          type: "SET_PLAYLISTS",
          playlists: playlists,
        })
      })
    }
  }, [token, dispatch]);

    

  return (
    <div className="App">
      {
        token ? (
          <Player spotify={spotify}/>
        ) : (
          <Login/>
        )
      }
    </div>
  );
}

export default App;
