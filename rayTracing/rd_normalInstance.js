//法向量 映射
function renderNormal(canvas, scene, camera) {
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
            var sy = y / h;
            //发射光线
            var ray = camera.generateRay(sx, sy);
            //获得交点
            var result = scene.intersect(ray);

            if (result.geometry) {
                pixels[i] = (result.normal.x + 1) * 128;
                pixels[i + 1] = (result.normal.y + 1) * 128;
                pixels[i + 2] = (result.normal.z + 1) * 128;
                pixels[i + 3] = 255;
            }
            i += 4;
        }
    ctx.putImageData(imagedata, 0, 0);
}

renderNormal(
    document.getElementById('normalCanvas'),
    new Sphere(new Vector3(0, 10, -10), 2),
    new PerspectiveCamera(new Vector3(0, 10, 10), 90, new Vector3(0, 0, -1), new Vector3(0, 1, 0)),
    20);