import update from 'react-addons-update'; 
const initialState = {
  user:{},
  lists:[],
  labels:[],
  filter:""
}

const lists = (state = initialState, action) => {
    switch (action.type) {
      case 'RETRIVE_USER':
      console.log("User :", action.payload)
      return {...state, user:action.payload};

      case 'RETRIVE_LISTS':
        return {...state, lists:action.payload};

      case 'ADD_LIST':
        console.log("NewList", action.payload);
        // Temp need to implementing       
        return {...state, lists:[...state.lists, action.payload]};

        case 'UPDATE_LIST':
        console.log("Update List", action.payload);
        let index = state.lists.findIndex(list => {
          list.id === action.payload.id && list.editmode === true
        });
        state.lists.splice(index, 1);
        
        delete action.payload.editmode;
        action.payload.id = state.lists.length+1;       
        return {...state, lists:[...state.lists, action.payload]};

        case 'DELETE_LIST':
        return {...state}

        case 'ADD_ITEM':
        console.log("New Item", action.payload);
        return {...state, lists:[...state.lists,{ items :[...state.lists.items, action.payload]} ]};

        case 'UPDATE_ITEM':        
        return {...state};

        case 'DELETE_ITEM':
        return {...state}
     
      default:
        return state
    }
  }
  
  export default lists