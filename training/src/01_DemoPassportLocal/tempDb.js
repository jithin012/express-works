
function UserDB() {

    let userId = 0;
    const users = {};

    function addUser(name, hash, salt, admin) {
        userId++;
        users[name] = new User(userId, name, hash, salt, admin);
        console.log(users[name]);
    }

    function getUser(username) {
        return users[username];
    }
    function getUserById(userId) {
        return Object.values(users)[0];
    }
    return {
        addUser,
        getUser,
        getUserById
    }
    
}

class User {
    constructor(userId, name, hash, salt, admin) {
        this.userId = userId;
        this.name = name;
        this.admin = admin;
        this.hash = hash;
        this.salt = salt;
    }
}

export default {
    userDB: UserDB()
}

