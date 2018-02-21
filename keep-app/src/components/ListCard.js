import React from 'react';
import Item from './Item';
import DoneItem from './DoneItem';
import Chip from 'material-ui/Chip';


class ListCard extends React.Component {
    state = {
        newItem: false
    }

    handleAddNewItem(){
        this.setState({newItem: true});
    }

    hideAddItem(){
        this.setState({newItem: false});
    }
    
    
    render(){
        const {
            list,
            items,
            handleAddNewItem,
            onAddLabel,
            onRemoveLabel,
            onUpdateList,
            onAddItem,
            onUpdateItem,
            onDeleteItem,
            editmode
        } = this.props;

        const listItems = list.items.map(id => items[id]);

        const sortedItems = listItems.sort(function(a, b) {
            var textA = a.status.toUpperCase();
            var textB = b.status.toUpperCase();
            return textA < textB ? -1 : textA > textB ? 1 : 0;
        });
    
        
        
    
        let showRow;
        const handleShow = () => {
            showRow = "block";
            console.log("showRow", showRow)
        }
    
        const handleSaveHide = () => {
            showRow = 'none';
            console.log("showRow", showRow)
        }
    

        
        const newItemRow =  <li className="collection-item item-add" >
                               <form id="addItem" onSubmit={(e)=>{
                                   e.preventDefault();
                                    let newItem = {
                                        id: 0,
                                        listId: list.id,
                                        name: this.newItem.value,
                                        qty: 0,
                                        price: 0,
                                        status: 'active'
                                    };
                                    onAddItem(newItem);
                                    this.hideAddItem();
                                    }}>
                                    <div className="input-field">
                                        <input id="newItem" type="text" className="validate"
                                        ref={input => (this.newItem = input)} />
                                        <label htmlFor="newItem">New</label>
                                    </div>
                                   
                                </form>
                            </li>
    
        let title = (
            <div>
                <span className="card-title">{list.title}</span>
                {list.labels.length > 0
                    ? list.labels.map(label => (
                          <Chip
                              key={label.id}
                              onRequestDelete={() =>
                                  onRemoveLabel(list.id, label.id)
                              }
                          >
                              {label.name}
                          </Chip>
                      ))
                    : ''}
            </div>
        );

        return (
            <div className="col s12 m4 list-card">
                <div className="card light-grey">
                            <a className="btn btn-small teal right" onClick={(e)=>{
                                e.preventDefault();
                                list.status = 'deleted'
                                onUpdateList(list)}}>
                                <i className="small material-icons">clear</i>
                            </a>
                    <div className="card-content ">{title}</div>
                    <ul className="collection" >
                        {sortedItems.map(item => {
                            let it;
                            if (item.status === 'active') {
                                it = <Item key={item.id} 
                                parentId={list.id} 
                                item={item} 
                                onUpdateItem={onUpdateItem}
                                onDeleteItem={onDeleteItem} />;
                            }
    
                            if (item.status === 'done') {
                                it = <DoneItem key={item.id} item={item} />;
                            }
    
                            return it;
                        })}

                        {sortedItems.length == 0 || this.state.newItem ? newItemRow : ''}
                        
                    </ul>
                    <div className="card-action">
                        <div className="fixed-action-btn horizontal">
                            <a className="btn-floating btn-small red">
                                <i className="material-icons">menu</i>
                            </a>
                            <ul>
                                <li>
                                    <a className="btn-floating red" onClick={()=>this.handleAddNewItem()}>
                                        <i className="material-icons">add</i>
                                    </a>
                                </li>
                                <li>
                                    <a className="btn-floating yellow darken-1" onClick={()=>onAddLabel()}>
                                        <i className="material-icons">label</i>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    
}

export default ListCard;
