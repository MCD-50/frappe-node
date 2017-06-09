import { get_args, console_message } from './collection';
const dns = require('dns');
import agent from './agent';


export const resolve_request = (domain, url, data, sid) => {
	return new Promise((resolve, reject) => {
		if (data) {
			data = JSON.stringify(data);
		}

		fetch_url(domain, url, data, sid)
			.then((json) => resolve(json))
			.catch((rej) => {
				reject(rej);
			});
	})
}


//local methods

const check_if_domain_exists = (domain) => {
	return new Promise((resolve, reject) => {
		dns.resolve(`http://${domain}.com`, (e) => {
			if (e)
				reject(e);
			else
				resolve()
		})
	});
}

const fetch_url = (domain, url, data, sid) => {
	return new Promise((resolve, reject) => {
		//first check if connection exists
		check_if_domain_exists(domain)
			.then(() => {
				let args = get_args(data, sid);
				agent
				.request(url, args)
				.then((res)=> {
					resolve(res);
				});
			}).catch((rej) => reject(rej));
	})
}