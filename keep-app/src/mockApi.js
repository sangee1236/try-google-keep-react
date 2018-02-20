const lists = [
    {
        id: 1,
        title: 'Groceries',
        status: 'active',
        items: [
            {
                id: 1,
                name: 'Raw Rice',
                qty: 0,
                price: 0,
                status: 'active'
            },
            {
                id: 6,
                name: 'Bread',
                qty: 0,
                price: 0,
                status: 'done'
            },
            {
                id: 5,
                name: 'Breads',
                qty: 0,
                price: 0,
                status: 'done'
            },
            {
                id: 2,
                name: 'Veggies',
                qty: 0,
                price: 0,
                status: 'active'
            },
            {
                id: 3,
                name: 'Bread',
                qty: 0,
                price: 0,
                status: 'active'
            },
            {
                id: 4,
                name: 'Breads',
                qty: 0,
                price: 0,
                status: 'done'
            }
        ],
        labels: [
            {
                id: 1,
                name: 'Summer'
            }
        ]
    }
];

class ListApi {
    static getAllLists() {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(Object.assign([], lists));
            }, 1000);
        });
    }

    static deleteList(listId) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const indexOfListToDelete = lists.findIndex(list => {
                    list.id === listId;
                });
                lists.splice(indexOfListToDelete, 1);
                resolve();
            }, 1000);
        });
    }
}

export default ListApi;
