import React from 'react'
import PostList from './PostList'
import URL from '../../backendDependencies'
import {fetchMyIdAndFriendsList} from "../../redux-components/actions";
import {connect} from 'react-redux';

class Feed extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            data: new Array(),

            offset: 0,
            limit: 10,
            offsetStep: 10,
            tempId:0,
            getPosts: this.getPosts
        };
       
        this.shiftOffset = this.shiftOffset.bind(this);
    }

    componentDidMount() {
        this.props.fetchFriendsList();
        this.getPosts()
            .then((responseData)=>{this.setState({data:responseData});})

    }

    static getDerivedStateFromProps(props, state) {
        if(props.friends  && !state.friends){
            return {
                friends:props.friends
            }
        }
  return null

    }


    getPosts() {

        return fetch(URL.feed(this.state.offset, this.state.limit))
            .then((response) => response.json())
    }

    loading() {
        if (this.state.data[0] && this.props.friends) {
            return (<PostList posts={this.state.data} friends={this.props.friends}/>)
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
        fetchFriendsList: () => dispatch(fetchMyIdAndFriendsList()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Feed)