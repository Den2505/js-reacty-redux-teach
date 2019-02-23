import React from 'react';
import {Provider} from 'react-redux'
import '../styles/components/App.css';
import Login from '../containers/auth/LogIn'
import Registration from "../containers/auth/Registration";
import Feed from '../containers/feed/Feed'
import {BrowserRouter as Router, Route, Link, Redirect} from "react-router-dom";
import Profile from '../containers/Profile/Profile'
import HeaderWrapper from '../containers/HeaderWrapper'
import Users from '../containers/users/Users'
import store from '../redux-components/store'
import 'bootstrap/dist/css/bootstrap.min.css'



class App extends React.Component {




    render() {
        return (
            <div className='app'>
                <Provider store={store}>
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
                            /*render = {(props)=>
                                <Profile status = 'me' {...props}/>
                            }*/
                            component={Profile}
                        />
                        <Route
                            exact
                            path='/users/:uid'
                           // component={Profile}
                            // render need to use Fully uncontrolled component with a key
                            // https://reactjs.org/docs/react-component.html#unsafe_componentwillreceiveprops
                            // impossible to do anything compromise
                            // this can make a lot of unnecessary code
                            render = {(props)=>
                                <div>
                                    <Profile key={props.match.params.uid}  uid = {props.match.params.uid} {...props}/>
                                </div>
                            }
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
                </Provider>
            </div>
        );
    }
}

export default App;