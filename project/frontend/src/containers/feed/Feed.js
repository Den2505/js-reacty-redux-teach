import React from 'react'
import PostList from './PostList'
import URL from '../../backendDependencies'
import {fetchFriendsList} from "../../redux-components/actions";
import {connect} from 'react-redux';

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

    componentDidMount() {
        if(this.props.myId){this.props.fetchFriendsList(this.props.myId);}

    }

    componentWillReceiveProps(nextProps){
        if(!this.props.myId && nextProps.myId){
            this.props.fetchFriendsList(nextProps.myId)
        }
        if(nextProps.friends){
            this.getPosts().then((responseData) => {
                this.setState({data: responseData, friends:nextProps.friends})
            });
        }
    }

    getPosts() {

        return fetch(URL.feed(this.state.offset, this.state.limit))
            .then((response) => response.json())
    }

    loading() {
        if (this.state.data[0]) {
            return (<PostList posts={this.state.data} friends={this.state.friends}/>)
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
                <h2>Лента</h2>
                {this.loading()}
                <button onClick={this.shiftOffset}>Показать ещё</button>
            </div>
        )
    }

}

function mapStateToProps(store) {
    return {
        friends: store.friends.friends,
        myId: store.AuthenticatedUser.id
    }
}


function mapDispatchToProps(dispatch) {
    return {
        fetchFriendsList: (myId) => dispatch(fetchFriendsList(myId)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Feed)