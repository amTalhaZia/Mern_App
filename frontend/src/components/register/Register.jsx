import { useAuth } from "../../context/Auth";
import { useState } from "react";

const Register = () => {
    const { handleRegister, error } = useAuth(); // Destructure the error from context
    const [cridentails, setCridentails] = useState({
        username: "",
        email: "",
        password: ""
    });

    const handleChange = (e) => {
        setCridentails({
            ...cridentails,
            [e.target.name]: e.target.value
        });
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            await handleRegister(cridentails.username, cridentails.email, cridentails.password);
        } catch (err) {
            console.error(err.message); 
        }
    };

    return (
        <div>
            <h1>Register</h1>
            <form onSubmit={submitHandler}>
                <div>
                    <h2>Username</h2>
                    <input 
                        type="text"
                        name="username"
                        value={cridentails.username}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <h2>Email</h2>
                    <input 
                        type="email"
                        name="email"
                        value={cridentails.email}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <h2>Password</h2>
                    <input 
                        type="password"
                        name="password"
                        value={cridentails.password}
                        onChange={handleChange}
                    />
                </div>
                <button type="submit">Submit</button>
            </form>
            {error && <p style={{ color: 'red' }}>{error.message || error}</p>}
        </div>
    );
};

export default Register;
