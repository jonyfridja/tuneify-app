export default class Tune {
    _id: string;
    title: string;
    constructor(tune: Tune) {
        this._id = tune._id;
        this.title = tune.title;
    }
}