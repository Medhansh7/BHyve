import React, { useState } from 'react'
import { useHistory, Link } from "react-router-dom";
import axios from "axios"


export default function Login() {

    const [email, setEmail] = useState("")
    const [pass, setPass] = useState("")
    const [err, setErr] = useState([])


    let history = useHistory();

    const Log = () => {
        var data = {
            "username": email,
            "password": pass
        }

        var config = {
            method: 'post',
            url: 'https://be.bhyve-app.com:3020/user/signup',
            headers: {},
            data: data
        };
        axios(config)
            .then(function (response) {
                console.log(JSON.stringify(response.data));
                setErr(["Congratulations !!! Account Created..."])
                // alert("Account Created")
                setTimeout(function () {
                    history.push("/Login")
                }, 2000)
            })
            .catch(err => {
                console.log(err.response.data.message)
                setErr(err.response.data.message)
            });
    }

    return (
        <div>
            <div className="row">
                <div className="col-md-3"></div>
                <div className="col-md-6">
                    <h4 className="text-center">Sign Up</h4>
                    <div>
                        <div class="form-group">
                            <label for="exampleInputEmail1">Email address</label>
                            <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter User Email" onChange={(e) => setEmail(e.target.value)} />
                            <small id="emailHelp" class="form-text text-muted">Email should be unique</small>
                        </div>
                        <div class="form-group">
                            <label for="exampleInputPassword1">Password</label>
                            <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Password" onChange={(e) => setPass(e.target.value)} />
                            <small id="emailHelp" class="form-text text-muted">Password should be 8-20 character with atleast one number or special symbol or both</small>
                        </div>

                        <button type="submit" class="btn btn-warning" onClick={() => Log()}>Sign Up</button>
                    </div>
                    <br />
                    <Link to='/Login'><p>Have an Account? Login</p></Link>
                    <br />
                    <p class="font-weight-bold text-lg-left" style={{ color: "red" }}>{err.map(e => <>{e}<br /></>)}</p>
                </div>
                <div className="col-md-3"></div>
            </div>
        </div>
    )
}
