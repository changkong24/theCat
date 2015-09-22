define([],function(){
	/**
	 * 游戏模板
	 */
	function Module(){
		this._loadComplete = false;
		this._status = Module.LOADING;//加载中状态 
		this._data = [];//数据
		this._cells = 9;
		this.initData();
		this._catPoint = {
			x : 4,
			y : 4
		}//神经猫的位置
		this._catNode = null;//神经猫的树节点
		this._fullNums = 0;
		this._cover = false;//猫是否被围住
		this._step = 0;//步数
		this._isWin = false;//是否胜利
	}
	var _p = Module.prototype;

	Module.LOADING = 0;//加载中
	Module.START = 1;//开始游戏
	Module.PLAYING = 2;//游戏中
	Module.COVER = 3;//游戏中
	Module.PAUSE = 4;//暂停中
	Module.GAMEOVER = 5;//游戏结束

	Module.EMPTY = 0;//可点点位
	Module.FULL = 1;//已点点位

	Module.MAX = 99;
	/**
	 * 初始化数据
	 * @return {[type]} [description]
	 */
	_p.initData = function(){
		for(var i = 0 ;i < this._cells; i ++){
			this._data[i] = [];
			for(var j = 0;j < this._cells;j ++){
				this._data[i][j] = {
					val : Module.EMPTY,
					img : null
				}
				
			}
		}
	}
	/**
	 * 设置完成状态
	 * @param {[type]} flag [description]
	 */
	_p.setComplete = function (flag){
		this._complete = flag;
	}
	/**
	 * 获取当前的加载状态
	 * @return {[type]} [description]
	 */
	_p.getComplete = function(){
		return this._complete;
	}
	/**
	 * 设置当前游戏状态
	 * @param {[type]} status [description]
	 */
	_p.setStuats = function (status){
		this._status = status;
	}
	/**
	 * 获取当前状态
	 * @return {[type]} [description]
	 */
	_p.getStatus = function (){
		return this._status;
	}
	/**
	 * 获取列数
	 * @return {[type]} [description]
	 */
	_p.getCells = function(){
		return this._cells;
	}
	/**
	 * 获取数据
	 * @return {[type]} [description]
	 */
	_p.getData = function (){
		return this._data;
	}
	/**
	 * 设置数据
	 * @param {[type]} d [description]
	 * @param {[type]} i [description]
	 * @param {[type]} j [description]
	 */
	_p.setData = function(d,i,j){
		this._data[i][j].val = d;
	}
	/**
	 * 获取第i行第j列的值
	 * @param  {[type]} i [description]
	 * @param  {[type]} j [description]
	 * @return {[type]}   [description]
	 */
	_p.getDataVal = function(i,j){
		return this._data[i][j].val;
	}
	/**
	 * 设置神经猫的位置
	 * @param {[type]} x [description]
	 * @param {[type]} y [description]
	 */
	_p.setCatPoint = function(x,y){
		this._catPoint = {
			x : x,
			y : y
		}
	}
	/**
	 * 获取神经猫的位置
	 * @return {[type]} [description]
	 */
	_p.getCatPoint = function(){
		return this._catPoint;
	}
	/**
	 * 设置个数
	 * @param {[type]} num [description]
	 */
	_p.setFullNums = function(num){
		this._fullNums = num;
	}
	/**
	 * 获取最大个数
	 * @return {[type]} [description]
	 */
	_p.getFullNums = function(){
		return this._fullNums;
	}
	/**
	 * 设置猫节点
	 * @param {[type]} node [description]
	 */
	_p.setCatNode = function(node){
		this._catNode = node;
	}
	/**
	 * 获取猫节点
	 * @return {[type]} [description]
	 */
	_p.getCatNode = function(){
		return this._catNode;
	}
	/**
	 * 设置是否被围住
	 * @param {[type]} bool [description]
	 */
	_p.setCover = function(bool){
		this._cover = bool;
	}
	/**
	 * 获取是否被围住
	 * @return {[type]} [description]
	 */
	_p.getCover = function(){
		return this._cover;
	}
	/**
	 * 游戏步数
	 * 每次增加一步
	 */
	_p.setStep = function(){
		this._step++;
	}
	/**
	 * 获取当前的游戏步数
	 * @return {[type]} [description]
	 */
	_p.getStep = function (){
		return this._step;
	}
	/**
	 * 设置是否胜利
	 * @param {[type]} flag [description]
	 */
	_p.setWin = function(flag){
		this._isWin = flag;
	}
	/**
	 * 获取是否胜利
	 * @return {[type]} [description]
	 */
	_p.getWin = function (){
		return this._isWin;
	}
	return Module;
})