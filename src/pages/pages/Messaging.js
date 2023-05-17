import { Box, Container, Grid, Stack, Typography } from '@mui/material'
import React from 'react'
import { useState } from 'react'
import Page from 'src/components/Page'
import useGetUsers from 'src/hooks/useGetUsers'

function Messaging() {
    let users = useGetUsers().docs
    const [selected, setselected] = useState(null)
  return (
    <Page>
    <Container>
        <Typography>Messaging</Typography>
        <br/><br/>
        <Grid container spacing={3}>
            <Grid item md={2} xs={2}>
            <Stack spacing={3}>
                {users?.map((u, index)=>(
                    <Stack onClick={()=>setselected(u)} style={{display:"flex", flexDirection:"row", alignItems:"center" }}>
                    {u.documents.PHOTO && <Box component="img" src={u.documents.PHOTO} sx={{ width: 40, height: 40,   }} />}
                    <Typography key={index} sx={{marginLeft:2}} variant='overline'>{u.name}</Typography>
                    </Stack>
                ))}
                </Stack>
            </Grid>
            {selected && <Grid item md={7}>
                {selected.name}
            </Grid>}
            {selected && <Grid item md={3}>
            {selected.documents.PHOTO && <Box component="img" src={selected.documents.PHOTO} sx={{ width: 140, height: 140,    }} />}
                    <Typography>{selected.name}</Typography>
                    <Typography>{selected.email}</Typography>
            </Grid>}
        </Grid>
    </Container></Page>
  )
}

export default Messaging