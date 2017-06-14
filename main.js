import { FrappeNode } from './src/api';
const x = new FrappeNode('dev.fixes:8000', 'administrator', 'qwe')
setTimeout(() => {
	x.add_doc('Note', { description: 'yahoo' })
	.then(json => console.log(json))
	.catch(res => console.log(res));
}, 5000);