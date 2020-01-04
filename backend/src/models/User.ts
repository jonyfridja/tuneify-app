export default class User {
    _id: string;
    username: string;
    password: string;
    constructor(user: User) {
        this._id = user._id;
        this.username = user.username;
        this.password = user.password;
    }
}