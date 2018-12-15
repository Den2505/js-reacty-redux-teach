import React from 'react'
import PostList from './PostList'


class Feed extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            test:
                [{
                    id: 1,
                    text: `qweqweqweqweqwe`
                }
                    ,
                    {
                        id: 2,
                        text: `sdfsdfsdfsdfdsf`
                    }],
            data: new Array()

        }

        this.loading = this.loading.bind(this)
        this.getPosts = this.getPosts.bind(this)
    }

    componentWillMount(){
        this.getPosts();
    }

    getPosts() {

        fetch('./feed')
            .then((response) => response.json())
            .then((responseData) => {
                this.setState({data: responseData})
            })


    }

    loading(){
        if(this.state.data[0] ){
            return ( <PostList posts={this.state.data}/>)
        }
        else return (<h3>Loading</h3>)
    }



    render() {
        return (
            <div>
                <h2>Friends Posts</h2>
                {this.loading()}
            </div>
        )
    }

}

export default Feed