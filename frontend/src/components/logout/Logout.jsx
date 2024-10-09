import { useAuth } from "../../context/Auth";


const logout = () => {
    const {handleLogout} = useAuth()

    const  handelLogout = () => {

    }
  return (
    <div>
        <button onClick={handelLogout} >Logout</button>
    </div>
  )
}

export default logout