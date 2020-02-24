//多物体 漫反射

//反射
function rayTraceRecursive(scene, ray, maxReflect) {
    var result = scene.intersect(ray);

    if (result.geometry) {
        var reflectiveness = result.geometry.material.reflectiveness;
        var color = result.geometry.material.sample(ray, result.position, result.normal);
        color = color.multiply(1 - reflectiveness);

        if (reflectiveness > 0 && maxReflect > 0) {
            var r = result.normal.multiply(-2 * result.normal.dot(ray.direction)).add(ray.direction);
            ray = new Ray(result.position, r);
            var reflectedColor = rayTraceRecursive(scene, ray, maxReflect - 1);
            color = color.add(reflectedColor.multiply(reflectiveness));
        }
        return color;
    } else
        return Color.black;
}



function rayTrace(canvas, scene, camera) {
    //获取canvas 准备绘制
    var ctx = canvas.getContext("2d");
    var w = canvas.width;
    var h = canvas.height;
    var imagedata = ctx.createImageData(w, h);
    var pixels = imagedata.data;

    scene.initialize();
    camera.initialize();

    var i = 0;
    for (var y = 0; y < h; y++)
        for (var x = 0; x < w; x++) {
            //坐标归一化
            var sx = x / w;
            var sy = 1 - y / h;
            //发射光线
            var ray = camera.generateRay(sx, sy);
            //获得交点
            var result = scene.intersect(ray);

            if (result.geometry) {
                var color = result.geometry.material.sample(ray, result.position, result.normal);
                var temp = new Vector3(color.r, color.g, color.b);
                var tpnormal = temp.normalize();
                pixels[i] = tpnormal.x * 255;
                pixels[i + 1] = tpnormal.y * 255;
                pixels[i + 2] = tpnormal.z * 255;
                pixels[i + 3] = 255;

                // pixels[i] = color.r * 255;
                // pixels[i + 1] = color.g * 255;
                // pixels[i + 2] = color.b * 255;
                // pixels[i + 3] = 255;
            }
            i += 4;
        }

    ctx.putImageData(imagedata, 0, 0);
}



var plane = new Plane(new Vector3(0, 1, 0), 0);
var sphere1 = new Sphere(new Vector3(-20, 50, -100), 5);
var sphere2 = new Sphere(new Vector3(60, 10, -20), 1);
plane.material = new CheckerMaterial(0.1);
sphere1.material = new PhongMaterial(Color.red, Color.white, 0.09);
sphere2.material = new PhongMaterial(Color.blue, Color.white, 32);
rayTrace(
    document.getElementById('materialCanvas'),
    new Union([plane, sphere1]), //new Union([plane,sphere1]),,, ,sphere1plane,sphere2
    new PerspectiveCamera(new Vector3(15, 10, 15), 90, new Vector3(0, 0, -1), new Vector3(0, 1, 0)));