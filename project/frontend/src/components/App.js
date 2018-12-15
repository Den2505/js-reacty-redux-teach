import React from 'react';
import '../styles/components/App.css';
import Login from '../containers/auth/LogIn'
import Registration from "../containers/auth/Registration";
import Feed from '../containers/feed/Feed'
import {BrowserRouter as Router, Route, Link} from "react-router-dom";
import Profile from '../containers/Profile/Profile'
import HeaderWrapper from '../containers/HeaderWrapper'
import Users from '../containers/users/Users'



class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }



    render() {
        return (
            <div className='app'>

                <Router>
                    <div>
                        <HeaderWrapper/>
                        <Route
                            exact
                            path='/login'
                            component={Login}
                            /*render={(props) => (<Login/>)}*/
                        />
                        <Route
                            exact
                            path='/profile'
                            component={Profile}
                        />
                        <Route
                            exact
                            path='/users/:uid'
                            component={Profile}
                        />
                        <Route
                            exact
                            path='/feed'
                            component={Feed}
                        />
                        <Route
                            exact
                            path='/registration'
                            component={Registration}
                        />
                        <Route
                            exact
                            path='/users'
                            component={Users}
                        />


                    </div>
                </Router>
            </div>
        );
    }
}

export default App;