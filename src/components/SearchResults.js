import React from 'react';
import "./SearchResults.css";
import SearchResult from './SearchResult';

function SearchResults ({results}) {
    return (
        <div className ="results-list">
            {
                results.map((result, id) => {
                    return <SearchResult result={result} key={id}/>
                })
            }
        </div>
    )
}

export default SearchResults;