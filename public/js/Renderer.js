/**
 * 绘制游戏界面
 */
function Renderer(canvas){
	this._canvas = canvas;//界面对象
	this._ctx = canvas.getContext("2d");//界面内容
	this._width = 0;
	this._height = 0;//界面宽高
	this._x = 0;
	this._y = 0;//棋盘格坐标
}

_p = Renderer.prorotype;//原型

/**
 * 绘制主页面
 * @return {[type]} [description]
 */
_p.draw_main = function(){

}