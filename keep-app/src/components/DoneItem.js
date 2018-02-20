import React from 'react'

const DoneItem = ({item}) => {

  return (
    <li className="collection-item">
        <div className="done muted">
            {item.name}
            <a className="secondary-content"><i className="material-icons grey-text">shopping_basket</i></a>
        </div>
    </li>
  )
}

export default DoneItem