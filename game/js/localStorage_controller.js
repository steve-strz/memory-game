//USED TO STORE DATA
function save(name,value){
    localStorage.setItem(name,value);
}

//USED TO GET DATA
function get(name){
    return localStorage.getItem(name);
}

//USED TO REMOVE DATA
function remove(name){
    localStorage.removeItem(name);
}