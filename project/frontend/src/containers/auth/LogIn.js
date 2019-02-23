import React from 'react';
import md5 from 'js-md5';
import URL from '../../backendDependencies';
import {connect} from 'react-redux'
import {fetchMyId} from "../../redux-components/actions";


class LogInForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            hash: ''
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
        new Promise(resolve => {
            const hash = md5(this.state.email + this.state.hash);
            let message = Object.assign({}, this.state);
            message.hash = hash;
            resolve(message);
        }).then((message) => {
            fetch(URL.signIn, {
                method: 'POST',
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                },
                body: JSON.stringify(message)
            })
                .then(() => this.setState({redirect: true}))

        })

        event.preventDefault();

    }

    redirect() {
        if (this.state.redirect) {
            this.props.setAuthenticatedUserId();
            this.props.history.push('./profile')
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

function mapDispatchToProps(dispatch) {
    return {
        setAuthenticatedUserId: () => dispatch(fetchMyId())
    }
}

export default connect(null, mapDispatchToProps)(LogInForm)