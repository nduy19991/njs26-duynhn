import React, { useState } from 'react'
import Styles from './SignIn.module.css'
import axios from "axios";
import { useNavigate } from 'react-router-dom'
import logo from "../../images/logo.png";

// interface IProps {
//     setIsLogin: (value: boolean) => void;
//   }

function SingIn() {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    let navigate = useNavigate();
    // const { setIsLogin } = props;

    const handleSubmit = (event) => {
        event.preventDefault()
        axios.post('http://localhost:9000/auth/login-jwt', {
            email: email,
            password: password,
            roles : "managers"
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
        <div className={Styles.bg_form}>
            {/* <img className="imgga" src={garena} /> */}
            <form className={Styles.form} onSubmit={handleSubmit}>
                <div className={Styles.bg_logo}>
                <img className={Styles.logo} src={logo} alt="logo asos" />
                </div>
                <div className={Styles.bg_label}>
                <label className={Styles.label}>Username</label>
                <br />
                <input
                    className={Styles.input}
                    type="text"
                    name="email"
                    value={email ? email : ""}
                    onChange={handleChange}
                    placeholder="Enter your Username"
                /> <br />
                <label className={Styles.label}>Password</label>
                <br />
                <input
                    className={Styles.input}
                    type="password"
                    onChange={handleChange}
                    value={password ? password : ""}
                    name="password"
                    placeholder="Enter your Password"
                />
                </div>
                <div className={Styles.bg_btn_login}>
                <button className={Styles.btn_login}>Login</button>
                </div>
            </form>
        </div>
    );
}

export default SingIn;