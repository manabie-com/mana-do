import { Todo } from './models/todo';

export const saveState = (save: any) => {
    try {
        localStorage.setItem('state', JSON.stringify(save))
    }
    catch (err) {
        console.log('save localStorage failed');

    }
}

export const loadState = () => {
    try {
        const state = localStorage.getItem('state')
        if (state === null) { return undefined }
        return JSON.parse(state)
    }
    catch (err) {
        console.log('Get localStorage failed');
        
    }
}