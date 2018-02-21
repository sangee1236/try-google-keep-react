import {denormalize, normalize } from 'normalizr';
import { listSchema, itemSchema } from './schemas';

const baseUrl = 'http://localhost:55543/api';



export const retriveUser = user => ({
    type: 'RETRIVE_USER',
    payload: user
});

export const retriveLists = lists => ({
    type: 'RETRIVE_LISTS',
    payload: lists
});

export const addList = list => ({
    type: 'ADD_LIST',
    payload: list
});

export const updateList = list => ({
    type: 'UPDATE_LIST',
    payload: list
});

export const deleteList = list => ({
    type: 'DELETE_LIST',
    payload: list
});

export const addItem = (listId, item) => ({
    type: 'ADD_ITEM',
    payload: item
});

export const updateItem = (item) => ({
    type: 'UPDATE_ITEM',
    payload: item
});

export const deleteItem = (item) => ({
    type: 'DELETE_ITEM',
    payload: item
});

export const createLabel = label => ({
    type: 'CREATE_LABEL',
    payload: null
});

export const deleteLabel = labelId => ({
    type: 'DELETE_LABEL',
    payload: null
});

export const addLabel = (listId, labelId) => ({
    type: 'ADD_LABEL',
    payload: null
});

export const removeLabel = (listId, labelId) => ({
    type: 'REMOVE_LABEL',
    payload: null
});

// services

export const getUser = email => {
    return (dispatch, getState) => {
        fetch(baseUrl + '/users/by-email', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: email
            })
        })
            .then(function(response) {              

                response.json().then(function(data) {
                  localStorage.setItem("user", JSON.stringify(data));
                  dispatch(retriveUser(data));
                  dispatch(loadLists(data.id));
                });
            })
            .catch(function(err) {
                console.log(`error: ${err}`);
            });
    };
};

export const loadLists = userId => {
    return (dispatch, getState) => {
        fetch(baseUrl + '/lists/by-user/' + userId)
            .then(response => {
              response.json().then(function(data) {
                const normalized = normalize(data, [ listSchema ]);
                dispatch(retriveLists(normalized));
              });
                
            })
            .catch(error => console.log('List fetch Error'));
    };
};


export const createList = list => {
    console.log("list",list);
  return (dispatch, getState) => {
      fetch(baseUrl + '/lists', {
          method: 'POST',
          headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json'
          },
          body: JSON.stringify(list)
      })
          .then(function(response) {              

              response.json().then(function(data) {
                const normalized = normalize(data, listSchema);
                dispatch(addList(normalized));
                
              });
          })
          .catch(function(err) {
              console.log(`error: ${err}`);
          });
  };
};

export const handleItemUpdatAdd = item => {
    return (dispatch, getState) => {
        fetch(baseUrl + '/items', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(item)
        })
            .then(function(response) {              
  
                response.json().then(function(data) { 
                  const normalized = normalize(data, itemSchema);                
                  dispatch(addItem(normalized));
                });
            })
            .catch(function(err) {
                console.log(`error: ${err}`);
            });
    };
  };


export const handleItemUpdate = item => {
  return (dispatch, getState) => {
      fetch(baseUrl + '/items/'+ item.id, {
          method: 'PUT',
          headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json'
          },
          body: JSON.stringify(item)
      })
          .then(function(response) {              

              response.json().then(function(data) {                 
                dispatch(updateItem(data));
              });
          })
          .catch(function(err) {
              console.log(`error: ${err}`);
          });
  };
};


export const handleListUpdate = list => {
    delete list.items;
    delete list.labels;
    return (dispatch, getState) => {
        fetch(baseUrl + '/lists/'+ list.id, {
            method: 'PUT',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(list)
        })
            .then(function(response) {              
  
                response.json().then(function(data) {                            
                  dispatch(updateList(data));
                });
            })
            .catch(function(err) {
                console.log(`error: ${err}`);
            });
    };
  };
  




