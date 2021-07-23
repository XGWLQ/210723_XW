const util = require('util')
const fs = require('fs')

let myUtil = util.promisify(fs.readFile)

async function main(){
	try {
	let data1 = await myUtil("./content/GSYG.exe")
	let data2 = await myUtil("./content/YRS.exe")
	let data3 = await myUtil("./content/JCZ.exe")

	console.log(data1 +data2+ data3);
	} catch (error) {
		console.log(error);
	}
}
main()