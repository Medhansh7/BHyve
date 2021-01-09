import React, { useState, useEffect } from 'react'
import auth from "./auth";
import { useHistory } from "react-router-dom";
import axios from 'axios'
import Posts from './Posts';
import Pagination from './Pagination';
import InputSkill from './InputSkills';

export default function User() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(10);
    const [skill, setSkill] = useState("")

    useEffect(() => {
        const fetchPosts = async () => {
            setLoading(true);
            const res = await axios.get('https://be.bhyve-app.com:3020/skills');
            setPosts(res.data);
            setLoading(false);
        };

        fetchPosts();
    }, []);


    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

    const paginate = pageNumber => setCurrentPage(pageNumber);
    const set = sk => setSkill(sk)

    const pag = () => {
        return (
            <div className='container mt-5'>

                <Posts posts={currentPosts} loading={loading} set={set} />
                <Pagination
                    postsPerPage={postsPerPage}
                    totalPosts={posts.length}
                    paginate={paginate}

                />
            </div>
        )
    }


    const history = useHistory()
    let data = localStorage.getItem("token")
    data = JSON.parse(data)

    const [firstname, setFirstName] = useState("")
    const [lastname, setLastName] = useState("")

    const Submit = () => {
        if (firstname === "" || lastname === "") {
            console.log("Fields cannot be empty")
        }
        else {
            console.log(firstname, lastname)

            var data = {
                "firstName": firstname,
                "lastName": lastname
            }
            var token = data.accessToken

            var config = {
                method: 'post',
                url: 'https://be.bhyve-app.com:3020/user/basic/profile',

                data: data
            };
            axios.interceptors.request.use(
                config => {
                    config.headers.authorization = `Bearer ${token}`
                    return config
                }
            )

            axios(config)
                .then(function (response) {
                    console.log(JSON.stringify(response.data));
                })
                .catch(function (error) {
                    console.log(error.response);
                });
        }
    }

    const Skillss = () => {
        if (data.user.skills) {
            return (
                <>
                    You are skilled in {data.user.skills.map(skills =>
                    <li key={skills.id} className='list-group-item'>
                        <div >
                            {skills}
                        </div>

                    </li>)}
                </>
            )
        } else {
            return (
                <>
                    <div>No Skills Added Yet....</div>
                </>
            )
        }
    }

    const Name = () => {
        if (data.user.firstName === null) {
            return (

                <div className="text-center">
                    <h4>Your Profile Is Incomplete. Click here to complete.....</h4>
                    <br />
                    <div class="input-group">
                        <div class="input-group-prepend">
                            <span class="input-group-text" id="">First and last name</span>
                        </div>
                        <input type="text" class="form-control" placeholder="FirstName" onChange={(e) => setFirstName(e.target.value)} />
                        <input type="text" class="form-control" placeholder="LastName" onChange={(e) => setLastName(e.target.value)} />
                    </div>
                    <div className="text-center"><br />
                        <div className="btn btn-warning" onClick={() => Submit()} >Complete Profile</div>
                    </div>
                </div>
            )
        }
        else {
            return (
                <div className="text-center">
                    Welcome {data.user.firstName} {data.user.lastName} to skill share..... <br />
                </div>
            )
        }
    }

    return (
        <>
            <div className="row">
                <div className="col-md-2"></div>
                <div className="col-md-8"></div>
                <div className="col-md-2">
                    <br />
                    <button className="btn btn-outline-warning my-2 my-sm-0"
                        onClick={() => {
                            auth.logout(() => {
                                localStorage.clear("token")
                                history.push("/");
                            });
                        }}
                    >Logout</button>
                </div>
                {console.log(skill)}
            </div>
            <div className="container">
                <br /><br />

                <div className="text-center">
                    {Name()}
                    <br /><br />
                    {Skillss()}
                    <br />
                    <h3>Click on skills from the list to select...</h3>
                    <br />
                    <InputSkill name={skill} />
                    <br />
                    {pag()}
                </div>
            </div>
        </>

    )
}
