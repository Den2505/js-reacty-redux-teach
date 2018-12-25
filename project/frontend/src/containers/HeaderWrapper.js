import React from 'react'
import {Link} from "react-router-dom";
import {withRouter} from "react-router";

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
        fetch('/validate', {
            method: 'GET'
        })
            .then((res) => {
                    if (res.status === 401) {
                        this.setState({validate: false})
                    }
                    else {
                        this.setState({validate: true})
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
                        <a href='/logout'>logout</a>
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
            <nav>
                {this.validate()}
            </nav>
        )
    }
}

export default withRouter(HeaderWrapper);