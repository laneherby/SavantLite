import React, { forwardRef, useState, useEffect, useImperativeHandle } from 'react';
import axios from 'axios';
import SearchSuggestions from './SearchSuggestions';
import { TextField } from '@material-ui/core';

const SearchBox = forwardRef((props, ref) => {
    const [players, setPlayers] = useState([]);
    const [results, setResults] = useState([]);

    useEffect(() => {
        axios.get("http://192.168.0.169:3000/api/playerNames")
            .then(res => {
                setPlayers(res.data);      
            });
    }, []);     

    useImperativeHandle(ref, () => ({        
        clearTextBox() {
            document.getElementById("txtPlayerSearch").value = "";
            setResults([]);
        }
    }));

    const handleInputChange = (e) => {
        if(e.target.value.length > 2){
            const matches = players.filter(s => s.LastName.toLowerCase().includes(e.target.value.toLowerCase()));
            setResults(matches);
        }
        else{
            setResults([]);
        }
    }  

    let content = (
        <React.Fragment>
            <TextField
                id="txtPlayerSearch"
                placeholder="Search for Player"
                onChange={handleInputChange}
            />
            <SearchSuggestions results={results} addPlayer={props.addPlayer} />
        </React.Fragment>
    );

    return content;
});

export default SearchBox;