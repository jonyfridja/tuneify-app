export default class Tune {
	_id: string;
	title: string;

	constructor({ _id, title }: Tune) {
		this._id = _id;
		this.title = title;
	}
}