import {useState, useEffect} from 'react'
import firebase from '../firebase'

const useGetHospital = (id) => {
   
    const [docs, setdocs] = useState([])

    useEffect(() => {
         firebase.firestore().collection("groups").doc(id).get().then((doc)=>{
          
            setdocs(doc.data())
         })
    }, [id])
    return {docs}
}

export default useGetHospital
