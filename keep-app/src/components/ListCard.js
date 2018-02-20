import React from 'react';
import Item from './Item';
import DoneItem from './DoneItem';
import Chip from 'material-ui/Chip';

const ListCard = ({
    list,
    onAddLabel,
    onRemoveLabel,
    onUpdateList,
    onAddItem,
    onUpdateItem,
    onDeleteItem,
    editmode
}) => {
    const sortedItems = list.items.sort(function(a, b) {
        var textA = a.status.toUpperCase();
        var textB = b.status.toUpperCase();
        return textA < textB ? -1 : textA > textB ? 1 : 0;
    });

    const newItem = {
      id: 0,
      name: '',
      qty: 0,
      price: 0,
      status: 'active',
      editmode: true
    };

    let title;
    if (editmode) {
        title = (
            <form
                id="listTitle"
                onSubmit={e => {
                    e.preventDefault();
                    list.title = this.input.value;
                    onUpdateList(list);
                }}
            >
                <div className="input-field">
                    <input
                        placeholder="Title"
                        id="listTitle"
                        type="text"
                        className="validate"
                        defaultValue={list.title}
                        ref={input => (this.input = input)}
                    />
                    <label htmlFor="listTitle">Title</label>
                </div>
            </form>
        );
    } else {
        title = (
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
    }

    return (
        <div className="col s12 m4">
            <div className="card light-grey">
                        <a class="btn btn-small teal right">
                            <i class="small material-icons">clear</i>
                        </a>
                <div className="card-content ">{title}
                       
                </div>
                <ul className="collection">
                    {sortedItems.map(item => {
                        let it;
                        if (item.status === 'active') {
                            it = <Item key={item.id} parentId={list.id} item={item} onUpdateItem={onUpdateItem} />;
                        }

                        if (item.status === 'done') {
                            it = <DoneItem key={item.id} item={item} />;
                        }

                        return it;
                    })}
                </ul>
                <div className="card-action">
                    <div className="fixed-action-btn horizontal">
                        <a className="btn-floating btn-small red">
                            <i className="material-icons">menu</i>
                        </a>
                        <ul>
                            <li>
                                <a className="btn-floating red" onClick={()=>onAddItem(list.id, newItem)}>
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
    );
};

export default ListCard;
