//定义基本几何体物体 
//球体 （球心、半径）
var Sphere = function (center, radius) {
    this.center = center;
    this.radius = radius;
};


//与光线求最近的交点 画几何图 可发现半径向量与交点向量直接满足如下关系：
// (o-c)向量+（td）向量  = r向量 即 |c + td| = |r|
// 求解可以根据求根公式，若根号为负数则不相交 
Sphere.prototype = {
    initialize: function () {
        this.sqrRadius = this.radius * this.radius;
    }, //预计算了球体半径r的平方，此为一个优化

    intersect: function (ray) {
        var v = ray.origin.subtract(this.center);
        var a0 = v.sqrLength() - this.sqrRadius;
        var DdotV = ray.direction.dot(v);
        if (DdotV <= 0) {
            var discr = DdotV * DdotV - a0;
            if (discr >= 0) {
                var result = new InterSectResult(); //记录负载
                result.geometry = this;
                result.distance = -DdotV - Math.sqrt(discr);
                result.position = ray.getPoint(result.distance);
                result.normal = result.position.subtract(this.center).normalize();
                return result;
            }
        }
        return InterSectResult.noHit;
    }
};

//IntersectResult 
//记录交点的几何物件(geometry)、距离(distance)、位置(position)和法向量(normal)
//IntersectResult.noHit的geometry为null，代表光线没有和任何几何物件相交。
var InterSectResult = function () {
    this.geometry = null;
    this.distance = 0;
    this.position = Vector3.zero;
    this.normal = Vector3.zero;
};

InterSectResult.noHit = new InterSectResult();

//平面 n为平面的法向量，d为空间原点至平面的最短距离
var Plane = function (normal, d) {
    this.normal = normal;
    this.d = d;
};

Plane.prototype = {
    initialize: function () {
        this.position = this.normal.multiply(this.d);
    },
    intersect: function (ray) {
        //向量角度判断是否相交
        var a = ray.direction.dot(this.normal);
        if (a >= 0) {
            return InterSectResult.noHit;
        }

        var b = this.normal.dot(ray.origin.subtract(this.position));
        var result = new InterSectResult();
        result.geometry = this;
        result.distance = -b / a; //根据投影公式 消去夹角θ
        result.position = ray.getPoint(result.distance);
        result.normal = this.normal;
        return result;
    }
};

//并集 光线要找到一组几个图形的 最近交点
var Union = function (geometries) {
    this.geometries = geometries;
};

Union.prototype = {
    initialize: function () {
        for (var i in this.geometries)
            this.geometries[i].initialize();
    },
    intersect: function (ray) {
        var minDistance = Infinity;
        var minResult = InterSectResult.noHit;
        for (var i in this.geometries) {
            var result = this.geometries[i].intersect(ray);
            if (result.geometry && result.distance < minDistance) {
                minDistance = result.distance;
                minResult = result;
            }
        }
        return minResult;
    }
};
