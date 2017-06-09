import { resolve_request } from './helpers/internet';

export const _authenticate = (domain, url, callback) => {
	_resolve_request(domain, url, callback)
}

export const _resolve_request = (domain, url, callback, data=null, sid=null) => {
	resolve_request(domain, url, data, sid)
	.then((json) => callback(json))
	.catch((rej) => callback(rej));
}

