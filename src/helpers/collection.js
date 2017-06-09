export const get_args = (data = null, sid = null) => {
	let args = {
		method: "POST",
		headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' }
	};

	//append body if exists
	if (data) {
		args["data"] = data;
		args["headers"] = { 'Accept': 'application/json', 'Content-Type': 'multipart/form-data' };
	}

	//appen if sid exists 
	if (sid) {
		args["cookies"] = { 'sid': sid };
	}

	return args;
}

export const get_domain = (site) => {
	if (domain) {
		domain = `http://${site}.erpnext.com`;
		return domain.trim();
	}
	return null;
}

export const get_data = (doctype, data) => {
	return {
		"doctype": doctype,
		"data": data ? data : null
	};
}

export const console_message = (msg) => {
	console.log(msg);
}





