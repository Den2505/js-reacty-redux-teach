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
            data: new Array(),

            offset: 0,
            limit: 10,
            offsetStep: 10
        };
        /*
                this.loading = this.loading.bind(this)
                this.getPosts = this.getPosts.bind(this)*/
        this.shiftOffset = this.shiftOffset.bind(this);
    }

    componentWillMount() {
        this.getPosts().then((responseData) => {
            this.setState({data: responseData})
        });
    }

    getPosts() {

        return fetch(`./feed?offset=${this.state.offset}&limit=${this.state.limit}`)
            .then((response) => response.json())
    }

    loading() {
        if (this.state.data[0]) {
            return (<PostList posts={this.state.data}/>)
        }
        else return (<h3>Loading</h3>)
    }

    shiftOffset() {
        new Promise(resolve => {
            const newOffset = this.state.offset + this.state.offsetStep;
            this.setState({offset: newOffset});
            resolve();
        }).then(() => {
            this.getPosts().then((responseData) => {
                this.setState({data: this.state.data.concat(responseData)})
            })
        })


    }

    render() {
        return (
            <div>
                <h2>Friends Posts</h2>
                {this.loading()}
                <button onClick={this.shiftOffset}>Показать ещё</button>
            </div>
        )
    }

}

export default Feed