$(function(){
  "use strict";
  var $body = (window.chrome || 'WebkitAppearance' in document.documentElement.style) ? $('body') : $('html');
  //var $body = $('body');
  console.info($body);
  var $window =$(window);
  var $detailBtn = $(".detail-btn");
  var $closeBtn = $(".close-btn");
  var resizeTimer = false;
  var $profile = $("#profile");
  var $works = $("#works");
  var $secondBg = $("#secondBg");
  var bgcount = 0;

  if(navigator.userAgent.match(/MSIE 10/i) || navigator.userAgent.match(/Trident\/7\./) || navigator.userAgent.match(/Edge\/12\./)) {
    $('body').on("mousewheel", function () {
      event.preventDefault();
      var wd = event.wheelDelta;
      var csp = window.pageYOffset;
      window.scrollTo(0, csp - wd);
    });
  }

  /* フォント読み込み完了後にアニメーションスタート */
  if (typeof MutationObserver !== 'undefined') {
    var $html = $("#html");
    var observer = new MutationObserver(function(data1, data2) {
      if($html.hasClass("wf-active")){
        startAnime();
        observer.disconnect();
      }else if($html.hasClass("wf-inactive")){
        startAnime();
        observer.disconnect();
      }
    });
    var options = {attributes: true, attributeFilter: ["class"]};
    observer.observe($html[0], options);
  }else {
    startAnime();
    $("#test").css("display","block");
  }

  try {
    Typekit.load({
      async: true
    });
  } catch (e) {
  }

  /*$window.load(function(){
    startAnime();
  });*/

  function startAnime(){
    $("#loading").addClass("hide").delay(1000).queue(function(){
      $(this).addClass("hidden").dequeue();
    });
    $("#title").delay(1000).queue(function(){
      $(this).addClass("show").dequeue();
    });
    $("#wave, #moon").delay(2000).queue(function(){
      $(this).addClass("show").dequeue();
    });
    $("#bg, #sub").delay(3000).queue(function(){
      $(this).addClass("show").dequeue();
    });
    $("#naviWrap, #main, #main2").delay(3000).queue(function(){
      $(this).addClass("show").dequeue().delay(1).queue(function(){
        $(this).addClass("showed").dequeue();
      });
    });
  }

  $window.scroll(function(){
    bgcount = Math.floor($window.scrollTop()/5);
    //bgcount--;
    $secondBg.css("background-position", -bgcount+"px 0");
  });

  $("#linktoProfile").click(function(){
    naviScroll($profile);
  });
  $("#linktoWorks, #linktoWorks2").click(function(){
    naviScroll($works);
  });

  function naviScroll($target){
    var toY = $target.offset().top;
    $body.animate({
      scrollTop: toY
    }, 500);
  }

  $detailBtn.click(function(){
    var $self = $(this);
    if(!$self.hasClass("open")){
      $self.addClass("open");
      var $site = $self.parents(".one-site");
      var $siteDetail = $site.find(".site-detail");
      var $siteDetailWrap = $site.find(".site-detail-wrap");
      var heightTemp = $siteDetailWrap.outerHeight();
      $siteDetailWrap.addClass("hidden").delay(300).queue(function(){
        $(this).addClass("animate").dequeue().delay(1).queue(function(){
          $(this).removeClass("hidden").dequeue();
        });
      });
      $siteDetail.height(heightTemp);
    }
  });

  $closeBtn.click(function(){
    var $site = $(this).parents(".one-site");
    var $siteDetail = $site.find(".site-detail");
    var $siteDetailWrap = $site.find(".site-detail-wrap");
    var $detail = $site.find(".detail-btn");
    $siteDetailWrap.addClass("hidden").delay(800).queue(function(){
      $(this).removeClass("hidden animate").dequeue();
    });
    $siteDetail.delay(500).queue(function(){
      $(this).height(0).dequeue();
    });
    $detail.removeClass("open");
  });

  $window.resize(function(){
    if(resizeTimer){
      clearTimeout(resizeTimer);
    }
    resizeTimer = setTimeout(function(){
      var $opened = $detailBtn.filter(".open");
      $opened.each(function(){
        var $self = $(this);
        var $site = $self.parents(".one-site");
        var $siteDetail = $site.find(".site-detail");
        var $siteDetailWrap = $site.find(".site-detail-wrap");
        var heightTemp = $siteDetailWrap.outerHeight();
        $siteDetail.height(heightTemp);
      });
    },200);
  });
});
