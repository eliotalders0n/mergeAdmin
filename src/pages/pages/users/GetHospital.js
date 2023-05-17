import useGetHospital from 'src/hooks/useGetHospital'

function GetHospital({data}) {

let user = useGetHospital(data).docs
 
  return (
   user ? `${user.name} ${user.address}` : ""
  )
}

export default GetHospital