import React from 'react';
import {Redirect} from "react-router-dom";

class Registration extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            hash: '',
            firstName: '',
            secondName: '',
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }


    handleChange(event) {
        const obj = {};
        obj[event.target.name] = event.target.value;
        this.setState(obj);

    }

    handleSubmit(event) {
        fetch('./logup', {
            method: 'POST',
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            },
            body: JSON.stringify(this.state)
        })
            .then((res) => {
                if (res.status === 201) {
                    this.setState({redirect: true})
                }
                else {
                  res.text().then((txt)=>{
                      this.setState({error:txt})
                  })
                }
            });


        event.preventDefault();
    }

    onRedirect() {
        if (this.state.redirect)
            return <Redirect to='./login'/>
    }

    onError() {
        if (this.state.error)
            return <label>{this.state.error}</label>

    }

    render() {
        return (
            <div>
                <h3>Registration</h3>
                {this.onRedirect()}
                <label>
                    Email:
                    <input name='email' type='text' value={this.state.email} onChange={this.handleChange}/>
                </label>
                <label>
                    Password:
                    <input name='hash' type='text' value={this.state.hash} onChange={this.handleChange}/>
                </label>
                <label>
                    FirstName:
                    <input name='firstName' type='text' value={this.state.firstName} onChange={this.handleChange}/>
                </label>
                <label>
                    SecondName:
                    <input name='secondName' type='text' value={this.state.secondName} onChange={this.handleChange}/>
                </label>
                <button onClick={this.handleSubmit}>Register</button>
                {this.onError()}
            </div>
        );
    }
}

export default Registration;