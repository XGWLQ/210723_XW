const fs = require('fs')

/* fs.readFile('./content/GSYG.exe',(err,data)=>{
	if(err){
		console.log(err)
	}else{
		console.log(data.toString());
	}
}) */


const p = new Promise((resolce,reject)=>{
	fs.readFile('./content/GSYG.exe',(err,data)=>{
		if(err){
			reject(err)
		}else{
			resolce(data.toString());
		}
	})
})
p.then((value)=>[
	console.log(value.toString())
])