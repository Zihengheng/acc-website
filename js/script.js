$( document ).ready(function() {
 
    $('#inbox2-tab li:eq(0) a').tab('show');
    $('#inbox3-tab li:eq(0) a').tab('show');
    $('#rsk-tab a[href="#coso"]').tab('show');
    $('#org-nav a[href="#gltz"]').tab('show');
    $('#book-title a[href="#qikan"]').tab('show');
    $('#org-nav a[href="#gltz"]').tab('show');
 
});

$(function(){

    // $.tab(".section-org", ".org-tab li", "cur", ".hot-con", "active", "mousedown");

    //轮播
    var videoScroll1 = new LScroll();
    videoScroll1.dom = $(".books .book-list");
    videoScroll1.speed = 5000;
    $("img.go-left1").click(function () { videoScroll1.prev(); });
    $("img.go-right1").click(function () { videoScroll1.next(); });
    videoScroll1.tabmarq(0, 0, 1);

    var videoScroll2 = new LScroll();
    videoScroll2.dom = $(".books .book-list1");
    videoScroll2.speed = 5000;
    $("img.go-left2").click(function () { videoScroll2.prev(); });
    $("img.go-right2").click(function () { videoScroll2.next(); });
    videoScroll2.tabmarq(0, 0, 1);

    var videoScroll2 = new LScroll();
    videoScroll2.dom = $(".books .book-list2");
    videoScroll2.speed = 5000;
    $("img.go-left3").click(function () { videoScroll2.prev(); });
    $("img.go-right3").click(function () { videoScroll2.next(); });
    videoScroll2.tabmarq(0, 0, 1);


});
/*--轮播 start--*/
var LScroll = function () {
    var LScroll = function () {
        return LScroll.fn.init();
    };
    LScroll.fn = LScroll.prototype = {
        init: function () {
            return this;
        },
        speed: 100,
        pwidth: 1000,
        positive: true,
        dom: null
    };
    var timer, isAct = false, maxlen = 0, curpose, curno = 0, anim;

    function scrollInit(mode) {
        curpose = LScroll.fn.positive;
        if (mode == 1) {
            LScroll.fn.dom.find("li").each(function () {
                maxlen += $(this).height();
            });
            LScroll.fn.dom.css("height", maxlen);
        }
        else {
            LScroll.fn.dom.find("li").each(function () {
                maxlen += $(this).width();
            });
            LScroll.fn.dom.css("width", maxlen);
        }
    }

    function move() {
        LScroll.fn.dom.hover(function () {
            stop();
        }, function () {
            curpose = LScroll.fn.positive;
            start();
        });
    }

    function start() {
        if (isAct) return;
        isAct = true;
        timer = setInterval(anim, LScroll.fn.speed);
    }

    function stop() {
        isAct = false;
        clearInterval(timer);
    }

    LScroll.fn.prev = function () {
        stop();
        curpose = true;
        anim();
        start();
    };
    LScroll.fn.next = function () {
        stop();
        curpose = false;
        anim();
        start();
        curpose = true;
    }; //此处将滑动顺序恢复默认
    LScroll.fn.reset = function () {
        stop();
        LScroll.fn.dom.unbind("mouseenter").unbind("mouseleave");
    };
    //轮播图效果，无缝滚动 mode-0:左右，1：上下 startno-置为0，实现无缝 tabnum-每次滚动个数
    LScroll.fn.tabmarq = function (mode, startno, tabnum) {
        tabnum = tabnum == null ? 1 : tabnum;
        startno = startno == null ? 0 : startno;
        scrollInit(mode);
        anim = function () {
            if (curpose) { //先移动动画，结束后将第一个元素移动到最后
                mode == 1 ? LScroll.fn.dom.animate({ top: 0 - $(LScroll.fn.dom.find("li").get(startno)).height() * tabnum }, "slow", function () {
                    LScroll.fn.dom.append(LScroll.fn.dom.find("li").slice(startno, startno + tabnum));
                    LScroll.fn.dom.css({ top: 0 });
                }) : LScroll.fn.dom.animate({ left: 0 - $(LScroll.fn.dom.find("li").get(startno)).width() * tabnum }, "slow", function () {
                    LScroll.fn.dom.append(LScroll.fn.dom.find("li").slice(startno, startno + tabnum));
                    LScroll.fn.dom.css({ left: 0 });
                });
            }
            else { //先将最后一个元素移动到最前面，然后移动动画
                $(LScroll.fn.dom.find("li").get(startno)).before(LScroll.fn.dom.find("li").slice(LScroll.fn.dom.find("li").length - tabnum, LScroll.fn.dom.find("li").length));
                mode == 1 ? LScroll.fn.dom.css({ top: 0 - $(LScroll.fn.dom.find("li").get(startno)).height() * tabnum }) : LScroll.fn.dom.css({ left: 0 - $(LScroll.fn.dom.find("li").get(startno)).width() * tabnum });
                mode == 1 ? LScroll.fn.dom.animate({ top: 0 }, "slow") : LScroll.fn.dom.animate({ left: 0 }, "slow");
            }
        };
        isAct = true;
        timer = setInterval(anim, this.speed);
        move();
    };
    //跑马灯效果，不能实现无缝滚动 mode-0:左右，1：上下 plen-每次移动像素
    LScroll.fn.marquee = function (mode, plen) {
        scrollInit(mode);
        anim = function () {
            if (mode == 1) {
                var wdt = LScroll.fn.dom.position().top;
                //wdt + maxlen < 0 && (wdt = plen);
                LScroll.fn.dom.css("top", wdt - plen);
            }
            else {
                var wdt = LScroll.fn.dom.position().left;
                //wdt + maxlen < 0 && (wdt = plen);
                LScroll.fn.dom.css("left", wdt - plen);
            }
        };
        isAct = true;
        timer = setInterval(anim, this.speed);
        move();
    };
    LScroll.fn.fade = function (startno, numdom) {
        curno = startno = startno == null ? 0 : startno;
        curno++;
        scrollInit(1);
        if (numdom && numdom.length) {
            numdom.hover(function () { LScroll.fn.reset(); }, function () { move(); });
            numdom.find("li").click(function () {
                curno = $(this).index();
                anim();
            });
        }
        anim = function () {
            curno = curno < LScroll.fn.dom.find("li").length - startno ? curno : startno;
            if (numdom && numdom.length) {
                numdom.find(".on").removeClass("on");
                numdom.find("li").eq(curno).addClass("on");
            }
            LScroll.fn.dom.fadeOut(500, function () {
                LScroll.fn.dom.css({ top: 0 - $(LScroll.fn.dom.find("li").get(startno)).height() * curno });
                curno++;
            }).fadeIn(1000);
        };
        isAct = true;
        timer = setInterval(anim, this.speed);
        move();
    };
    return LScroll();
};
/*--轮播 end--*/