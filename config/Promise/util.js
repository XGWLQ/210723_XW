const util = require('util')
const fs = require('fs')

let myUtil = util.promisify(fs.readFile)

myUtil('./content/GSYG.exe')
	.then((value)=>{
		console.log(value.toString());
	})