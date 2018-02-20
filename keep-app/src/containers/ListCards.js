import React, { Component } from 'react';
import ListCard from '../components/ListCard';
import { connect } from 'react-redux';
import { addLabel, createList, updateList, addItem, handleItemUpdate, deleteItem, removeLabel } from '../actions/ListActions';

class ListCards extends Component {   
    constructor(props){
        super(props);
        this.handleNewList = this.handleNewList.bind(this);
        this.renderNewList = this.renderNewList.bind(this);
        this.editmode = false;
           
    }
    
    handleNewList(){  
        console.log("new list form", this.editmode);  
        this.editmode = true;
    }

    renderNewList(newList){            
            return (<ListCard
            key={newList.id}
            list={newList}
            onAddLabel={this.props.onAddLabel}
            onUpdateList = {this.props.onUpdateList}
            onRemoveLabel={this.props.onRemoveLabel}
            editmode = {this.editmode}
           
        />)
       
    }
    
    render() {
        const lists = this.props.lists;
        const user = this.props.user; 
        const newList = {
            id: 0,
            userId : this.props.user.id,
            title: 'New List',
            items: [],
            labels:[],
            status: 'active'
        };     
        
        let disableClass = '';
        if(this.editmode){
            disableClass = 'disabled'
        }   

        

        return (
            <div className="row">
                {lists.map(list => (
                    <ListCard
                        key={list.id}
                        list={list}
                        onAddLabel={this.props.onAddLabel}
                        onUpdateList = {this.props.onUpdateList}
                        onRemoveLabel={this.props.onRemoveLabel}
                        onAddItem = {this.props.onAddItem}
                        onUpdateItem = {this.props.onUpdateItem}
                        onDeleteItem = {this.props.onDeleteItem}
                    />
                ))}
                
                {/* { this.renderNewList(newList) } */}
               
                  
                {/* Add a List */}
                <div className="fixed-action-btn">
                    <a
                        className={
                            'btn-floating btn-large waves-effect waves-light red ' +
                            disableClass
                        }
                        onClick={this.handleNewList}
                    >
                        <i className="material-icons">add</i>
                    </a>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        lists: state.lists,
        user:state.user
    };
};

const mapDispatchToProps = dispatch => {
    
    return {
        onAddList: list => {
            dispatch(createList(list));
        },       
        onUpdateList: list => {
            dispatch(updateList(list));
        },
        onAddItem: (listId, item) => {
            dispatch(addItem(listId, item));
        },
        onUpdateItem: (item) => {
            dispatch(handleItemUpdate(item));
        },
        onDeleteItem: id => {
            dispatch(deleteItem(id));
        },
        onAddLabel: (listId, label) => {
            dispatch(addLabel(listId, label));
        },
        onRemoveLabel: (listId, labelId) => {
            dispatch(removeLabel(listId, labelId));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ListCards);
