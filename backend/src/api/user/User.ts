export default class User {
    _id: string;
    username: string;
    password: string;
    name: string;

    constructor(user) {
        const { _id, username, password, name } = user;
        this._id = _id
        this.username = username
        this.password = password;
        this.name = name;
    }
}