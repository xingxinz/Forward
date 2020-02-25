//画板 按像素设置颜色
var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

var w = canvas.width;
var h = canvas.height;
// //清理画板
ctx.fillStyle = "rgb(1,1,0)";
ctx.fillRect(0, 0, w, h);

var imgdata = ctx.createImageData(w,h); //ctx.getImageData(0, 0, w, h);
var pixels = imgdata.data;
var i = 0;
// //按像素填充 r/g/b/a
for (var y = 0; y < h; y++)
    for (var x = 0; x < w; x++)
    {
        pixels[i++] = x / w * 255;
        pixels[i++] = y / h * 255;
        pixels[i++] = 0;
        pixels[i++] = 255;
    }
ctx.putImageData(imgdata, 0, 0);