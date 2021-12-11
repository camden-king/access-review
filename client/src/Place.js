import React, { useEffect, useState } from 'react'
import Paper from '@mui/material/Paper';
import Rating from '@mui/material/Rating';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Image from 'material-ui-image';
import { Link, TextField } from '@mui/material';
import axios from 'axios';
import SearchBar from './SearchBar'
import queryString from 'query-string';

export default function Place() {
    const q = queryString.parse(window.location.search);
    const [result, setResult] = useState();
    const [rating, setRating] = useState({});

    useEffect(() => {
        // document.title = `Results for ${q.q}`;
        axios.get("http://localhost:3000" + `/yelp/business?id=${q.id}`)
        .then(res => {
            console.log(res.data);
            setResult(res.data);
        })
        .catch(err => {
            console.log(err);
        })
    }, [q.id]);

    function postReview(rating) {
        axios.post("http://localhost:3000/yelp/review", {
            business_id: result.id,
            rating: rating,
        })
        .then(res => {
            console.log(res);
        })
        .catch(err => {
            console.log(err);
        })
    }

    if (!result?.image_url) {
        return <div>Loading...</div>
    }

    return (
        <Grid container justifyContent="center" spacing={1}>
            <Grid item xs={12}>
                <SearchBar />
            </Grid>
            <Grid item xs={12} sm={6}>
                <Typography sx={{ fontSize: 40 }} variant="h1" display="inline">
                    <b>{result.name}</b>
                </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
                <Rating value={result.rating} precision={0.5} readOnly display="inline" /> 
                <Typography display="inline" > On Yelp </Typography>
            </Grid>
            <Grid item xs={6}>
                <Image src={result.image_url} />
            </Grid>
            <Grid item xs={12}>
                <br/>
            </Grid>
            <Grid item xs={12} sm={10} container>
                <Grid item xs={12} sm={6}>
                    <Rating precision={0.5} value={result.access?.ot ? result.access?.ot / result.access?.ob : null} readOnly display="inline" /> 
                    <Typography display="inline" > Overall accessability </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Rating precision={0.5} value={result.access?.wt ? result.access?.wt / result.access?.wb : null} readOnly display="inline" /> 
                    <Typography display="inline" > Wheelchair access</Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Rating precision={0.5} value={result.access?.pt ? result.access?.pt / result.access?.pb : null} readOnly display="inline" /> 
                    <Typography display="inline" > Parking </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Rating precision={0.5} value={result.access?.st ? result.access?.st / result.access?.sb : null} readOnly display="inline" /> 
                    <Typography display="inline" > Seating </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Rating precision={0.5} value={result.access?.bt ? result.access?.bt / result.access?.bb : null} readOnly display="inline" /> 
                    <Typography display="inline" > Bathrooms </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Rating precision={0.5} value={result.access?.st ? result.access?.st / result.access?.sb : null} readOnly display="inline" /> 
                    <Typography display="inline" > Staff </Typography>
                </Grid>
            </Grid>

            <Grid item xs={12} sm={12}>
                <Typography sx={{ fontSize: 30 }} variant="h1" display="inline">
                    <b>Reviews</b>
                </Typography>
            </Grid>
            <Grid item xs={12} sm={12}>
                <Typography sx={{ fontSize: 30 }} variant="h1" gutterBottom>
                    <b>Write a review</b>
                </Typography>
            </Grid>
            <Paper>
                <Grid item xs={12} sm={12} spacing={1} container>
                    <Grid item xs={12} sm={12}>
                        <TextField fullWidth id="display-name" label="Display Name" variant="outlined" onChange={(e) => {
                            setRating({...rating, name: e.target.value})
                        }} />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Rating onChange={(e, val) => {
                            setRating({...rating, overall: val})
                        }} precision={0.5} display="inline" /> 
                        <Typography display="inline" > Overall accessability </Typography>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Rating onChange={(e, val) => {
                            setRating({...rating, wheel: val})
                        }} precision={0.5} display="inline" /> 
                        <Typography display="inline" > Wheelchair access</Typography>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Rating onChange={(e, val) => {
                            setRating({...rating, parking: val})
                        }} precision={0.5} display="inline" /> 
                        <Typography display="inline" > Parking </Typography>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Rating onChange={(e, val) => {
                            setRating({...rating, seating: val})
                        }} precision={0.5} display="inline" /> 
                        <Typography display="inline" > Seating </Typography>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Rating onChange={(e, val) => {
                            setRating({...rating, bathrooms: val})
                        }} precision={0.5} display="inline" /> 
                        <Typography display="inline" > Bathrooms </Typography>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Rating onChange={(e, val) => {
                            setRating({...rating, staff: val})
                        }} precision={0.5} display="inline" /> 
                        <Typography display="inline" > Staff </Typography>
                    </Grid>
                    <Grid item xs={12} sm={12}>
                        <TextField multiline rows={4} fullWidth id="review" label="Enter your review here" variant="outlined" onChange={(e) => {
                            setRating({...rating, review: e.target.value})
                        }} />
                    </Grid>
                    <Grid item xs={12} sm={12}>
                        <Button fullWidth variant="contained" color="primary" onClick={() => {
                            postReview(rating)  
                        }}>
                            Submit
                        </Button>
                    </Grid>
                </Grid>
            </Paper>
        </Grid>
    )
}
