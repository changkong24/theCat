/**
 * 最短路径算法
 * @param  {[type]} Module){	function MinPath       (){	}} [description]
 * @return {[type]}                    [description]
 */
define(["Module"],function(Module){
	/**
	 * 最短路径算法
	 */
	function MinPath (){
		var catPoint = this._module.getCatPoint();//猫的位置
		this._array = this._module.getData();//数据矩阵
		this._x = catPoint.x;
		this._y = catPoint.y;
		this._path = [];//最短路径
		this._len = 0;//最短长度	
	}
	var _p = MinPath.prototype;
	/**
	 * 获取下一步可行的路径
	 * @return {[type]} [description]
	 */
	_p.getNext = function(x,y){
		var avilable = [];//可用位置
		var cells = this._module.getCells();
		if(x == 0 || y == 0){
			return false;//已经到达顶点
		}
		//周围六个位置
		if(x % 2 == 0){
			//偶数行 六个位置是(x-1,y-1),(x,y-1),(x-1,y),(x+1,y),(x-1,y+1),(x,y+1)
			if(x - 1 >= 0 ){
				if(this._module.getDataVal(x-1,y) == Module.EMPTY){
					//可用点位
					avilable.push({x:x-1,y:y});
				}
				if(y - 1 >= 0){
					if(this._module.getDataVal(x - 1,y - 1) == Module.EMPTY){
						avilable.push({x:x-1,y:y-1});
					}
				}
				if(y + 1 < cells){
					if(this._module.getDataVal(x - 1,y + 1) == Module.EMPTY){
						avilable.push({x:x-1,y:y+1});
					}
				}
			}
			if(y - 1 >= 0){
				if(this._module.getDataVal(x,y - 1) == Module.EMPTY){
					avilable.push({x:x,y:y-1});
				}
			}
			if(x + 1 < cells){
				if(this._module.getDataVal(x+1,y) == Module.EMPTY){
					avilable.push({x:x+1,y:y});
				}
			}
			if(y + 1 < cells){
				if(this._module.getDataVal(x,y + 1) == Module.EMPTY){
					avilable.push({x:x,y:y+1});
				}
			}
		}
		else{
			//奇数行 六个位置是 (x,y-1),(x+1,y-1),(x-1,y),(x+1,y),(x,y+1),(x+1,y+1)
			if(x + 1 < cells ){
				if(this._module.getDataVal(x + 1,y) == Module.EMPTY){
					//可用点位
					avilable.push({x:x + 1,y:y});
				}
				if(y - 1 >= 0){
					if(this._module.getDataVal(x + 1,y - 1) == Module.EMPTY){
						avilable.push({x:x + 1,y:y-1});
					}
				}
				if(y + 1 < cells){
					if(this._module.getDataVal(x + 1,y + 1) == Module.EMPTY){
						avilable.push({x:x + 1,y:y+1});
					}
				}
			}
			if(y - 1 >= 0){
				if(this._module.getDataVal(x,y - 1) == Module.EMPTY){
					avilable.push({x:x,y:y-1});
				}
			}
			if(x + 1 < cells){
				if(this._module.getDataVal(x+1,y) == Module.EMPTY){
					avilable.push({x:x+1,y:y});
				}
			}
			if(y + 1 < cells){
				if(this._module.getDataVal(x,y + 1) == Module.EMPTY){
					avilable.push({x:x,y:y+1});
				}
			}
		}
		return avilable;
	}

})