//测试 绘制深度 取击中点的距离  深度映射

function renderDepth(canvas, scene, camera, maxDepth) {
    //获取canvas 准备绘制
    var ctx = canvas.getContext("2d");
    var w = canvas.width;
    var h = canvas.height;
    //var imagedata = ctx.createImageData(w, h);
    ctx.fillStyle = "rgb(0,0,0)";
    ctx.fillRect(0, 0, w, h);
    var imagedata = ctx.getImageData(0, 0, w, h);
    var pixels = imagedata.data;

    scene.initialize();
    camera.initialize();

    var i = 0;
    for (var y = 0; y < h; y++)
        for (var x = 0; x < w; x++) {
            //坐标归一化
            var sx = x / w;
            var sy = y / h;
            //发射光线
            var ray = camera.generateRay(sx, sy);
            //获得交点
            var result = scene.intersect(ray);
            //获得深度 转换到0-255
            //var depth = (result.distance / maxDepth) * 255;
            var depth = 255 - Math.min((result.distance / maxDepth) * 255, 255);
            if (result.geometry) {
                pixels[i] = depth;
                pixels[i + 1] = depth;
                pixels[i + 2] = depth;
                pixels[i + 3] = 255;
            }
            i += 4;
        }

    /*  
        另一种写法
        if (result.geometry) {
            pixels[i++] = depth;
            pixels[i++] = depth;
            pixels[i++] = depth;
            pixels[i++] = 255;
        } else {
            pixels[i++] = 0;
            pixels[i++] = 0;
            pixels[i++] = 0;
            pixels[i++] = 0;
        }
     
    */

    ctx.putImageData(imagedata, 0, 0);
    console.log('render ends');
}


//执行
renderDepth(
    document.getElementById("depthCanvas"),
    new Sphere(new Vector3(0, 10, -20), 10),
    new PerspectiveCamera(new Vector3(0, 10, 10), 90, new Vector3(0, 0, -1), new Vector3(0, 1, 0)),
    20);