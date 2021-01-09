import React, { useState } from 'react'
import axios from "axios"
import { Link, useHistory } from "react-router-dom";
import auth from "./auth";



export default function Login() {

    const [email, setEmail] = useState("")
    const [pass, setPass] = useState("")
    const [err, setErr] = useState([])

    let history = useHistory();

    const Log = (props) => {
        var data = {
            "username": email,
            "password": pass
        }

        var config = {
            method: 'post',
            url: 'https://be.bhyve-app.com:3020/user/signin',
            headers: {},
            data: data
        };
        axios(config)
            .then(function (response) {
                console.log(JSON.stringify(response));
                localStorage.setItem("token", JSON.stringify(response.data))

                auth.login(() => {
                    history.push("/User");
                });


            })
            .catch(err => {
                console.log(err)
                setErr([err.response.data.message])
            });
    }

    return (
        <div>
            <div className="row">
                <div className="col-md-3"></div>
                <div className="col-md-6">
                    <h4 className="text-center">Login</h4>
                    <div>
                        <div class="form-group">
                            <label for="exampleInputEmail1">Email address</label>
                            <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter User Email" onChange={(e) => setEmail(e.target.value)} />
                            <small id="emailHelp" class="form-text text-muted"></small>
                        </div>
                        <div class="form-group">
                            <label for="exampleInputPassword1">Password</label>
                            <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Password" onChange={(e) => setPass(e.target.value)} />

                        </div>

                        <button type="submit" class="btn btn-warning" onClick={() => Log()}>Login</button>
                    </div>
                    <br />
                    <Link to='/Signin'><p>Make a new profile. Click Here</p></Link>
                    <br />
                    <p class="font-weight-bold text-lg-left" style={{ color: "red" }}>{err.map((p) => <>{p}<br /></>)}</p>
                </div>

                <div className="col-md-3"></div>
            </div>
        </div>
    )
}
