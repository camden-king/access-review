import React from 'react'
import SearchBar from './SearchBar'
import { Grid } from '@mui/material'

export default function Search() {
    return (
        <Grid
            container
            spacing={0}
            direction="column"
            justifyContent="center"
            style={{ minHeight: '80vh', minWidth: '80vw' }}
        >
            <SearchBar />
       </Grid>
        
    )
}
