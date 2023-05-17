import {useState, useEffect} from 'react'
import firebase from '../firebase'

const useGetAdmin = (id) => {
   
    const [docs, setdocs] = useState([])

    useEffect(() => {
         firebase.firestore().collection("admin").doc("admin").onSnapshot((doc)=>{
          
            setdocs(doc.data())
         })
    }, [])
    return {docs}
}

export default useGetAdmin
