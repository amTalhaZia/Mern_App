import { useAuth } from "../../context/Auth";
import { useState } from "react";
import "../register/register.css";
import { useNavigate } from "react-router";

const Register = () => {
    const { handleRegister, error } = useAuth();
    const  navigate = useNavigate()
    const [cridentails, setCridentails] = useState({
        username: "",
        email: "",
        password: ""
    });

      
  const [debounce, setDebounce] = useState(cridentails);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebounce(cridentails); 
    }, 300); 

    return () => {
      clearTimeout(timer); 
    };
  }, [cridentials]); 

    const handleChange = (e) => {
        setCridentails({
            ...cridentails,
            [e.target.name]: e.target.value
        });
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            await handleRegister(debounce.username, debounce.email, debounce.password);
            navigate('/')
        } catch (err) {
            console.error(err.message);
        }
    };

    return (
        <div className="register_wrapper">
            <div className="register_content">
                <h1 className="h1" >Register</h1>
                <form onSubmit={submitHandler}>
                    <div className="input_group">
                        <input
                            type="text"
                            name="username"
                            placeholder="User Name"
                            value={cridentails.username}
                            onChange={handleChange}
                            className="input"
                        />
                    </div>
                    <div className="input_group">
                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            value={cridentails.email}
                            onChange={handleChange}
                            className="input"
                        />
                    </div>
                    <div className="input_group">
                        <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            value={cridentails.password}
                            onChange={handleChange}
                            className="input"
                        />
                    </div>
                    <button type="submit" className="submit_button"  >Register</button>
                    <p className="login_register">
                        Don't have an account? <a href="/" className="register_link">login</a>
                    </p>
                </form>
                {error && <p className="error_message">{error.message || error}</p>}
            </div>
        </div>
    );
};

export default Register;
