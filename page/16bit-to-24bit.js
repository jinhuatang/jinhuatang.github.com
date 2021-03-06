var rgbs = [];
var width = 320;
var height = 240;
var img = document.getElementById('img');
function changeWidth(input){
    var w = input.value;
    w = parseInt(w);
    if(isNaN(w) || w < 1){
        input.value = 320;
        width = 320;
    }
    else{
        width = w;
    }
    img.style.width = width+'px';
}

function changeHeight(input){
    var h = input.value;
    h = parseInt(h);
    if(isNaN(h) || h < 1){
        input.value = 240;
        height = 240;
    }
    else{
        height = h;
    }
    img.style.height = height+'px';
}

function selectFile(target){
    var file = target.files[0];
    if(!file){
        return;
    }
    var reader = new FileReader();
    reader.readAsText(target.files[0], "UTF-8");
    reader.onload = loaded;
}
function loaded(evt) {
    var fileString = evt.target.result;
    rgbs = fileString.replace(/\r|\n/,'').split(',');
    run();
}
function run(){
    var draw = img.getContext('2d');
    draw.clearRect(0,0,width,height);
    var bitmap = draw.createImageData(width,height);
    for(var i = 0,index=0; i < rgbs.length; i=i+2,index++){
        var ui16_data = (parseInt(rgbs[i],16)<<8)+parseInt(rgbs[i+1],16);
        var r= ( ui16_data & 0xf800 )>>8;
        var g= ( ui16_data & 0x7e0 )>>3;
        var b= ( ui16_data & 0x1f )<<3;
        bitmap.data[index*4] = r;
        bitmap.data[index*4+1] = g;
        bitmap.data[index*4+2] = b;
        bitmap.data[index*4+3] = 0xFF;
    }
    draw.putImageData(bitmap,0,0);
}