$( document ).ready(function() {
 
    $('#inbox2-tab li:eq(0) a').tab('show');
    $('#inbox3-tab li:eq(0) a').tab('show');
    $('#rsk-tab a[href="#coso"]').tab('show');
    $('#org-nav a[href="#gltz"]').tab('show');
    $('#book-title a[href="#qikan"]').tab('show');
    $('#org-nav a[href="#gltz"]').tab('show');
 
});
//图书轮播
$(function(){
  var $nextBtn = $('img .go-left');
  var $preBtn = $('img .go-right');
  var $imgContent = $('ul.book-list');
  var $img = $('ul.book-list li');
  var imgWidth = $img.width();
  var imgCount = $img.length;
  var $bullets = $('.bullet>li');

  var pageIndex = 0;

  var isAnimate = false;

  // 将第一张图片克隆到最后
  $imgContent.append($img.first().clone());
  // 将最后一张图片克隆到最前
  $imgContent.prepend($img.last().clone());

  // 动态设置img-content容器的宽度
  $imgContent.width((imgCount + 2) * imgWidth);

  // 将原始照片放置在正确位置
  $imgContent.css({ left: -imgWidth });

  $nextBtn.click(function() {
    playNext(1);
  });

  $preBtn.click(function() {
    playPre(1);
  });

  $bullets.click(function() {
    $this = $(this);
    var bulletIndex = $this.index();
    if (bulletIndex > pageIndex) {
      playNext(bulletIndex - pageIndex);
    } else if (bulletIndex < pageIndex) {
      playPre(pageIndex - bulletIndex);
    }
    clearInterval(auto);
  });

  function playNext(len) {
    if (isAnimate) return;
    isAnimate = true;
    $imgContent.animate({
      left: '-=' + len * imgWidth
    }, function() {
      pageIndex += len;
      if (pageIndex == imgCount) {
        pageIndex = 0;
        $imgContent.css({ left: -imgWidth }).fadeIn('slow');
      }
      setBullet();

      isAnimate = false;
    });
  }

  function playPre(len) {
    $imgContent.animate({
      left: '+=' + len * imgWidth
    }, function() {
      pageIndex -= len;
      if (pageIndex < 0) {
        pageIndex = imgCount - 1;
        $imgContent.css({ left: -imgWidth * imgCount });
      }
      setBullet();
    });
  }

  function setBullet() {
    $bullets.removeClass('active').eq(pageIndex).addClass('active');
  }

  // 设置自动轮播
    autoPlay =   setInterval(function() {
    playNext(1);
  }, 2000);
});