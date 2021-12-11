import React, { useEffect, useState } from 'react'
import queryString from 'query-string';
import axios from 'axios';
import SearchBar from './SearchBar';
import SearchResult from './SearchResult';

export default function Results() {
    const q = queryString.parse(window.location.search);
    const [results, setResults] = useState([]);
    const [access, setAccess] = useState({});

    useEffect(() => {
        document.title = `Results for ${q.q}`;
        axios.get("http://localhost:3000" + `/yelp/search?q=${q.q}&lat=${q.lat}&long=${q.long}`)
        .then(res => {
            console.log(res.data);
            setResults(res.data.yelp.businesses);
            setAccess(res.data.access);
        })
        .catch(err => {
            console.log(err);
        })
    }, [q.q]);

    return (
        <div>
            <SearchBar />
            <br/>
            {results.map(result => {
                return (<>
                    <SearchResult key={result.id} result={result} access={access} />
                    <br/>
                </>
                )
            })}
        </div>
    )
}
