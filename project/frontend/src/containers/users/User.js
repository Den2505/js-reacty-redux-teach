import React from 'react'
import {Link} from "react-router-dom";

class User extends React.Component {
    constructor(props) {
        const {user} = props;
        super(props);

        this.state = {
            user: {
                id: user.id,
                firstName: user.first_name,
                secondName: user.second_name
            }

        }
    }

    user() {

        return (
            <div>

                <Link to={`./users/${this.state.user.id}`} >
                    {`${this.state.user.firstName} ${this.state.user.secondName }`}
                </Link>
            </div>
        )
    }



    render() {
        return (
            <div>
                {this.user()}
            </div>
        )
    }
}

export default User