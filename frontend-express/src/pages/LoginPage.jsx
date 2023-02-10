import React, { useState } from 'react'
import garena from '../images/garena.png'
import axios from "axios";
import {useNavigate} from 'react-router-dom'

// interface IProps {
//     setIsLogin: (value: boolean) => void;
//   }

function Login() {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    let navigate = useNavigate();
    // const { setIsLogin } = props;

    const handleSubmit = (event) => {
      event.preventDefault()
      axios.post('http://localhost:9000/auth/login', {
        email: email,
        password: password
      })
      .then((response) => {
        navigate('/home')
        console.log(response);
        alert('Success Password!!!')

      }, (error) => {
        console.log(error);
        alert('Wrong Password!!!')
      });
    };

    const handleChange = (event) => {
        switch (event.target.name) {
            case "email":
                setEmail(event.target.value);
                break;
            case "password":
                setPassword(event.target.value);
                break;

            default:
                break;
        }
    };
    
    return (
        <div className="form">
            <img className="imgga" src={garena} />
            <form className="input" onSubmit={handleSubmit}>
                <label>Username</label>
                <br />
                <input className="input-item"
                    type="text"
                    name="email"
                    value={email ? email : ""}
                    onChange={handleChange}
                    placeholder="Enter your Username"
                /> <br />
                <label>Password</label>
                <br />
                <input className="input-item"
                    type="password"
                    onChange={handleChange}
                    value={password ? password : ""}
                    name="password"
                    placeholder="Enter your Password"
                /> <br />
                <button className="btn-submit"
                    >Login</button>
                <button className="btn-create">Create Account</button>
            </form>
        </div>
    );
}

export default Login;