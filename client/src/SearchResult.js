import React from 'react'
import Paper from '@mui/material/Paper';
import Rating from '@mui/material/Rating';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Image from 'material-ui-image';
import { Link } from '@mui/material';

export default function SearchResult({result, access}) {

    return (
    <Link href={"/place?id=" + result.id} underline="none">
        <Paper>
          <Grid container spacing={1}>
                <Grid item xs={2}>
                    <Image src={result.image_url} />
                </Grid>
                <Grid item xs={12} sm={10} container>
                    <Grid item xs={12} sm={7}>
                        <Typography sx={{ fontSize: 20 }} display="inline">
                            {result.name}
                        </Typography>
                    </Grid>
                    <Grid item xs={12} sm={5}>
                        <Rating precision={0.5} value={result.rating} readOnly display="inline" /> 
                        <Typography display="inline" > On Yelp </Typography>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Rating precision={0.5} value={access[result.id]?.ot ? access[result.id]?.ot / access[result.id]?.ob : null} readOnly display="inline" /> 
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
            </Grid>
        </Paper>
    </Link>
        
    )
}
