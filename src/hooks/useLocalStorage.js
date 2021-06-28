import {useState, useEffect} from 'react';

const useLocalStorage = (key, firstValue = null) => {
    // get item by getting from local, if no item was found, set a default value
    const initialValue = localStorage.getItem(key) || firstValue;
    // use useState to set item with an initial value
    const [item, setItem] = useState(initialValue);

    // update item when key or item changes
    useEffect(() => {
        // remove key if item becomes null
        if (item === null) {
            localStorage.removeItem(key);
        } else {
            // update item
            localStorage.setItem(key, item);
        }
    }, [key, item]);

    return [item, setItem];
}

export default useLocalStorage;