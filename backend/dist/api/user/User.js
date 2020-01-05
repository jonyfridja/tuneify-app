"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class User {
    constructor(user) {
        const { _id, username, password, name } = user;
        this._id = _id;
        this.username = username;
        this.password = password;
        this.name = name;
    }
}
exports.default = User;
//# sourceMappingURL=User.js.map