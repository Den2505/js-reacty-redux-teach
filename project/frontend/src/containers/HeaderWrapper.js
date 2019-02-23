import React from 'react'
import {Link} from "react-router-dom";
import {withRouter} from "react-router";
import URL from '../backendDependencies'
import {setAuthenticatedUserId, fetchMyId} from "../redux-components/actions";
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
        this.getAuthenticationStatus()
    }

    static getDerivedStateFromProps(props, state) {
        if(props.myId && !state.validate){
            return {
                validate:true
            }
        }
        return null;
    }

    getAuthenticationStatus() {
        if (this.props.myId) {
            this.setState({validate: true})
        }
        else {
            this.props.setAuthenticatedUserId()
            /*fetch(URL.validate, {
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
                )*/
        }

    }

    chooseLinks() {
        if (this.state.validate) {
            return (
                <ul className='nav nav-tabs justify-content-center'>
                    <li className='nav-item'>
                        <Link to='/profile' className='nav-link'>Профиль</Link>
                    </li>
                    <li className='nav-item'>
                        <Link to='/feed' className='nav-link'>Лента</Link>
                    </li>
                    <li className='nav-item'>
                        <Link to='/users' className='nav-link'>Пользователи</Link>
                    </li>
                    <li className='nav-item'>
                        <a href='/api/logout' className='nav-link'>logout</a>
                    </li>
                </ul>

            )

        }

        else
            return (
                <ul className='nav nav-tabs justify-content-center'>
                    <li className='nav-item'>
                        <Link to='/login' className='nav-link'>Войти</Link>
                    </li>

                    <li className='nav-item'>
                        <Link to='/registration' className='nav-link'>Зарегистрироваться</Link>
                    </li>
                    <li className='nav-item'>
                        <Link to='/users' className='nav-link'>Пользователи</Link>
                    </li>
                </ul>
            )
    }

    render() {

        return (
            <div>
                <nav>
                    {this.chooseLinks()}
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
        setAuthenticatedUserId: () => dispatch(fetchMyId())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(HeaderWrapper));