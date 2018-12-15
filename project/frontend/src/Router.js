import React from 'react';
import {
    BrowserRouter as Router,
    Route,
    Link
} from 'react-router-dom'

function Home() {
    return (
        <div>Home</div>)
}

export default () => {
    return (
        <Router>
            <div>
                <nav>
                    <ul>
                        <li>
                            <Link to='/c'>HoMe</Link>
                        </li>

                    </ul>
                </nav>
                <Route
                    exact
                    path='/c'
                    component={Home}
                />
            </div>
        </Router>

    )
}