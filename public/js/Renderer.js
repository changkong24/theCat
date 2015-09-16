define(["Module","Resource"],function(Module,Resource){
	/**
	 * 绘制游戏界面
	 */
	function Renderer(canvas,module){
		this._canvas = canvas;//界面对象
		this._module = module;
		this._ctx = canvas.getContext("2d");//界面内容
		this._width = 0;
		this._height = 0;//界面宽高
		this._x = 0;
		this._y = 0;//棋盘格坐标
		this._height_board = 0;
		this._width_board = 0;//棋盘的宽高
		this._radius = 0;//原半径
	}

	_p = Renderer.prototype;//原型

	/**
	 * 加载中
	 * @return {[type]} [description]
	 */
	_p._draw_loading = function (i,len){
		var ctx = this._ctx;
		this.clearCanvas();
		ctx.fillStyle = "#333";
		ctx.fillRect(0,0,this._width,this._height);
		ctx.fillStyle = "#fff";
		ctx.font = "24px fontawesome";
		ctx.textAlign = "center";
		ctx.fillText("正在加载中" + i + "/" + len + "...",this._width/2,180);

	}
	/**
	 * 加载完成后 绘制主页面
	 * @return {[type]} [description]
	 */
	_p.draw_bg = function(){
		var ctx = this._ctx;
		var bg = Resource.IMAGES[0].img;
		ctx.drawImage(bg,0,0,bg.width,bg.height,0,0,this._width,this._height);
	}
	/**
	 * 绘制开始界面
	 * @return {[type]} [description]
	 */	
	_p.draw_start = function (){
		var ctx = this._ctx;
		var start = Resource.IMAGES[3].img;
		ctx.translate(-this._x,-this._y);
		// ctx.drawImage(start,0,0,start.width,start.height,this._width * 0.1,this._height *　0.12,this._width * 0.8,this._height * 0.7 );
	}
	/**
	 * 绘制开始状态
	 * @return {[type]} [description]
	 */
	_p.draw_playing = function(){
		this.draw_bg();
		this._tarn_board();
		var cells = this._module.getCells();
		var data = this._module.getData();
		for(var i = 0;i < cells;i ++){
			for(var j = 0;j < cells;j ++){
				var val = this._module.getDataVal(i,j);
				var len = this._module.getDataLen(i,j);
				this.draw_circles(val,i,j,len);
			}
		}
	}	
	/**
	 * 绘制圆球
	 * @param  {[type]} data [description]
	 * @param  {[type]} i    [description]
	 * @param  {[type]} j    [description]
	 * @return {[type]}      [description]
	 */
	_p.draw_circles = function(data,i,j,len){
		var img = null;
		if(Module.EMPTY == data){
			img = Resource.IMAGES[11].img;
		}
		else {
			img = Resource.IMAGES[12].img;
		}
		var radius = this._radius;
		var ctx = this._ctx;
		var x = (i * (radius * 10 / 9) * 2);
		x = j % 2 == 0 ? x : x + radius;
		var y = j * radius * 2 - 4;
		ctx.drawImage(img,0,0,img.width,img.height,x,y,radius * 2,radius * 2);
		ctx.font = "16px";
		ctx.textAlign = "center";
		ctx.fillText(len,x+radius,y+radius)
	}
	/**
	 * 映射到棋盘矩形
	 * @return {[type]} [description]
	 */
	_p._tarn_board = function(){
		var ctx = this._ctx;
		var width = this._width,height = this._height;
		var radius = this._width / 10 / 2 * 0.9;//半径
		var p_x = radius;//离左边一个半径
		var p_y = this._height * 0.35;//离上半部分的高度
		this._x = p_x;
		this._y = p_y;
		ctx.translate(p_x,p_y);
		this._height_board = 9 * (radius - radius * 0.1) * 2;
		this._width_board = 9 * 2 * radius + radius;//宽度
		this._radius = radius;//半径
	}
	/**
	 * 页面大小改变
	 * @param  {[type]} w [description]
	 * @param  {[type]} h [description]
	 * @return {[type]}   [description]
	 */
	_p.resize = function (w,h){
		this._width = w;
		this._height = h;
		this._repaint(this._canvas,this._ctx);
	}
	/**
	 * 重绘
	 * @return {[type]}
	 */
	_p._repaint = function (canvas,ctx){
		if(!ctx){
			return; 
		}
		//清除背景
		
		this._reorient(ctx);
	}
	/**
	 * 反转页面后，从新映射
	 * @param  {[type]} ctx [description]
	 * @return {[type]}     [description]
	 */
	_p._reorient = function(ctx){
		var angle = window.orientation;
		if(angle){
			var rot = -Math.PI*(angle/180);
			ctx.translate(angle==-90?canvas.width :0,
			angle == 90? canvas.height : 0);
			ctx.rotate(rot);
		}
	}
	/**
	 * 清空画布
	 * @return {[type]} [description]
	 */
	_p.clearCanvas = function(){
		this._ctx.clearRect(0,0,this._width,this._height);
	}
	return Renderer;
})