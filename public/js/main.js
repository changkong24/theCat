(function(){
	require(["index"],function(Cat){
		var cat= new Cat("mainCanvas");
		window.onload = cat.init();
	})
})();