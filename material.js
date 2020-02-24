//对Color的一些基础操作
var Color = function (r, g, b) {
    this.r = r;
    this.g = g;
    this.b = b;
}

Color.prototype = {
    copy: function () {
        return new Color(this.r, this.g, this.b);
    },
    add: function (c) {
        return new Color(this.r + c.r, this.g + c.g, this.b + c.b);
    },
    multiply: function (s) {
        return new Color(this.r * s, this.g * s, this.b * s);
    },
    modulate: function (c) {
        return new Color(this.r * c.r, this.g * c.g, this.b * c.b);
    }
};

Color.black = new Color(0, 0, 0);
Color.white = new Color(1, 1, 1);
Color.red = new Color(1, 0, 0);
Color.green = new Color(0, 1, 0);
Color.blue = new Color(0, 0, 1);

//格子材质
var CheckerMaterial = function (scale, reflectiveness) {
    this.scale = scale;
    this.reflectiveness = reflectiveness;
};

CheckerMaterial.prototype = {
    sample: function (ray, position, normal) {
        return Math.abs((Math.floor(position.x * 0.1) + Math.floor(position.z *
            this.scale)) % 2) < 1 ? Color.black : Color.white;
    }
};

//Phong材质
var PhongMaterial = function (diffuse, specular, shininess, reflectiveness) {
    this.diffuse = diffuse;
    this.specular = specular;
    this.shininess = shininess;
    this.reflectiveness = reflectiveness;
}

//设置全局光源位置
// var lightPos = new Vector3(18, 10, 12);
// //var lightDir = new Vector3(1, 1, 1).normalize();
// var ambientlightColor = Color.white;

// //Blinn-Phong计算方法 k*I入射*（N点乘H)^ns
// PhongMaterial.prototype = {
//     sample: function (ray, position, normal) {
//         var lightDir = lightPos.subtract(position);
//         var NdotL = normal.dot(lightDir);
//         var H = (lightDir.subtract(ray.direction)).normalize();
//         var NdotH = normal.dot(H);
//         var diffuseTerm = this.diffuse.multiply(Math.max(NdotL, 0));
//         var specularTerm = this.specular.multiply(Math.pow(Math.max(NdotH, 0),
//             this.shininess));
//         //return lightColor.modulate(diffuseTerm.add(specularTerm));
//         var ksspecular  = specularTerm.multiply(0.2);
//         return diffuseTerm.multiply(0.3).add(ambientlightColor.multiply(0.5)).add(ksspecular);
//     }
// };

var lightDir = new Vector3(8, 10, 12).normalize();
var ambientlightColor = Color.white;
 
PhongMaterial.prototype = {
    sample: function(ray, position, normal) {
        var NdotL = normal.dot(lightDir);
        var H = (lightDir.subtract(ray.direction)).normalize();
        var NdotH = normal.dot(H);
        var diffuseTerm = this.diffuse.multiply(Math.max(NdotL, 0));

        var specularTerm = this.specular.multiply(Math.pow(Math.max(NdotH, 0), this.shininess));
        var ksspecular  = specularTerm.multiply(0.2);
        //return lightColor.modulate(diffuseTerm);
        return diffuseTerm.multiply(0.3).add(ambientlightColor.multiply(0.5)).add(ksspecular);
    }
};