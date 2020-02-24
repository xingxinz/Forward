//定义 光线(起点，方向)
var Ray = function (origin, direction) {
    this.origin = origin;
    this.direction = direction;
};
//获得交点 o+d*|t| 向量加，数乘
Ray.prototype = {
    getPoint: function (t) {
        return this.origin.add(this.direction.multiply(t));
    }
};


//定义透视投影相机 eye-起点 fov-视场角
var PerspectiveCamera = function (eye, fov, front, up) {
    this.eye = eye;
    this.fov = fov;
    this.front = front;
    this.refup = up;
};

PerspectiveCamera.prototype = {
    initialize: function () {
        this.right = this.front.cross(this.refup);
        this.up = this.right.cross(this.front);
        this.fovScale = 2 * Math.tan(this.fov * 0.5 * Math.PI / 180);
    },
    generateRay: function (x, y) {//把x,y从[0,1]换算到[-1,1]: (x-0.5)*2
        var u = this.right.multiply((x - 0.5) * this.fovScale);
        var v = this.up.multiply((y - 0.5) * this.fovScale);
        return new Ray(this.eye, this.front.add(u).add(v).normalize()); //归一化方向向量
    }
};