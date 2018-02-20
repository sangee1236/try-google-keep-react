import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from '../components/Header';
import {addLabel, loadLists } from '../actions/ListActions';
import Sidebar from '../components/Sidebar';
import ListCards from './ListCards';

class Dashboard extends Component { 
    constructor(props){
        super(props);
    }   

    componentWillMount(){
        const locUser = JSON.parse(localStorage.getItem("user"))
        if(locUser){
           if(this.props.lists){
            console.log("this.props", this.props);
            this.props.onLoadList(locUser.id);
           }
        }else{
            this.props.history.push('/');
        }
    }

    componentDidMount(){

    }

    render() {
        return (
            <div>
                <Header />
                <div className="main-content">
                    <div className="section">
                        <div className="row">
                            <div className="col s12 m2">
                                <Sidebar />
                            </div>
                            <div className="col s12 m10">
                                <ListCards user={this.props.user} onLoadList={this.props.onLoadList} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        labels: [],
        lists: state.lists
    };
};
const mapDispatchToProps = dispatch => {
    return {
        onAddLabel: (listId, label) => {
            dispatch(addLabel(listId, label));
        },
        onLoadList: userId => {
            dispatch(loadLists(userId));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
