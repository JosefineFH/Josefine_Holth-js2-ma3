const tokenKey = "token";
const userKey = "user";

export function saveToken(token){
    console.log(token)
    saveToStorage(tokenKey, token)
}

export function getToken(){
    return getFromStorage(tokenKey);
}

export function saveUser(user){
    saveToStorage(userKey, user)
}
export function getUser(){
    const user = getFromStorage(userKey);

    if(user){
        return user
    }

    return false
}

export function clearStorage(){
    localStorage.clear()
}

function saveToStorage(key, value){
    localStorage.setItem(key, JSON.stringify(value))
}

function getFromStorage(key){
    const value = localStorage.getItem(key);

    if(!value){
        return null;
    }

    return JSON.parse(value);
}