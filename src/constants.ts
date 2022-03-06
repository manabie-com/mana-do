const Actions: Array<string> = [
    'SET_TODO',
    'CREATE_TODO',
    'DELETE_TODO',
    'DELETE_ALL_TODOS',
    'TOGGLE_ALL_TODOS',
    'UPDATE_TODO_STATUS',
    'EDIT_TODO'
]

const convertArrayToMirrorObject = (array: Array<string>) => {
    return array.reduce((obj: any, key: string) => {
        obj[key] = key;
        return obj;
    }, {});
}

export const ActionTypes = convertArrayToMirrorObject(Actions);