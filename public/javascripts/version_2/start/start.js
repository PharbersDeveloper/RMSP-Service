// (function($,w){
    var startScreenWidth = $(window).width();
    var startScreenHeight = $(window).height();
    function resetWrapperSize(){
        startScreenWidth = $(window).width();
        startScreenHeight = $(window).height() - 50;
        $(".start").width(startScreenWidth);
        $(".start").height(startScreenHeight);
    };
    var btn_1 = document.getElementById('btn_1');
    var btn_2 = document.getElementById('btn_2');
    var btn_3 = document.getElementById('btn_3');
    // var btn_4 = document.getElementById('btn_4');
    var btn_5 = document.getElementById('btn_5');
    var div_1 = document.getElementById("div_1");
    var div_2 = document.getElementById("div_2");
    var div_3 = document.getElementById("div_3");
    // var div_4 = document.getElementById("div_4");
    var div_5 = document.getElementById("div_5");
    var points = document.getElementById("buttons");
    var spans = document.getElementsByClassName("hit-point");

    var skip = document.getElementsByClassName("skip");
    var contentdiv = document.getElementsByClassName('content');
    var pointIndex = 0;
    var len = contentdiv.length;


// skip按钮的跳转
function skiplink() {
    window.location.href = "/takenew";
};
// 开始部署按钮逻辑
function goHomePage() {
    window.location.href = "/takenew";
};
// 设置z-index
    function set_zIndex(i) {
        for (var a = 0; a < len; a++) {
            contentdiv[a].style.zIndex = 1;
            contentdiv[a].style.opacity = 0;
        }
        if (0 < i && i < (len - 1)) {
            contentdiv[i].style.zIndex = 4;
            contentdiv[i].style.opacity = 1;
            contentdiv[i - 1].style.zIndex = 3;
            contentdiv[i - 1].style.opacity = 0.6;
            contentdiv[i + 1].style.zIndex = 3;
            contentdiv[i + 1].style.opacity = 0.6;
        } else if (i == 0) {
            contentdiv[i].style.zIndex = 4;
            contentdiv[i].style.opacity = 1;
            contentdiv[i + 1].style.zIndex = 3;
            contentdiv[i + 1].style.opacity = 0.6;
        } else if (i == len - 1) {
            contentdiv[i].style.zIndex = 4;
            contentdiv[i].style.opacity = 1;
            contentdiv[i - 1].style.zIndex = 3;
            contentdiv[i - 1].style.opacity = 0.6;
        }
    };
// 改变小圆点的样式
    function changeSpanStyle(index) {
        for (var i = 0; i < len; i++) {
            spans[i].classList.remove('on');
        }
        spans[index].classList.add('on');
        pointIndex = index;
    };

// first btn: btn_1
    function btn_1_click() {
        div_1.classList.add('scaledivstyle');
        div_1.classList.remove("rightbigger");
        div_1.style.opacity = 0.6;
        div_2.classList.add("origindivstyle");
        div_2.classList.remove("scaledivstyle", "rightsmaller", "originsmall");
        div_2.style.zIndex = 4;
        div_2.style.opacity = 1;
        div_3.classList.add("originsmall");
        div_3.style.zIndex = 3;
        div_3.style.opacity = 0.6;
        div_5.style.opacity = 0;
        changeSpanStyle(1);
    };

// second btn: btn_2
    function btn_2_click(){
        div_1.style.zIndex = 1;
        div_1.style.opacity = 0;
        div_2.classList.remove("rightbigger","origindivstyle");
        div_2.classList.add('scaledivstyle');
        div_2.style.zIndex = 3;
        div_2.style.opacity = 0.6;
        div_3.classList.remove("scaledivstyle", "rightsmaller", "originsmall")
        div_3.classList.add("origindivstyle");
        div_3.style.zIndex = 4;
        div_3.style.opacity = 1;
        div_5.classList.add("originsmall");
        div_5.style.zIndex = 3;
        div_5.style.opacity = 0.6;
        changeSpanStyle(2);
    };

// third btn:btn_3
//     function btn_3_click(){
//         div_1.style.zIndex = 1;
//         div_2.style.zIndex = 1;
//         div_3.style.zIndex = 3;
//         div_3.classList.remove("rightbigger");
//         div_3.classList.add('scaledivstyle');
//         div_4.classList.remove("scaledivstyle", "rightsmaller")
//         div_4.classList.add("origindivstyle");
//         div_4.style.zIndex = 4;
//         div_5.classList.add("originsmall");
//         div_5.style.zIndex = 3;
//         changeSpanStyle(3);
//     };
    // new third btn: btn_3
    function btn_3_click(){
        div_1.style.zIndex = 1;
        div_1.style.opacity = 0;
        div_2.style.zIndex = 1;
        div_2.style.opacity = 0;
        div_3.style.zIndex = 3;
        div_3.style.opacity = 0.6;
        div_3.classList.remove("rightbigger","origindivstyle");
        div_3.classList.add('scaledivstyle');
        div_5.classList.remove("scaledivstyle", "rightsmaller","originsmall")
        div_5.classList.add("origindivstyle");
        div_5.style.zIndex = 4;
        div_5.style.opacity = 1;
        // div_5.classList.add("originsmall");
        // div_5.style.zIndex = 3;
        changeSpanStyle(3);
};

// // fourth btn:btn_4
//     function btn_4_click(){
//         div_1.style.zIndex = 1;
//         div_2.style.zIndex = 1;
//         div_3.style.zIndex = 1;
//         div_4.style.zIndex = 3;
//         div_5.style.zIndex = 4;
//         div_4.classList.remove("rightbigger", "origindivstyle");
//         div_4.classList.add('scaledivstyle');
//         div_5.classList.remove("scaledivstyle", "rightsmaller")
//         div_5.classList.add("origindivstyle");
//         changeSpanStyle(4);
//     };

    window.onload = function() {
            resetWrapperSize();
            $(window).resize(function() {
                resetWrapperSize();
            });
        var len = contentdiv.length;

        // 判断当前显示的画面的index
        function getIndex() {
            for (var m = 0, len = spans.length; m < len; m++) {
                if (spans[m].className == "on") {
                    pointIndex = m;
                }
            }
        }
        //  小圆点逻辑的判断
        for (var i = 0; i < len; i++) {
            // console.log("for is running")
            (function(i) {
                spans[i].addEventListener("click", function() {
                    for (var x = 0; x < len; x++) {
                        if (spans[x].className == "hit-point on") {
                            pointIndex = x;
                        }
                    }
                    spans[i].classList.add("on");
                    contentdiv[i].classList.remove("rightbigger", "origindivstyle", "scaledivstyle", "originsmall", "rightsmaller");
                    set_zIndex(i);
                    if (i == 0) {
                        contentdiv[i].classList.add("rightbigger");
                        for (var m = 0; m < len; m++) {
                            if (m > i) {
                                contentdiv[m].classList.remove("rightbigger", "origindivstyle", "scaledivstyle","rightsmaller", "originsmall");
                                contentdiv[m].classList.add("rightsmaller");
                            }
                        }
                    } else if (i == 1) {
                        for (var n = 0; n < len; n++) {
                            if (n > i) {
                                contentdiv[n].classList.remove("rightbigger", "origindivstyle", "scaledivstyle", "rightsmaller","originsmall");
                                contentdiv[n].classList.add("originsmall");
                            } else if(n<i) {
                                contentdiv[n].classList.remove("rightbigger", "origindivstyle", "scaledivstyle", "rightsmaller", "originsmall");
                                contentdiv[n].classList.add("scaledivstyle");
                            }
                        }
                        if (pointIndex < i) {
                            contentdiv[i].classList.add("origindivstyle");
                            contentdiv[i + 1].classList.add("originsmall");
                        } else {
                            contentdiv[i].classList.add("rightbigger");
                            contentdiv[i + 2].style.zIndex = 2;
                            contentdiv[i + 1].classList.add("rightsmaller");
                        }
                    } else if (i == 2) {
                        for (var o = 0; o < len; o++) {
                            if (o > i) {
                                contentdiv[o].classList.remove("rightbigger", "origindivstyle", "scaledivstyle","rightsmaller","originsmall");
                                contentdiv[o].classList.add("originsmall");
                            } else if (o<i) {
                                contentdiv[o].classList.remove("rightbigger", "origindivstyle", "scaledivstyle", "rightsmaller", "originsmall");
                                contentdiv[o].classList.add("scaledivstyle");
                            }
                        }
                        console.log(pointIndex);
                        if (pointIndex < i) {
                            contentdiv[i].classList.add("origindivstyle");
                            contentdiv[i + 1].classList.add("originsmall");
                        } else {
                            contentdiv[i].classList.add("rightbigger");
                            contentdiv[i + 1].classList.remove("rightbigger", "origindivstyle", "scaledivstyle", "rightsmaller", "originsmall")
                            contentdiv[i + 1].classList.add("rightsmaller");
                        }
                    } else if (i == 3) {
                        // for (var p = 0; p < len; p++) {
                        //     if (p > i) {
                        //         contentdiv[p].classList.remove("rightbigger", "origindivstyle", "scaledivstyle", "rightsmaller");
                        //         contentdiv[p].classList.add("originsmall");
                        //     } else if (p < i) {
                        //         contentdiv[p].classList.remove("rightbigger", "origindivstyle", "scaledivstyle", "rightsmaller", "originsmall");
                        //         contentdiv[p].classList.add("scaledivstyle");
                        //     }
                        // }
                        // if (pointIndex < i) {
                        //
                        //     contentdiv[i].classList.add("origindivstyle");
                        //     contentdiv[i + 1].classList.add("originsmall");
                        // } else {
                        //     contentdiv[i].classList.add("rightbigger");
                        //     contentdiv[i + 1].classList.add("rightsmaller");
                        // }
                        for (s = 0; s < 3; s++) {
                            contentdiv[s].classList.remove("rightbigger", "origindivstyle", "rightsmaller", "originsmall");
                            contentdiv[s].classList.add("scaledivstyle");
                        }
                        contentdiv[i].classList.add("origindivstyle");
                    }
                    // else if (i == 4) {
                    //     for (s = 0; s < 4; s++) {
                    //         contentdiv[s].classList.remove("rightbigger", "origindivstyle", "rightsmaller", "originsmall");
                    //         contentdiv[s].classList.add("scaledivstyle");
                    //     }
                    //     contentdiv[i].classList.add("origindivstyle");
                    // }
                    for (var l = 0; l < len; l++) {
                        if (l != i) {
                            spans[l].classList.remove("on");
                        }
                    }
                })
            })(i)
        }
    }
// })(jQuery, window);
