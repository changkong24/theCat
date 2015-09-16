/**
 * 游戏相关
 * @param  {[type]} ){	function Game(){	}	_p [description]
 * @return {[type]}              [description]
 */
define(["Renderer","Module","Resource","Random"],function(Renderer,Module,Resource,Ran){
	/**
	 * 游戏控制
	 */
	function Game(canvas){
		this._canvas = canvas;//画布
		this._module = new Module();//模型
		this._render = new Renderer(canvas,this._module);//渲染器
		this._resource = new Resource();//资源文件
		this._ran = new Ran(this._module);//随机算法
		this.resize();//初始化
		this._loadSource();//加载数据
	}
	_p = Game.prototype;

	/**
	 * 加载图片资源
	 * @return {[type]} [description]
	 */
	_p._loadSource = function(){
		var images = Resource.IMAGES;
		var path = Resource.PATH;
		var len = images.length;
		var that = this;
		var count = 0;
		for(var i = 0; i < len; i ++ ){
			this._resource.loadImages(i,path + images[i].src,function(){
				count ++;
				that._render._draw_loading(count,len);
				if(count >= len){
					that.loadComplete();//加载完成
					that._module.setComplete(true);//设置完成状态
					that._module.setStuats(Module.START);//开始状态
				}
			});
		}
	}
	/**
	 * 加载完成
	 * @return {[type]} [description]
	 */
	_p.loadComplete = function(){
		this._render.draw_bg();//绘制背景
		this._setFullData();
		this._render.draw_playing(Module.PLAYING);
		this._render.draw_start();//绘制开始界面
	}
	/**
	 * 点击界面
	 * @param  {[type]} x [description]
	 * @param  {[type]} y [description]
	 * @return {[type]}   [description]
	 */
	_p.handleClick = function(x,y){
		var loadComplete = this._module.getComplete();
		if(!loadComplete){
			return;//加载未完成
		}
		var status = this._module.getStatus();//当前状态
		if(status == Module.START){
			//如果是开始游戏状态，跳转到游戏中
			this._module.setStuats(Module.PLAYING);
			this._setFullData();
			this._initLen();//初始化权值
			this._render.draw_playing(Module.PLAYING);
		}	
		if(status == Module.PLAYING){
			//游戏中
		}
	}
	/**
	 * 重绘页面
	 * @return {[type]} [description]
	 */
	_p.resize = function(){
		this._render.resize(this._canvas.width,this._canvas.height);
		if(!this._module.getComplete()){
			return;
		}
		var status = this._module.getStatus();
		switch(status){
			case Module.LOADING:
				this._render.draw_bg();
				break;
			case Module.START:
				this._render.clearCanvas();//清空画布
				this._render.draw_bg();
				// this._render.draw_start();
				break;
			case Module.PLAYING:
				this._render.draw_bg();
				break;
		}
	}
	/**
	 * 随机生成full数据 绑定到data上
	 */
	_p._setFullData = function(){
		var arrs = this._ran.getRanFullCircles();
		this._module.setFullNums(arrs.length);//总个数
		var len = arrs.length;
		this._module.initData();//清空所有数据
		for(var i = 0;i < len;i ++){
			this._module.setData(Module.FULL,arrs[i].x,arrs[i].y)
		}
	}
	/**
	 * 从猫位置开始生成权值
	 * @return {[type]} [description]
	 */
	_p._initLen = function() {
		var catPoint = this._module.getCatPoint();
		var x = catPoint.x;
		var y = catPoint.y;//猫的位置
		this._module.setDataLen(0,x,y);
	}
	return Game;
})