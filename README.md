# frappe-node
A npm package for frappe framework


# Getting Started
```bash
$ npm i frappe-node --save
```

# Usage
```js
	import {FrappeNode} from 'frappe-node';

	const frappe_node = new FrappeNode();
	frappe_node.authenticate('mysite.erpnext.com', 'email', 'password')
	
	//lets create a new ToDo
	frappe_node.add_doc('ToDo', {description:'des1'})
	.then(res => console.log(res))
	.catch(rej => console.log(rej));
```

# Methods
```js
	- add_doc
	- update_doc
	- delete_doc
	- get_doc
	- get_list
	- get_meta
```

