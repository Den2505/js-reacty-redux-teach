/* eslint-disable react/prop-types */
import React from 'react'
import PostAuthor from './PostAuthor'

class Post extends React.Component {
    constructor(props) {
        const {post} = props;
        super(props);
        this.state = {
            id: post.id,
            text: post.text,
            user_id: post.user_id,
            updated_at: post.updated_at
        };
        this.loadUser = this.loadUser.bind(this);
        this.getAuthor = this.getAuthor.bind(this);

    }

    componentDidMount(){
        this.getAuthor();
    }

    getAuthor() {
         fetch(`./users/${this.state.user_id}`)
            .then((response) =>
                response.json()
            )
           .then((data)=>{
               this.setState({userData:data.user})
           })

    }

    loadUser(){
        if(this.state.userData){
           return  (<PostAuthor user = {this.state.userData}/>)
        }
        else return (<div>loading...</div>)
    }


    render() {
        return (
            <div>
               {this.loadUser()}
                <h4>{this.state.text}</h4>
            </div>
        )
    }
}

export default Post