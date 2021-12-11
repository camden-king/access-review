import React, { useState, useEffect } from 'react';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import Alert from '@mui/material/Alert';
import { makeStyles } from '@mui/styles';
import { useNavigate } from 'react-router';

const useStyles = makeStyles((theme) => ({
    root: {
      padding: '2px 4px',
      display: 'flex',
      alignItems: 'center',
    },
    input: {
      flex: 1,
    },
    iconButton: {
      padding: 10,
    },
    divider: {
      height: 28,
      margin: 4,
    },
  }));

export default function SearchBar() {
  const classes = useStyles();
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState();
  const [lat, setLat] = useState();
  const [lng, setLng] = useState();

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(function(position) {
        setLat(position.coords.latitude);
        setLng(position.coords.longitude);
        console.log("Latitude is :", position.coords.latitude);
        console.log("Longitude is :", position.coords.longitude);
      });
    } 
  }, []);

  function handleSearch(query) {
    console.log(query);
    navigate('/search?q=' + query + "&lat=" + lat + "&long=" + lng);
    window.location.reload(false);
  }

  return (
    lat ?
    <Paper component="form" className={classes.root}>
      <InputBase
        className={classes.input}
        placeholder="Search for a resturant, venue, space..."
        inputProps={{ 'aria-label': 'Search music' }}
        autoFocus={true}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            e.preventDefault();
            handleSearch(e.target.value);
          }
        }}
        onChange={(e) => {
          setSearchValue(e.target.value);
        }}
      />
      <Divider className={classes.divider} orientation="vertical" />
      <IconButton
        type="submit"
        className={classes.iconButton}
        aria-label="search"
        onClick={(e) => {
          e.preventDefault();
          handleSearch(searchValue);
        }}
      >
        <SearchIcon />
      </IconButton>
    </Paper>
    :
    <Alert severity="warning">Please enable location services to use.</Alert>
  );
}