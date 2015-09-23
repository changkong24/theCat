/**
 * 围住神经猫相关
 * @param  {[type]}                                                                               
 * @param  {[type]} 
 * @return {[type]} 
 */
define(["Game"],function(Game){
	/**
	 * 围住神经猫
	 */
	function Cat (canvasID){
		this._canvas = this._initFullScreenCanvas(canvasID);
		this._ctx = this._canvas.getContext("2d");
		this._game = new Game(this._canvas);
	}

	_p = Cat.prototype;//原型
	/**
	 * 初始化游戏
	 * @return {[type]} [description]
	 */
	_p.init = function(){
		var that = this;
		if(isTouchDevice()){
			this._canvas.addEventListener("touchstart",function(e){
				var touch = event.targetTouches[0];
				that._game.handleClick(touch.pageX,touch.pageY);
				e.stopPropagation();
				e.preventDefault();
			},false);
		}
		else{
			this._canvas.addEventListener("mouseup",function(e){
				var x = e.pageX - that._canvas.offsetLeft;
				that._game.handleClick(x,e.pageY);
				e.stopPropagation();
				e.preventDefault();
			})
		}
	}
	/**
	 * 初始化canvas
	 * @return {[type]} [description]
	 */
	_p._initFullScreenCanvas = function(canvasID){
		var canvas = document.getElementById(canvasID);
		resizeCanvas(canvas);
		var that = this;
		window.addEventListener("resize",function(){
			resizeCanvas(canvas);
			that._game.resize();
		})
		return canvas;
	}
	/**
	* 调整大小 将canvas 设为满屏
	*/
	function resizeCanvas(canvas){
		canvas.width = document.width || document.body.clientWidth;
		canvas.height = document.height || document.body.clientHeight;
		canvas.width = canvas.width > 640 ? 640 : canvas.width;
		canvas.height = canvas.height > 960 ? 960 : canvas.height;
	}
	/**
	 * 判断是否是移动网页
	 * @return {Boolean} [description]
	 */
	function isTouchDevice(){
		return ('ontouchstart' in document.documentElement);
	}
	return Cat;
})