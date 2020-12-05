//获取canvas元素
var canv=document.getElementById("canvas");
    ctx=canv.getContext("2d");

ctx.save(); 
//尾巴
ctx.moveTo(433,458);
ctx.lineTo(477,438);
ctx.bezierCurveTo(492,433,496,453,484,463);
ctx.lineTo(433,494);
ctx.lineWidth=10; 
ctx.strokeStyle="#33190c";
ctx.fillStyle="#ffffd9";
ctx.stroke();
ctx.fill();
//身体
ctx.beginPath();
ctx.moveTo(255, 392);
ctx.lineTo(255, 526);
ctx.bezierCurveTo(256,555,282,557,293,530);
ctx.lineTo(383, 530);
ctx.bezierCurveTo(392,557,419,558,428,526);
ctx.quadraticCurveTo(434, 523, 430, 393);		
ctx.stroke();
ctx.fill();
//耳朵
ctx.beginPath();
ctx.lineWidth=6;
ctx.moveTo(106, 79);
ctx.quadraticCurveTo(114, 4, 209, 14);
ctx.stroke();
ctx.fill();

ctx.beginPath();
ctx.lineWidth=7;
ctx.moveTo(376, 14);
ctx.quadraticCurveTo(431, 13, 446, 15);
ctx.quadraticCurveTo(488, 20, 498, 48);
ctx.quadraticCurveTo(508, 75, 512, 110);
ctx.stroke();
ctx.fill();
//头
ctx.beginPath();
ctx.moveTo(280, 6);
ctx.bezierCurveTo(476, 0, 535, 154, 541, 166);
ctx.lineTo(546, 180);
ctx.bezierCurveTo(584, 304, 530, 368, 432, 392);
ctx.quadraticCurveTo(210, 460, 90, 372);		
ctx.quadraticCurveTo(38, 324, 34, 314);
ctx.quadraticCurveTo(1, 268, 38, 174);
ctx.quadraticCurveTo(128, 8, 280, 6);
ctx.lineWidth=14; 
ctx.stroke();
ctx.fill();
ctx.restore();
//胡须
ctx.beginPath();
ctx.moveTo(6, 212);
ctx.lineTo(23, 212);
ctx.lineWidth=5; 
ctx.stroke();

ctx.beginPath();
ctx.moveTo(2, 246);
ctx.lineTo(15, 246);
ctx.stroke();

ctx.beginPath();
ctx.moveTo(6, 284);
ctx.lineTo(17, 281);
ctx.stroke();

ctx.beginPath();
ctx.moveTo(529, 233);
ctx.lineTo(596, 246);
ctx.stroke();

ctx.beginPath();
ctx.moveTo(525, 263);
ctx.lineTo(587, 290);
ctx.stroke();

ctx.beginPath();
ctx.moveTo(523, 296);
ctx.lineTo(581, 331);
ctx.stroke();
//眉毛
ctx.beginPath();
ctx.moveTo(156, 40);
ctx.lineTo(178, 42);
ctx.stroke();

ctx.beginPath();
ctx.moveTo(374, 54);
ctx.lineTo(395, 56);
ctx.stroke();
//腮红
ctx.beginPath();
ctx.moveTo(71, 205);
ctx.lineTo(65, 212);
ctx.stroke();

ctx.beginPath();
ctx.moveTo(88, 205);
ctx.lineTo(82, 212);
ctx.stroke();

ctx.beginPath();
ctx.moveTo(448, 218);
ctx.lineTo(443, 224);
ctx.stroke();

ctx.beginPath();
ctx.moveTo(466, 218);
ctx.lineTo(460, 225);
ctx.stroke();

ctx.beginPath();
ctx.moveTo(482, 220);
ctx.lineTo(475, 228);
ctx.stroke();
//眼睛
ctx.beginPath();
ctx.moveTo(129, 140);
ctx.bezierCurveTo(206, 118, 215, 204, 172, 226);
ctx.bezierCurveTo(92, 249, 85, 165, 129, 140);
ctx.fillStyle="#33190c";
ctx.stroke();
ctx.fill();

ctx.beginPath();
ctx.moveTo(332, 154);
ctx.bezierCurveTo(421, 108, 462, 208, 407, 240);
ctx.bezierCurveTo(357, 279, 264, 214, 332, 154);
ctx.fillStyle="#33190c";
ctx.stroke();
ctx.fill();
//瞳孔
ctx.beginPath();
ctx.moveTo(177, 151);
ctx.bezierCurveTo(190, 152, 183, 166, 177, 164);
ctx.bezierCurveTo(168, 164, 168, 152, 177, 151);
ctx.fillStyle="#fff";
ctx.stroke();
ctx.fill();

ctx.beginPath();
ctx.moveTo(393, 154);
ctx.bezierCurveTo(406, 155, 402, 171, 393, 169);
ctx.bezierCurveTo(384, 169, 382, 155, 393, 154);
ctx.fillStyle="#fff";
ctx.stroke();
ctx.fill();
//鼻子
ctx.beginPath();
ctx.moveTo(237, 220);
ctx.bezierCurveTo(237, 209, 254, 209, 254, 220);
ctx.bezierCurveTo(254, 231, 238, 231, 237, 220);
ctx.fillStyle="#33190c";
ctx.stroke();
ctx.fill();

ctx.beginPath();
ctx.moveTo(218, 229);
ctx.bezierCurveTo(222, 241, 239, 243, 245, 226);
ctx.bezierCurveTo(254, 245, 279, 244, 285, 234);
ctx.stroke();
//爱心
ctx.beginPath();
ctx.moveTo(98, 376);
ctx.bezierCurveTo(70, 301, 156, 194, 246, 303);
ctx.bezierCurveTo(403, 197, 476, 345, 424, 402);
ctx.quadraticCurveTo(375, 475, 260, 528);		
ctx.quadraticCurveTo(247, 536, 225, 526);
ctx.quadraticCurveTo(130, 463, 98, 376);
ctx.lineWidth=14;
ctx.fillStyle="#fe0000";
ctx.stroke();
ctx.fill();
//手
ctx.beginPath();
ctx.moveTo(98, 377);
ctx.bezierCurveTo(137, 367, 128, 417, 113, 415);
ctx.bezierCurveTo(97, 418, 74, 390, 98, 377);
ctx.lineWidth=10;
ctx.fillStyle="#fff";
ctx.stroke();
ctx.fill();

ctx.beginPath();
ctx.moveTo(390, 434);
ctx.bezierCurveTo(358, 407, 392, 366, 427, 388);
ctx.quadraticCurveTo(416, 409, 393, 435);
ctx.lineTo(390, 434);
ctx.fillStyle="#fff";
ctx.closePath();
ctx.stroke();
ctx.fill();