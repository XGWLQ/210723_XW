function Promise (executer) {
	//定义两个默认属性
	this.state = 'pending'
	this.value = 'null'

	//箭头函数指向的是window ，所以这里要保存this
	const _this = this

	//then可能调用了多个，用来保存他的状态，每一个元素都是一个对象
	// 存放着两种状态
	this.callbacks = []

	function resolve (data) {
		//让他的状态只能改变一次
		if (_this.state != 'pending') { return }
		_this.state = 'fulfilled'
		_this.value = data

		// 调用成功的回调函数
		// if (_this.callback.onsucceed) {
		// 	_this.callback.onsucceed(data)
		// }

		_this.callbacks.forEach(item => {
			item.onsucceed(data)
		});
	}
	function reject (data) {
		//让他的状态只能改变一次
		if (_this.state != 'pending') { return }

		_this.state = 'rejected'
		_this.value = data

		// 调用失败的回调函数
		// if (_this.callback.onlose) {
		// 	_this.callback.onlose(data)
		// }
		_this.callbacks.forEach(item => {
			item.onlose(data)
		});
	}
	//抛出异常
	try {
		executer(resolve, reject)
	} catch (e) {
		reject(e)
	}

}

//原型链上的then方法
Promise.prototype.then = function (onsucceed, onlose) {
	const _this = this

	//解决异常穿透
	if (typeof onlose !== 'function') {
		onlose = reason =>{
			throw reason
		}
	}
	if (typeof onsucceed !== 'function') {
		onsucceed = value =>value
	}

	// then函数返回的是一个promise对象
	return new Promise((resolve, reject) => {
		// 因为调用的是p实例 p又指向实例对象Promise
		// 要根据函数的状态选择走的是哪一个分支
		// 所用可以拿到他的状态 
		if (this.state === 'fulfilled') {
			onStatus(_this, onsucceed, resolve, reject)
		}

		//失败的回调
		if (this.state === 'rejected') {
			onStatus(_this, onlose, resolve, reject)

		}

		// 因为执行的是异步函数 但是他本身是同步函数 异步函数还没执行他本身的状态就是pending
		//所以用一个对象保存 
		if (this.state === 'pending') {
			// 保存回调函数
			this.callbacks.push({
				onsucceed: function () {
					onStatus(_this, onsucceed, resolve, reject)
				},
				onlose: function () {
					onStatus(_this, onlose, resolve, reject)
				},
			})
		}
	})
}

Promise.prototype.catch = function(onlose){
	return this.then(undefined,onlose)

}

Promise.resolve = function(value){
	return new Promise((resolve,reject)=>{
		try {
			//判断返回的是值 还是promise对象
			if (value instanceof Promise) {
				// 如果是promise类型的对象
				value.then(v => {
					resolve(v)
				}, r => {
					reject(r)
				})
			} else {
				resolve(value)
			}
		} catch (e) {
			reject(e)
		}
	})
}

Promise.reject = function(value){
	return new Promise((resolve,reject)=>{
		reject(value)
})}

// 封装公共方法
function onStatus (_this, onsu, resolve, reject) {
	try {
		// 获取回调函数的执行结果
		let result = onsu(_this.value)
		//判断返回的是值 还是promise对象
		if (result instanceof Promise) {
			// 如果是promise类型的对象
			result.then(v => {
				resolve(v)
			}, r => {
				reject(r)
			})
		} else {
			resolve(result)
		}
	} catch (e) {
		reject(e)
	}
}