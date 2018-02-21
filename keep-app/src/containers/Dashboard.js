import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from '../components/Header';
import {addLabel, loadLists } from '../actions/ListActions';
import Sidebar from '../components/Sidebar';
import ListCards from './ListCards';
import * as selector from '../reducers/ListReducers'

class Dashboard extends Component { 
    constructor(props, context){
        super(props);
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
        lists: selector.getAllList(state)
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
