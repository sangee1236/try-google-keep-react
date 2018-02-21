import React from 'react'

const Item = ({parentId, item, onUpdateItem, onDeleteItem}) => {

  return (
    <li className="collection-item">
        <div>
            <input 
            type="checkbox" 
            className="filled-in" 
            id={item.id} 
            checked={item.status === "active" ? true: false }
            ref={input => (this.input = input)}
            onChange={(e)=>{
              e.preventDefault();
              item.status = e.target.checked ? 'active':'done';
              onUpdateItem(item)}}/>
            <label htmlFor={item.id}>{item.name}</label>
            <a href="#!" className="secondary-content" 
            onClick={()=>{
              item.status = 'deleted';
              onDeleteItem(item);
            }}><i className="material-icons">delete</i></a>
        </div>
    </li>
  )
}

export default Item