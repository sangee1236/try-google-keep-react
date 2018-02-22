const initialState = {
    user: {},
    result: [],
    filter: ''
};

const lists = (state = initialState, action) => {
    switch (action.type) {
        case 'RETRIVE_USER':
            console.log('User :', action.payload);
            return { ...state, user: action.payload };

        case 'RETRIVE_LISTS':
            return { ...state, ...action.payload };

        case 'ADD_LIST':
            console.log('NewList', action.payload);
            var payload = action.payload;
            return {
                ...state,
                result: [...state.result, action.id],
                entities: {
                    ...state.entities,
                    lists: {
                        ...state.entities.lists,
                        ...payload.entities.lists
                    }
                }
            };

        case 'UPDATE_LIST':
        case 'DELETE_LIST':
            console.log('Update List', action.payload);
            return {
                ...state,
                ...(state.entities.lists[action.payload.id].status =
                    action.payload.status)
            };

        case 'ADD_ITEM':
            payload = action.payload;
            return {
                ...state,
                entities: {
                    ...state.entities,
                    lists: {
                        ...state.entities.lists,
                        ...(state.entities.lists[action.pid].items = [
                            ...state.entities.lists[action.pid].items,
                            action.id
                        ])
                    },
                    items: {
                        ...state.entities.items,
                        ...payload.entities.items
                    }
                }
            };

        case 'UPDATE_ITEM':
        case 'DELETE_ITEM':
            return {
                ...state,
                ...(state.entities.items[action.payload.id] = action.payload)
            };
        default:
            return state;
    }
};

export default lists;

export const getAllList = state =>
    state.result.map(id => state.entities.lists[id]);
export const getAllItems = state => state.entities.items;

export const getListItems = (itemArr, state) =>
    itemArr.map(id => state.entities.Items[id]);
