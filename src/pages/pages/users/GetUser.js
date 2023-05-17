import { Typography } from '@mui/material'
import React from 'react'
import useGetUser from 'src/hooks/useGetUser'

function GetUser({data}) {

let user = useGetUser(data).docs

console.log(data)
  return (
   user ? `${user?.name}` : <Typography></Typography>
  )
}

export default GetUser