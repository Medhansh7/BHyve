import React, { Component } from 'react'
import './skill.css'
import axios from 'axios'

class InputSkill extends Component {

    constructor(props) {
        super(props)

        this.state = {
            skills: [],
            err: []

        }
        this.inputRef = React.createRef()
    }

    // remove skill
    removeSkill = i => {
        const skills = this.state.skills
        skills.splice(i, 1)
        this.setState({
            skills: skills
        })
    }

    // componentWillReceiveProps() {
    //     this.setState({
    //         skills: [...this.state.skills, this.props.name],
    //     });
    // }

    // add skill

    componentWillReceiveProps() {
        if (this.props.name === "") {
            return null
        }
        else {
            setTimeout(() => this.addSkill(this.props.name), 0)

        }
    }

    SetSkill = () => {

        var token = localStorage.getItem('token')
        token = JSON.parse(token)
        token = token.accessToken
        console.log(token)
        var data = { "skills": this.state.skills };
        var config = {
            method: 'post',
            url: 'https://be.bhyve-app.com:3020/user/skills',
            // headers: {
            //     Authorization: `Bearer ${token}`
            // },
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
                console.log(error.response.data.message);


            });
    }

    addSkill = e => {
        const skills = this.state.skills
        const value = e
        if (value) {
            // check if duplicate skill
            if (skills.find(skill => skill.toLowerCase() === value)) {
                return alert("No duplicate value allowed")
            }
            // else add skill to skills array
            skills.push(value)
            // set new state
            console.log(skills)
            this.setState({
                skills
            })
            // when submit skill, set current input filed null
            // this.inputRef.current.value = null
        } else if (e && !value) {
            // if no value and hit backspace we will remove previous skill
            this.removeSkill(skills.length - 1)
        }
    }

    currentSkills = () => {

    }


    render() {
        const { skills } = this.state

        return (
            <>

                <div className="skill">
                    <ul className='e'>
                        {skills.map((skill, i) => {
                            return (
                                <li className='f' key={i}> {skill} <button onClick={() => this.removeSkill(i)}>+</button> </li>
                            )
                        })}
                        <li className="input-skill">
                            <input onKeyDown={this.addSkill} className='t' type="text" size="4" />

                        </li>
                    </ul>
                </div>
                <br />
                <div className="btn btn-warning" onClick={this.SetSkill}>Set Skills</div>
                <br />
                <p class="font-weight-bold text-lg-left" style={{ color: "red" }}> {this.state.err}</p>
            </>
        )
    }
}

export default InputSkill