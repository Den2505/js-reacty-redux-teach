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
            },
            cancelAddButton: this.props.cancelAddButton || false,

        }
    }

    user() {

        return (
            <div>
                <Link to={`/users/${this.state.user.id}`}>
                    {`${this.state.user.firstName} ${this.state.user.secondName }`}
                </Link>

            </div>
        )
    }

createAddButton(){
        if(!this.state.cancelAddButton){
            return (
                <button>Добавить в дружки</button>
            )
        }
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