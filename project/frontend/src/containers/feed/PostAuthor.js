import React from 'react'

class PostAuthor extends React.Component {
    constructor(props) {
        super(props);
        const {user} = props;
        this.state = {
            user:user
        }
    }



    render() {
        return (
            <div className='card-subtitle' >
                {`${this.state.user.first_name} ${this.state.user.second_name}`}
            </div>
        )
    }
}

export default PostAuthor;