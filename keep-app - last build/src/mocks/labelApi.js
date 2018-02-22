const labels = [
    {
        id: 1,
        name: 'Summer'
    },
    {
        id: 2,
        name: 'Winter'
    },
    {
        id: 3,
        name: 'Spring'
    }
];

class LabelApi {
    static getAllLabels() {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(Object.assign([], lebels));
            }, 1000);
        });
    }

    static deleteLabel(labelId) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const indexOfLabelToDelete = labels.findIndex(l => {
                    l.id == labelId;
                });
                labels.splice(indexOfLabelToDelete, 1);
                resolve();
            }, 1000);
        });
    }
}

export default LabelApi;
