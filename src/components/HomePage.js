import React from 'react'
import './styles.css'
import Typist from 'react-typist';
import { Link } from 'react-router-dom';


export default function HomePage() {
    var data = localStorage.getItem('token')
    data = JSON.parse(data)
    var token = data.accessToken;

    return (
        <div className="b">
            <br /><br />
            <div className="container c" >
                <div className="row">
                    <div className="col-md-3"></div>
                    <div className="col-md-6">
                        <div >
                            <Typist show="true">
                                <h4 className="text-center font-italic font-bold"> Connect people with similar skills.....</h4>
                            </Typist>
                        </div>
                        <br /><br />
                        {token ?
                            <>Already Logged In</> :
                            <div className="text-center">
                                <Link to="/Signin"><button className="btn btn-warning ">Signup</button></Link>
                                <br /><br />
                                <Link to="/Login"><button className="btn btn-warning">Login</button></Link>
                            </div>
                        }

                    </div>
                    <div className="col-md-3"></div>
                </div>

            </div>

        </div >
    )
}
