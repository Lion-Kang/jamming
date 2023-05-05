import "./App.css";
import SaveToSpotify from "./components/SaveToSpotify";
import Search from "./components/Search";
import SearchBar from "./components/SearchBar";
import React, { useEffect, useState } from "react";
import SearchResults from "./components/SearchResults";

import { spotifyApi, clientId, useSpotifySearch } from "./useSpotifySearch";

function App() {
  const { authorizeSpotify, handleCallback, accessCode } = useSpotifySearch();

  useEffect(() => {
    // only run handleCallback when the window.location contains an access token
    if (window.location.hash.includes("access_token")) {
      handleCallback();
      // clear the URL without refreshing the page
      window.history.pushState({}, null, "/");
    }
  }, [handleCallback]);

  return (
    <div className="App">
      <div className="search-bar-container">
        <button onClick={authorizeSpotify}>login to spotify</button>
        <SearchBar setResults={() => {}} />
        <SearchResults results={[]} />
        <Search />
        <SaveToSpotify />
      </div>
    </div>
  );
}

export default App;
