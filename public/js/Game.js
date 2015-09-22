/**
 * 游戏相关
 * @param  {[type]} ){	function Game(){	}	_p [description]
 * @return {[type]}              [description]
 */
define(["Renderer","Module","Resource","Random","Graph"],function(Renderer,Module,Resource,Ran,Graph){
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
		this._graph = null;
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
			this._render.catAnimation();
			this._initNodes();//初始化图结构
		}	
		if(status == Module.PLAYING || status == Module.COVER){
			//游戏中
			this._gamePlaying(x,y);
			this._module.setStep();//游戏执行的步数添加
		}
	}
	/**
	 * 点击节点 更新节点 更新猫的位置
	 * @param  {[type]} x [description]
	 * @param  {[type]} y [description]
	 * @return {[type]}   [description]
	 */
	_p._gamePlaying = function(x,y){
		var pos = this._render.getRowCol(x,y);//点击的行列
		var catPos = this._module.getCatPoint();//猫的位置
		if(this._module.getDataVal(pos.row,pos.col) == Module.FULL || (catPos.x == pos.row && catPos.y == pos.col)){
			//此处不能点击 已点过 或者是猫的位置
			return;
		}
		else{
			this._module.setData(Module.FULL,pos.row,pos.col);//设置点击的点为选中点
			this._initNodes();
			var status = this._module.getCover() ? this._getCoverPath() : this._getPaths();//获取猫的可行路径
			if(status.status == Module.COVER){
				//被围住
				this._module.setCover(true);//猫被围住了
				this._module.setStuats(Module.COVER);
				this._render.draw_playing();//绘制新的游戏界面
			}
			else if(status.status == Module.GAMEOVER){
				if(this._module.getCover()){
					this._module.setWin(true);
				}
				else{
					this._module.setWin(false);
				}
				this._module.setStuats(Module.GAMEOVER);
				this._render.draw_gameOver();
			}
			else {
				var newPoint = status.minPath[status.minPath.length - 1].node;
				var x = newPoint.getPosition().x,y = newPoint.getPosition().y;
				this._module.setCatPoint(x,y);//新猫位置
				if(x == 0 || y == 0 || x == this._module.getCells() - 1 || y == this._module.getCells()){
					//到边界了，游戏结束
					this._module.setStuats(Module.GAMEOVER);
					this._module.setWin(false);
					this._render.draw_gameOver();//绘制游戏结束
				}
				this._render.draw_playing();//绘制新的游戏界面
			}
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
				this._render.draw_start();
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
	 * 生成node节点
	 * @return {[type]} [description]
	 */
	_p._initNodes = function(){
		var matrix = this._module.getData();//所有的数据集合
		var catPos = this._module.getCatPoint();
		var nodes = [];
		for(var i=0;i < matrix.length;i++){
			for(var j = 0;j < matrix[i].length;j++){
				if(i == catPos.x && j == catPos.y){
					var node = new Graph.Node(nodes.length,i,j,d);
					this._module.setCatNode(node);
				}
				var d = this._module.getDataVal(i,j);
				if(d == Module.EMPTY){//可用顶点
					var node = new Graph.Node(nodes.length,i,j,d);
					nodes.push(node);//所有的顶点
				}
			}
		}
		this._graph = new Graph.Graph(nodes,this._module);
	}
	/**
	 * 从猫的位置生成路径 最短路径
	 * @return {[type]} [description]
	 */
	_p._getPaths = function(){
		var catNode = this._module.getCatNode();//猫的位置
		this._graph.buildPaths(catNode);
		var paths = this._graph.getPath();//猫的所有出路
		if(paths.length <= 0){
			return {
				status:Module.COVER,
				minPath : []
			}
		}
		return {
			status:Module.PLAYING,
			minPath:this._getMinPath(paths)
		} 
	}
	/**
	 * 获取最短的路径
	 * @param  {[type]} paths [description]
	 * @return {[type]}       [description]
	 */
	_p._getMinPath = function(paths){
		var sortPath = paths.sort(function(a,b){
			return a.length - b.length;
		})
		return sortPath[0];
	}
	/**
	 * 获取最大通路
	 * @return {[type]} [description]
	 */
	_p._getCoverPath = function(){
		var catNode = this._module.getCatNode();//猫的位置
		this._graph.buildCoverPaths(catNode);
		var paths = this._graph.getPath();//猫的所有出路
		if(paths.length <= 0 || paths[0].length == 0){
			return {
				status:Module.GAMEOVER,
				minPath : []
			}
		}
		return {
			status:Module.PLAYING,
			minPath:this._getMaxPath(paths)
		} 
	}
	/**
	 * 获取最大通路
	 * @param  {[type]} paths [description]
	 * @return {[type]}       [description]
	 */
	_p._getMaxPath = function (paths){
		var sortPath = paths.sort(function(a,b){
			return b.length - a.length;
		})
		return sortPath[0];
	}
	return Game;
})