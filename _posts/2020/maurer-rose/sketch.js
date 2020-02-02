// Boilerplate, gotta be somewhere, right?
document.body.outerHTML = ''; // Strips the page of its stuff, in case you just want to paste this into the console in a new tab or really anywhere.
const canv = document.createElement('canvas');
canv.width = 800;
canv.height = 800;
document.body.appendChild(canv);
const ctx = canv.getContext('2d');

// Alright, rose time.
let n = 6, d = 71; // These can be any combination, but this one is nice.

ctx.beginPath();
ctx.lineWidth = 0.5;
ctx.strokeStyle = 'blue';
for (let theta = 0; theta <= 360 /* we're working with degrees, remember? */; theta++){
    let k = theta * d * Math.PI / 180;
    let r = 300 * Math.sin(n * k);
    let x = r * Math.cos(k) + canv.width/2;
    let y = r * Math.sin(k) + canv.height/2;
    ctx.lineTo(x, y);
    ctx.moveTo(x, y);
}
ctx.stroke();
ctx.beginPath();
ctx.lineWidth = 4;
ctx.strokeStyle = 'red';
for (let theta = 0; theta <= 360; theta++){
    let k = theta * Math.PI / 180;
    let r = 300 * Math.sin(n * k);
    let x = r * Math.cos(k) + canv.width/2;
    let y = r * Math.sin(k) + canv.height/2;
    ctx.lineTo(x, y);
    ctx.moveTo(x, y);
}
ctx.stroke();