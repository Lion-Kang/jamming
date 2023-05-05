import { useCallback, useState } from "react";
import SpotifyWebApi from "spotify-web-api-js";

// Spotify API credentials
export const clientId = process.env.REACT_APP_SPOTIFY_CLIENT_ID;
export const clientSecret = process.env.REACT_APP_SPOTIFY_CLIENT_SECRET;

export const spotifyApi = new SpotifyWebApi({
  clientId,
  redirectUri: "http://localhost:3000/callback",
});

export const useSpotifySearch = () => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [accessCode, setAccessCode] = useState("");

  // redirects the user to the Spotify login page
  const authorizeSpotify = () => {
    const scopes = ["user-read-private", "user-read-email"];
    const redirectUri = "http://localhost:3000/callback";
    const authorizeUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&redirect_uri=${encodeURIComponent(
      redirectUri
    )}&scope=${encodeURIComponent(scopes.join(" "))}&response_type=token`;
    window.location.href = authorizeUrl;
  };

  // parses the access token from the URL
  const handleCallback = useCallback(() => {
    const hashParams = {};
    const hash = window.location.hash.substring(1);
    hash.split("&").forEach((item) => {
      const [key, value] = item.split("=");
      hashParams[key] = decodeURIComponent(value);
    });

    if (hashParams.access_token) {
      spotifyApi.setAccessToken(hashParams.access_token);

      // store the access token in state
      setAccessCode(hashParams.access_token);
    }
  }, []);

  const fetchData = (value) => {
    setLoading(true);
    fetch(`https://api.spotify.com/v1/search?q=${value}&type=track`, {
      headers: {
        ContentType: "application/json",
        Authorization: `Bearer ${process.env.REACT_APP_SPOTIFY_ACCESS_TOKEN}`,
      },
    })
      .then((response) => response.json())
      .then((json) => {
        const results = json.tracks.items.map((track) => {
          return {
            id: track.id,
            name: track.name,
            artist: track.artists[0].name,
            album: track.album.name,
            image: track.album.images[0].url,
            uri: track.uri,
          };
        });
        setResults(results);
        setLoading(false);
      });
  };

  return {
    results,
    loading,
    fetchData,
    handleCallback,
    authorizeSpotify,
    accessCode,
  };
};
