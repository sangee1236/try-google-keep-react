import React, { Component } from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import ListCard from '../components/ListCard';
import { denormalize, normalize } from 'normalizr';
import { listSchema, userSchema } from '../actions/schemas';
import { connect } from 'react-redux';
import {
    addLabel,
    createList,
    handleListUpdate,
    handleItemUpdatAdd,
    handleItemUpdate,
    deleteItem,
    removeLabel
} from '../actions/ListActions';
import * as selector from '../reducers/ListReducers'

class ListCards extends Component {
    constructor(props) {
        super(props);
        this.editmode = false;
    }

    state = {
        open: false        
    };
    
    handleOpen = () => {
    this.setState({open: true});
    };

    handleClose = () => {       
        this.setState({open: false});
    }

  

    handleSaveClose = () => {
    let newList = {
        id: 0,
        userId: this.props.user.id,
        title: this.newTitle.value ? this.newTitle.value : 'New List',       
        status: 'active'
    }
    this.props.onAddList(newList);
    this.setState({open: false});

    };

    render() {

        const actions = [
            <FlatButton
              label="Cancel"
              primary={true}
              onClick={this.handleClose}
            />,
            <FlatButton
              label="Submit"
              primary={true}
              onClick={this.handleSaveClose}
            />,
          ];
      
        const {lists, user, items} = this.props;
        const activeList = lists.filter(list=>list.status == "active"); 
        let disableClass = '';
        if (this.editmode) {
            disableClass = 'disabled';
        }
        

        return (
            <div className="row">
                {activeList.map(list => (
                    <ListCard
                        key={list.id}
                        list={list}
                        items={items}
                        handleAddNewItem={this.handleAddNewItem}
                        onAddLabel={this.props.onAddLabel}
                        onUpdateList={this.props.onUpdateList}
                        onRemoveLabel={this.props.onRemoveLabel}
                        onAddItem={this.props.onAddItem}
                        onUpdateItem={this.props.onUpdateItem}
                        onDeleteItem={this.props.onDeleteItem}
                    />
                ))}

               
                    <Dialog
                    title="New List"
                    actions={actions}
                    modal={true}
                    open={this.state.open}
                    >
                   <div className="row">
                        <div className="input-field col s12">
                        <input id="listTile" type="text" className="validate"
                        ref={input => (this.newTitle = input)} />
                        <label htmlFor="listTile">List Name</label>
                        </div>
                    </div>
                </Dialog>

                {/* Add a List */}
                <div className="fixed-action-btn">
                    <a
                        className={
                            'btn-floating btn-large waves-effect waves-light red ' +
                            disableClass
                        }
                        label="Modal Dialog" onClick={this.handleOpen} 
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
        lists: selector.getAllList(state),
        items: state.entities ? state.entities.items : [],
        user: state.user
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onAddList: list => {
            dispatch(createList(list));
        },
        onUpdateList: list => {
            dispatch(handleListUpdate(list));
        },
        onAddItem: (listId, item) => {
            dispatch(handleItemUpdatAdd(listId, item));
        },
        onUpdateItem: item => {
            dispatch(handleItemUpdate(item));
        },
        onDeleteItem: id => {
            dispatch(handleItemUpdate(id));
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
