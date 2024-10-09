import { useAuth } from "../../context/Auth";
import { useState } from "react";
import "./login.css"



const Login = () => {
  const{error,handleLogin} = useAuth()

  const [cridentials, setCridentials] = useState({
    email:"",
    password:""
  })

  const handleChnage = (e) => {
    setCridentials({
      ...cridentials,
      [e.target.name] :e.target.value
    })
  }

  const handleSubmit =async(e)=> {
    e.preventDefault()
     await handleLogin(cridentials.email, cridentials.password)
     
  }

  return (
    <div className="login_wrapper">
    <div className="login_content" >
      <h2>login page</h2>
      <form onSubmit={handleSubmit} >
        <div>
          <input 
           type="email"
           name="email"
           value={cridentials.email}
           onChange={handleChnage}
            />
        </div>
        <div>
          <input 
           type="password"
           name="password"
           value={cridentials.password}
           onChange={handleChnage}
           />
        </div>
        <button>
             login
           </button>
        <div>
          <p>don,t have an account?<a href="/logout">Resgister</a></p>
        </div>
      </form>
      {error && <p>{error.message}</p>}
    </div>
    </div>
  )
}

export default Login