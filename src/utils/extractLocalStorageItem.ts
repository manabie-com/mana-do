/*
    This fucntion is created to get items from local storage.
*/

import { hasLocalStorage } from './hasLocalStorage';

export const extractLocalStorageItem = (item: string): any => {
    let parsedLocalItem = null;
    if (hasLocalStorage) {
        const localStorageItem = localStorage.getItem(item);
        if (localStorageItem) {
            parsedLocalItem = JSON.parse(localStorageItem);
        }
    }
    return parsedLocalItem
}