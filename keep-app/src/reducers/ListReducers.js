import update from 'react-addons-update'; 

const initialState = {
  user:{},
  result:[],
  filter:""
}

const lists = (state = initialState, action) => {
    switch (action.type) {
      case 'RETRIVE_USER':
      console.log("User :", action.payload)
      return {...state, user:action.payload};

      case 'RETRIVE_LISTS':       
       return {...state, ...action.payload};

      case 'ADD_LIST':
        console.log("NewList", action.payload);
        // Temp need to implementing       
        return {...state, lists:{...state.lists,[action.payload.id]:action.payload}};

        case 'UPDATE_LIST':
        case 'DELETE_LIST':
        console.log("Update List", action.payload);
        return {
          ...state,           
          ...state.entities.lists[action.payload.id].status = action.payload.status, 
          };

        case 'ADD_ITEM':
        return {...state,items:{...state.items,...action.payload}};

        case 'UPDATE_ITEM':
        case 'DELETE_ITEM':
        return {...state,...state.entities.items[action.payload.id] = action.payload};
      default:
        return state
    }
  }
  
  export default lists


  export const getAllList = (state) => state.result.map(id => state.entities.lists[id]);
  export const getAllItems = (state) => state.entities.items;

  export const getListItems = (itemArr, state) => itemArr.map(id =>state.entities.Items[id]);