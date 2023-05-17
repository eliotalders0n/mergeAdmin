import React from 'react'

function Loader() {
  return (
    <div style={{width:"80%", backgroundColor:"white", zIndex:900, display:"flex", alignItems:"center", justifyContent:"center", height:"80%", position:"absolute"}}>
    <h1 style={{color:"black", fontSize:20}}>Loading</h1>
    </div>
  )
}

export default Loader