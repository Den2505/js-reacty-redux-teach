import React from 'react';
import {Redirect} from 'react-router-dom'

class LogInForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            hash: ''
        };
        /* this.state.email = {value: ''};
         this.state.password = {value: ''};*/

        this.handleChange = this.handleChange.bind(this);
        //   this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        const obj = {};
        obj[event.target.name] = event.target.value;
        this.setState(obj);


    }


    handleSubmit(event) {
        fetch('./login', {
            method: 'POST',
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            },
            body: JSON.stringify(this.state)
        })
            .then(() => this.setState({redirect: true}))

        event.preventDefault();


    }

    redirect() {
        if (this.state.redirect) {

            window.location = './'

           // this.props.history.push('/profile')
        }

    }

    render() {
        return (<div>
                {this.redirect()}
                <form onSubmit={this.handleSubmit}>
                    <h3>Авторизируйтесь</h3>
                    <label>
                        Email:
                        <input name='email' type="text" value={this.state.email} onChange={this.handleChange}/>
                    </label>
                    <label>
                        Password:
                        <input name='hash' type="text" value={this.state.hash} onChange={this.handleChange}/>
                    </label>
                    <input type="submit" value="Submit"/>
                </form>

            </div>

        );
    }
}

export default LogInForm