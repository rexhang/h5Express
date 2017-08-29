var items = '';

for(var i = 0; i < 100; i++){
    items += "<div class='rex-fl item'></div>";
}

var count = 0;

// 默认位置
var defConfig = {
    x: 5,
    y: 3
}

var touchedGroup = [];

var touchedXYGroup = [];

// 运动重合、溢出屏幕重新定向
function resetXy(){

}

// 算出障碍物的坐标
function getXY(index){
    var indexConfig = {};
    var step = 10;
    if(index <= step){
        indexConfig.indexX = index - 1;
        indexConfig.indexY = 0;
    }
    if(index > step && index <= step*2){
        indexConfig.indexX = index - 1 - step*1;
        indexConfig.indexY = 1;
    }
    if(index > step*2 && index <= step*3){
        indexConfig.indexX = index - 1 - step*2;
        indexConfig.indexY = 2;
    }

    if(index > step*3 && index <= step*4){
        indexConfig.indexX = index - 1 - step*3;
        indexConfig.indexY = 3;
    }

    if(index > step*4 && index <= step*5){
        indexConfig.indexX = index - 1 - step*4;
        indexConfig.indexY = 4;
    }

    if(index > step*5 && index <= step*6){
        indexConfig.indexX = index - 1 - step*5;
        indexConfig.indexY = 5;
    }

    if(index > step*6 && index <= step*7){
        indexConfig.indexX = index - 1 - step*6;
        indexConfig.indexY = 6;
    }

    if(index > step*7 && index <= step*8){
        indexConfig.indexX = index - 1 - step*7;
        indexConfig.indexY = 7;
    }

    if(index > step*8 && index <= step*9){
        indexConfig.indexX = index - 1 - step*8;
        indexConfig.indexY = 8;
    }

    if(index > step*9 && index <= step*10){
        indexConfig.indexX = index - 1 - step*9;
        indexConfig.indexY = 9;
    }
    return indexConfig;
}

// 随机移动
function randomMove(index){
    touchedGroup.push(index);

    var indexXy = getXY(index)
    console.warn(indexXy)

    touchedXYGroup.push(indexXy);

    var cat = jQuery('#cat');
    // 获取当前的坐标，随机移动x或者y坐标1个单位
    var touchDom = cat.eq(index);

    var resNumber = Math.round(Math.random()); // 生成0或者1的随机数，0代表x，1代表y

    var resNumberadd = Math.round(Math.random()); // 生成0或者1的随机数，0代表+，1代表-

    randomSet()
    function randomSet(){
        if(resNumber === 0){
            console.log('resNumber=0')
            if(resNumberadd === 0){
                console.log('resNumberadd=0')
                defConfig.x = defConfig.x + 1;
            } else{
                console.log('resNumberadd!=0')
                defConfig.x = defConfig.x - 1;
            }
        } else{
            console.log('resNumber!=0')
            if(resNumberadd === 0){
                console.log('resNumberadd=0')
                defConfig.y = defConfig.y + 1;
            } else{
                console.log('resNumberadd!=0')
                defConfig.y = defConfig.y - 1;
            }
        }
    }

    // 重合检测
    for(var k = 0; k < touchedXYGroup.length; k++){
        if( (defConfig.x === touchedXYGroup[k].indexX) && (defConfig.y === touchedXYGroup[k].indexY) ){
            layer.msg('重合啦,GameOver！~')
            jQuery('.item').unbind('touchstart');
        }
    }

    // 溢出屏幕检测
    if(defConfig.x > 9 || defConfig.x < 0 || defConfig.y > 9 || defConfig.y < 0){
        layer.msg('溢出屏幕啦,GameOver！~')
        jQuery('.item').unbind('touchstart');
    }


    cat.css({
        left: defConfig.x + 'rem',
        top: defConfig.y + 'rem'
    })





    console.log('index: ' + index);
    console.log('x?or?y: ' + resNumber);
    console.log('+or-: ' + resNumberadd)
    console.log(defConfig)
    console.log(touchedGroup)
    console.log(touchedXYGroup)
}


function init(){
    jQuery('#wrap').append(items);

    jQuery('.item').bind('touchstart', function(){

        if(!jQuery(this).hasClass('touched')){
            jQuery(this).addClass('touched');
            var _index = jQuery(this).index();
            count = count+1;
            console.log(count)
            jQuery('#steps').text(count)
            randomMove(_index)
        }

    })
}


window.onload = init;