define(["Module"],function(Module) {
    function Node(id, x, y, val) {
        this._id = id; //顶点id
        this._x = x; //顶点x坐标
        this._y = y; //顶点y坐标
        this._val = val; //顶点的值
        this.visited = false; //节点是否访问过
    }
    var _p_n = Node.prototype;
    /**
     * 获取节点的值
     * @return {[type]} [description]
     */
    _p_n.getVal = function() {
        return this._val;
    }
    /**
     * 获取节点的id
     * @return {[type]} [description]
     */
    _p_n.getId = function() {
        return this._id;
    }
    /**
     * 获取位置
     * @return {[type]} [description]
     */
    _p_n.getPosition = function() {
        return {
            x: this._x,
            y: this._y
        }
    }
    /**
     * 图
     * @param {[type]} nodes [description]
     */
    function Graph(nodes,module) {
        this._nodes = nodes; //图的所有节点
        this._matrix = []; //邻接矩阵
        this._tree = []; //遍历节点 生成可行路径树结构
        this._paths = []; //生成所有的路径
        //初始化邻接矩阵
        this.initMatrix();
        this._module = module;
    }
    var _p = Graph.prototype;
    /**
     * 获取邻接矩阵
     * @return {[type]} [description]
     */
    _p.getMatrix = function() {
        return this._matrix;
    }
    /**
     * 初始化邻接矩阵
     * @return {[type]} [description]
     */
    _p.initMatrix = function() {
        var nodes = this._nodes; //所有的顶点
        var len = nodes.length;
        for (var m = 0; m < len; m++) {
            this._matrix[m] = [];
            for (var n = 0; n < len; n++) {
                if (m != n && this._hasPath(nodes[m], nodes[n])) {
                    //m * n之间 有通道
                    this._matrix[m][n] = 1;
                } else { //没有通道
                    this._matrix[m][n] = 0;
                }
            }
        }
    }
    /**
     * 生成树结构
     * @return {[type]} [description]
     */
    _p.getTree = function() {
        return this._tree;
    }
    /**
     * 判断是否有路径 两节点相邻 并且值为1则有路径
     * @param  {[type]}  node1 [description]
     * @param  {[type]}  node2 [description]
     * @return {Boolean}       [description]
     */
    _p._hasPath = function(node1, node2) {
        if (node1.getVal() == Module.EMPTY && node2.getVal() == Module.EMPTY) {
            var pos1 = node1.getPosition(),
                pos2 = node2.getPosition();
            if (this._isNab(pos1, pos2)) {
                return true;
            } else {
                return false;
            }
        } else {
            return false;
        }
    }
    /**
     * 判断是不是相邻
     * @param  {[type]}  obj1 [description]
     * @param  {[type]}  obj2 [description]
     * @return {Boolean}      [description]
     */
    _p._isNab = function(obj1, obj2) {
        var x1 = obj1.x,
            y1 = obj1.y,
            x2 = obj2.x,
            y2 = obj2.y;
        //普通矩阵
        // if (x1 == x2 && (y1 == y2 - 1 || y1 == y2 + 1)) { //一横排
        //     return true; //相邻
        // } else if (y1 == y2 && (x1 == x2 - 1 || x1 == x2 + 1)) { //一竖排
        //     return true;
        // } else if (x1 == x2 - 1 && (y1 == y2 - 1 || y1 == y2 + 1)) { //斜排
        //     return true;
        // } else if (x1 == x2 + 1 && (y1 == y2 - 1 || y1 == y2 + 1)) { //斜排
        //     return true;
        // }
        //神经猫矩阵
         //偶数行
        if(x1 == x2 && (y1 == y2 -1 || y1 == y2 + 1)){
            return true;
        }
        if(y1 == y2 && (x1 == x2 -1 || x1 == x2 + 1)){
            return true;
        }
        if(y1 % 2 ==0){
            if(x1 == x2 + 1 && (y1 == y2 -1 || y1 == y2 + 1)){
                return true;
            }
        }
        if(y1 % 2 != 0){
            if(x1 == x2 - 1 && (y1 == y2 -1 || y1 == y2 + 1)){
                return true;
            }
        }
        return false;
    }
    /**
     * 遍历可行路径节点 生成可行路径树
     * @param  {[type]} stratNode [description]
     * @return {[type]}           [description]
     */
    _p.buildTree = function(startNode) {
        var queue = []; //队列
        queue.push({
            prev: null,
            node: startNode,
            next: [] //后继节点
        }); //添加到队尾  prev：前驱节点  node：当前节点 next 下级节点
        while (queue.length > 0) {
            var st = queue.shift();
            if (!this._hasPush(this._tree, st)) { //如果数组中不存在
                this._tree.push(st); //将节点添加到树
                st.prev && st.prev.next.push(st);
            } //路径
            if (!st.node.visited) {
                // console.log("Visited vertex: " + st..getId());
            }
            st.node.visited = true; //节点被访问过
            var that = this;
            this._nodes.forEach(function(node) {
                if (that._matrix[st.node.getId()][node.getId()] == 1 && node.visited == false) {
                    //有边 添加到下一个节点
                    queue.push({
                        prev: st,
                        node: node,
                        next: []
                    });
                }
            });
        }
    }
    /**
     * 从开始到结束点生成最短路径
     * @param  {[type]} stratNode [description]
     * @param  {[type]} endeNode  [description]
     * @return {[type]}           [description]
     */
    _p.getTree = function() {
        return this._tree;
    }
    /**
     * 从某一个节点出去到所有节点的路径
     * @param  {[type]} startNode [description]
     * @return {[type]}           [description]
     */
    _p.buildPaths = function(startNode) {
        this.buildTree(startNode); //生成最小树
        var tree = this.getTree(); //获取最小树
        var len = tree.length;
        var roads = 0;
        for (var i = 0; i < len; i++) {
            if (this._isSilde(tree[i].node)) {//只要是终结点即可回溯路径
                //叶子节点
                this._paths[roads] = [];
                this._getPrevPath(tree[i], roads);
                roads++;
            }
        }
    }
    /**
     * 获取包围后的路径
     * @param  {[type]} startNode [description]
     * @return {[type]}           [description]
     */
    _p.buildCoverPaths = function(startNode){
        this.buildTree(startNode); //生成最小树
        var tree = this.getTree(); //获取最小树
        var len = tree.length;
        var roads = 0;
        for (var i = 0; i < len; i++) {
            if (tree[i].next.length == 0) {//最大通路
                //叶子节点
                this._paths[roads] = [];
                this._getPrevPath(tree[i], roads);
                roads++;
            }
        }
    }
    /**
     * 是否是边界
     * @param  {[type]}  node [description]
     * @return {Boolean}      [description]
     */
    _p._isSilde = function(node){
        var pos = node.getPosition();
        var x = pos.x;
        var y = pos.y;
        if(x == 0 || y == 0){return true;}
        else if(x == this._module.getCells() - 1 || y == this._module.getCells() - 1){return true;}
        return false;
    }
    /**
     * 获取所有的路径
     * @param  {[type]} node [description]
     * @return {[type]}      [description]
     */
    _p._getPrevPath = function(node, roads) {
        if (node.prev != null) {
            this._paths[roads].push(node)
            this._getPrevPath(node.prev, roads);
        }
    }
    /**
     * 获取路径
     * @return {[type]} [description]
     */
    _p.getPath = function() {
        return this._paths;
    }
    /**
     * 判断数组中是否存在
     * @param  {[type]}  queue [description]
     * @param  {[type]}  obj   [description]
     * @return {Boolean}       [description]
     */
    _p._hasPush = function(queue, obj) {
        var len = queue.length;
        for (var i = 0; i < len; i++) {
            if (queue[i].node.getId() == obj.node.getId()) {
                return true;
            }
        }
        return false;
    }
    return {
    	Graph: Graph,
    	Node: Node
    };
})
