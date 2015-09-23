define([],function(){
	/**
	 * 资源数据相关
	 */
	function Resource (){
	}
	_p = Resource.prototype;//原型
	
	/**
	 * 加载数据资源
	 * @param  {[type]} src [description]
	 * @return {[type]}     [description]
	 */
	_p.loadImages = function(i,src,callback){
		var img = new Image();
		img.src = src;
		Resource.IMAGES[i].img = img;
		img.onload = callback;
	}
	/**
	 * 图片资源
	 * @type {Object}
	 */
	Resource.PATH = "./images/"
	Resource.IMAGES = [
		{
			id : "bg",
			src : "bg.jpg" 
		},{
			id : "arron",
			src : "arron.png"
		},{
			id : "failed",
			src : "failed.png"
		},
		{
			id : "start",
			src : "btn_start.png"
		},
		{
			id : "more",
			src : "more.png"
		},
		{
			id : "replay",
			src : "replay.png"
		},
		{
			id : "share",
			src : "shareBTN.png"
		},
		{
			id : "stay",
			src : "stay.png"
		},
		{
			id : "weizhu",
			src : "weizhu.png"
		},{
			id : "txt",
			src : "txt.png"
		},
		{
			id : "victory",
			src : "victory.png"
		},
		{
			id : "pot_empty",
			src : "pot1.png"
		},
		{
			id : "pot_full",
			src : "pot2.png"
		}
	]

	return Resource;

})