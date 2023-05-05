import './App.css';
import SaveToSpotify from './components/SaveToSpotify';
import Search from './components/Search';
import SearchBar from './components/SearchBar';
import React, {useState} from 'react';
import SearchResults from './components/SearchResults';

function App() {
  
  const [results, setResults] = useState([]);

  return (
    <div className="App">
      <div className="search-bar-container">
        <SearchBar setResults = {setResults} />
        <SearchResults results={results}/>
        <Search/>
        <SaveToSpotify/>
      </div>
    </div>
  );
}

export default App;
