define([],function(){
	function Ran(module){
		this._module = module;
	}
	_p = Ran.prototype;//原型
	/**
	 * 获取full_circle总个数
	 * @return {[type]} [description]
	 */
	_p._getFullNums = function(){
		var cells = this._module.getCells();//获取列数
		var circels = cells * cells;//总的圆个数
		var nums = Math.round(Math.random() * circels * 0.3);
		if(nums < 6){
			return this._getFullNums();
		}
		return nums;
	}
	/**
	 * 生成随机个数
	 * @return {[type]} [description]
	 */
	_p.getRanFullCircles = function(){
		var nums = this._getFullNums();
		var arr = [];
		for(var i = 0;i < nums;i ++){
			arr.push(this._getXYObj(arr))
		}
		return arr;
	}

	/**
	 * 获取0-cells的数字
	 * @return {[type]} [description]
	 */
	_p._getUnderCellsNum = function(){
		var cells = this._module.getCells();
		var num = Math.round(Math.random() * 10);
		if(num >= cells ){
			return this._getUnderCellsNum();
		}
		return num;
	}
	/**
	 * 获取行列坐标 并且坐标不能相同
	 * @param  {[type]} arr [description]
	 * @return {[type]}     [description]
	 */
	_p._getXYObj = function(arr){
		var obj = {
			x : this._getUnderCellsNum(),
			y : this._getUnderCellsNum()
		}
		if(!this._arrIndex(arr,obj)){
			return obj;
		}
		else{
			return this._getXYObj(arr);
		}
	}
	/**
	 * 判断数组是否包含这个对象
	 * @param  {[type]} arr [description]
	 * @param  {[type]} obj [description]
	 * @return {[type]}     [description]
	 */
	_p._arrIndex = function(arr,obj){
		var len = arr.length;
		for(var i = 0;i < len;i ++){
			if(arr[i].x == obj.x && arr[i].y == obj.y){
				return true;
			}
		}
		return false;
	}
	return Ran;
})