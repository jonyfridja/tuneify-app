import uniqid from 'uniqid';
export function resolve(val?): Promise<any> {
    return Promise.resolve(val);

}

export function reject(val?): Promise<any> {
    return Promise.reject(val);
}

export function makeId(prefix = '', suffix = '') {
    return uniqid(prefix, suffix);
}