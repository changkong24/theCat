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
		this._catInterval = null;//猫的动作
		this._catPos = 0;//猫图片位置
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
		ctx.drawImage(start,0,0,start.width,start.height,this._width * 0.1,this._height *　0.12,this._width * 0.8,this._height * 0.7 );
	}
	/**
	 * 绘制开始状态
	 * @return {[type]} [description]
	 */
	_p.draw_playing = function(){
		this.clearCanvas();
		this.draw_bg();
		this._ctx.save();
		this._tarn_board();
		var cells = this._module.getCells();
		var data = this._module.getData();
		for(var i = 0;i < cells;i ++){
			for(var j = 0;j < cells;j ++){
				var val = this._module.getDataVal(i,j);
				this.draw_circles(val,i,j);
			}
		}
		this._drawCat(this._module.getCatPoint().x,this._module.getCatPoint().y);
		this._ctx.restore();
	}	
	/**
	 * 绘制圆球
	 * @param  {[type]} data [description]
	 * @param  {[type]} i    [description]
	 * @param  {[type]} j    [description]
	 * @return {[type]}      [description]
	 */
	_p.draw_circles = function(data,i,j){
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

		// //绘制猫
		// var catPos = this._module.getCatPoint();
		// if(i == catPos.x && j == catPos.y ){
		// 	//绘猫
		// 	this._drawCat(x,y);
		// }	

	}
	/**
	 * 画那只猫
	 * @return {[type]} [description]
	 */
	_p._drawCat = function(i,j){
		var radius = this._radius;
		var index = this._module.getCover() ? 8 : 7;
		var catImg = Resource.IMAGES[index].img;//猫图片
		var width = radius * 2 + 10;//猫宽度
		var height = radius * 4;//猫的高度
		var x = (i * (radius * 10 / 9) * 2);
		x = j % 2 == 0 ? x : x + radius;
		var y = j * radius * 2 - 4;

		x = x - width + radius * 2 + 4;
		y =  y - height / 2 - radius / 2;//画猫的位置

		var catWidth = this._module.getCover() ? 93 : 93;	
		var catHeight = this._module.getCover() ? 64 : 60;
		this._ctx.drawImage(catImg,catHeight * (this._catPos % 4), Math.floor(this._catPos / 4) * catWidth,catHeight,catWidth,x,y,width ,height);
	}
	/**
	 * 猫的动画
	 * @param  {[type]} img    [description]
	 * @param  {[type]} x      [description]
	 * @param  {[type]} y      [description]
	 * @param  {[type]} width  [description]
	 * @param  {[type]} heigth [description]
	 * @return {[type]}        [description]
	 */
	_p.catAnimation = function(img,x,y,width,heigth){
		var count = this._module.getCover() ? 13 : 14;
		var catX = 0,catY = 0;
		var that = this;
		this._catInterval = setInterval(function(){
			that.draw_playing();
			if(that._catPos >= count){
				that._catPos = 0;
			}
			else{
				that._catPos ++;
			}
			if(that._module.getStatus() == Module.GAMEOVER){
				that.draw_gameOver();//游戏结束
			}
		},50);
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
	/**
	 * 游戏点击后
	 * @param  {[type]} x [description]
	 * @param  {[type]} y [description]
	 * @return {[type]}   [description]
	 */
	_p.getRowCol = function(x,y){
		var radius = this._radius;//半径
		var col = Math.floor((y - this._y + 4) / (this._radius * 2));
		// var x = (i * (radius * 10 / 9) * 2);
		// x = j % 2 == 0 ? x : x + radius;
		var xRadius = col % 2 == 0 ? x - radius : x - 2 * radius;//是否少半个半径
		var row = Math.floor((xRadius * 9) / ( 2 * 10 * radius));//行位置
		return {
			row:row,col:col
		}
	}
	/**
	 * 绘制游戏结束界面
	 * flag true 围住神经猫 flag false 让猫飞了
	 * @return {[type]} [description]
	 */
	_p.draw_gameOver = function(){
		var ctx = this._ctx;
		var step = this._module.getStep();
		var imgOver = this._module.getWin() ? Resource.IMAGES[10].img : Resource.IMAGES[2].img,imgShare = Resource.IMAGES[6].img,imgReplay = Resource.IMAGES[5].img,imgMore = Resource.IMAGES[4].img;
		var txt = this._module.getWin()?"你用"+step+"步围住了死猫" : "你用了"+step+"步让飞了！渣渣！"
		ctx.save();
		var width = this._canvas.width * 0.9;
		var height = this._canvas.height * 0.5;
		ctx.drawImage(imgOver,0,0,imgOver.width,imgOver.height,this._canvas.width * 0.05,this._canvas.height * 0.15,width,imgOver.height * width / imgOver.width);
		ctx.textAlign = "center";
		ctx.textBaseline = "middle";
		ctx.font="24px";
		ctx.fillStyle = "red";
		ctx.fillText(txt,this._canvas.width / 2,this._canvas.height * 0.15 + imgOver.height * width / imgOver.width * 0.6);
		ctx.drawImage(imgShare,0,0,imgShare.width,imgShare.height,this._canvas.width * 0.05 ,this._canvas.height * 0.65 + 10,(width/2 - 10),imgShare.height * (width/2 -10) / imgShare.width);//分享按钮
		ctx.drawImage(imgReplay,0,0,imgReplay.width,imgReplay.height, this._canvas.width * 0.05 + width - (width/2 - 10),this._canvas.height * 0.65 + 10,(width/2 - 10),imgShare.height *(width/2 - 10)/imgReplay.width );//重新游戏按钮
		ctx.drawImage(imgMore,0,0,imgMore.width,imgMore.height,this._canvas.width * 0.05,this._canvas.height - imgMore.height * (width / imgMore.width) ,width,imgMore.height * (width / imgMore.width));//更多
		ctx.restore();
	}
	return Renderer;
})