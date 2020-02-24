//基础操作 
//三维向量
var Vector3 = function (x, y, z) {
    this.x = x;
    this.y = y;
    this.z = z;
}
//向量基本运算：复制，求模，求单位向量，求方向相反向量，加减除,树乘，点乘，叉乘
//通过原型函数共享函数
Vector3.prototype = {
    copy: function () {
        return new Vector3(this.x, this.y, this.z);
    },
    length: function () {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    },
    sqrLength: function () {
        return this.x * this.x + this.y * this.y + this.z * this.z;
    },
    normalize: function () {
        var inv = 1 / this.length();
        return new Vector3(this.x * inv, this.y * inv, this.z * inv);
    },
    negate: function () {
        return new Vector3(-this.x, -this.y, -this.z);
    },
    add: function (v) {
        return new Vector3(this.x + v.x, this.y + v.y, this.z + v.z);
    },
    subtract: function (v) {
        return new Vector3(this.x - v.x, this.y - v.y, this.z - v.z);
    },
    multiply: function (p) {
        return new Vector3(this.x * p, this.y * p, this.z * p);
    },
    divide: function (p) {
        var invp = 1 / p;
        return new Vector3(this.x * invp, this.y * invp, this.z * invp);
    },
    dot: function (v) {
        return this.x * v.x + this.y * v.y + this.z * v.z;
    },
    cross: function (v) {
        return new Vector3(-this.z * v.y + this.y * v.z, this.z * v.x - this.x * v.z, -this.y * v.x + this.x * v.y);
    }
}
//用作常量 避免每次重新构建零向量
Vector3.zero = new Vector3(0,0,0);