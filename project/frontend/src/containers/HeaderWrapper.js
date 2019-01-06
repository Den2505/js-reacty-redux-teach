import React from 'react'
import {Link} from "react-router-dom";
import {withRouter} from "react-router";
import URL from '../backendDependencies'
import {setAuthenticatedUserId} from "../redux-components/actions";
import {connect} from 'react-redux'

class HeaderWrapper extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            validate: false,
            needValidate: false
        }

    }

    componentDidMount() {
        this.getValidationsStatus()
    }

    getValidationsStatus() {
        fetch(URL.validate, {
            method: 'GET'
        })
            .then((res) => {
                    if (res.status === 401) {
                        this.setState({validate: false})
                    }
                    else {
                        res.json().then((id) => {
                            this.setState({validate: true});
                            this.props.setAuthenticatedUserId(id)
                        })
                    }
                }
            )
    }

    validate() {
        //    debugger // todo сделать обновление state в зависимости от роутинга
        if (this.state.validate) {
            return (
                <ul>
                    <li>
                        <Link to='/profile'>Профиль</Link>
                    </li>
                    <li>
                        <Link to='/feed'>Лента</Link>
                    </li>
                    <li>
                        <Link to='/users'>Пользователи</Link>
                    </li>
                    <li>
                        <a href='/api/logout'>logout</a>
                    </li>
                </ul>

            )

        }

        else
            return (
                <ul>
                    <li>
                        <Link to='/login'>Войти</Link>
                    </li>

                    <li>
                        <Link to='/registration'>Зарегистрироваться</Link>
                    </li>
                    <li>
                        <Link to='/users'>Пользователи</Link>
                    </li>
                </ul>
            )
    }

    render() {

        return (
            <div>
                <nav>
                    {this.validate()}
                </nav>
            </div>

        )
    }
}

function mapStateToProps(store) {
    return {
        myId: store.AuthenticatedUser.id
    }
}

function mapDispatchToProps(dispatch) {
    return {
        setAuthenticatedUserId: (id) => dispatch(setAuthenticatedUserId(id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(HeaderWrapper));