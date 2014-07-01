/* jQuery Carousel 0.9.8
Copyright 2010 Thomas Lanciaux and Pierre Bertet.
This software is licensed under the CC-GNU LGPL <http://creativecommons.org/licenses/LGPL/2.1/>
*/
(function(g){g.fn.carousel=function(q){var q=g.extend({direction:"horizontal",loop:false,dispItems:1,pagination:false,paginationPosition:"inside",nextBtn:'<span />',prevBtn:'<span />',btnsPosition:"inside",nextBtnInsert:"insertAfter",prevBtnInsert:"insertBefore",nextBtnInsertFn:false,prevBtnInsertFn:false,autoSlide:false,autoSlideInterval:3000,delayAutoSlide:false,combinedClasses:false,effect:"slide",slideEasing:"swing",animSpeed:300,equalWidths:"true",verticalMargin:0,callback:function(){},useAddress:false,adressIdentifier:"carousel",tabLabel:function(r){return r},showEmptyItems:true,ajaxMode:false,ajaxUrl:"",stopSlideBtn:false,stopSlideTextPause:"Pause",stopSlideTextPlay:"Play"},q);if(q.btnsPosition=="outside"){q.prevBtnInsert="insertBefore";q.nextBtnInsert="insertAfter"}q.delayAutoSlide=0+q.delayAutoSlide;return this.each(function(){var r={$elts:{},params:q,launchOnLoad:[]};r.$elts.carousel=g(this).addClass("js");r.$elts.content=g(this).children().css({position:"absolute",top:0});r.$elts.wrap=r.$elts.content.wrap('<div class="carousel-wrap"></div>').parent().css({overflow:"hidden",position:"relative"});r.steps={first:0,count:r.$elts.content.children().length};r.$elts.loader=g('<div class="loader"></div>').css({position:"absolute"});r.steps.last=r.steps.count-1;if(r.params.pagination){o(r)}if(g.isFunction(r.params.prevBtnInsertFn)){r.$elts.prevBtn=r.params.prevBtnInsertFn(r.$elts)}else{if(q.btnsPosition=="outside"){r.$elts.prevBtn=g(q.prevBtn)[q.prevBtnInsert](r.$elts.carousel)}else{r.$elts.prevBtn=g(q.prevBtn)[q.prevBtnInsert](r.$elts.wrap)}}if(g.isFunction(r.params.nextBtnInsertFn)){r.$elts.nextBtn=r.params.nextBtnInsertFn(r.$elts)}else{if(q.btnsPosition=="outside"){r.$elts.nextBtn=g(q.nextBtn)[q.nextBtnInsert](r.$elts.carousel)}else{r.$elts.nextBtn=g(q.nextBtn)[q.nextBtnInsert](r.$elts.wrap)}}r.$elts.nextBtn.addClass("carousel-control next carousel-next");r.$elts.prevBtn.addClass("carousel-control previous carousel-previous");r.lastItemsToLoad;d(r);r.$elts.carousel.attr("tabindex",0).add(r.$elts.carousel.children()).bind({focus:function(s){g(document).bind("keypress",function(t){switch(t.keyCode){case 39:r.$elts.nextBtn.click();break;case 37:r.$elts.prevBtn.click();break}switch(t.charCode){case 110:r.$elts.nextBtn.click();break;case 112:r.$elts.prevBtn.click();break}})},blur:function(){g(document).unbind("keypress")}});n(r);g(function(){c(r);g.each(r.launchOnLoad,function(s,t){t()});if(r.params.autoSlide){f(r)}if(q.stopSlideBtn==true){r.$elts.stopSlideBtn=g('<button type="button" class="slide-control play">'+q.stopSlideTextPause+"</button>");a(r)}})})};function c(s){var t=s.$elts.content.children();var r=0;t.each(function(){$item=g(this);$itemHeight=$item.outerHeight();if($itemHeight>r){r=$itemHeight}});if(s.params.verticalMargin>0){r=r+s.params.verticalMargin}t.height(r);var q=s.$elts.content.children(":first");s.itemWidth=q.outerWidth();if(s.params.direction=="vertical"){s.contentWidth=s.itemWidth}else{if(s.params.equalWidths){s.contentWidth=s.itemWidth*s.steps.count}else{s.contentWidth=(function(){var u=0;s.$elts.content.children().each(function(){u+=g(this).outerWidth()});return u})()}}s.$elts.content.width(s.contentWidth);s.itemHeight=r;if(s.params.direction=="vertical"){s.$elts.content.css({height:s.itemHeight*s.steps.count+"px"});s.$elts.content.parent().css({height:s.itemHeight*s.params.dispItems+"px"})}else{s.$elts.content.parent().css({height:s.itemHeight+"px"})}i(s)}function d(q){q.$elts.nextBtn.add(q.$elts.prevBtn).bind("enable",function(){var r=g(this).unbind("click").bind("click",function(){if(q.params.ajaxMode&&r.is(".next")&&b(q)==(p(q)-1)&&!q.lastItemsToLoad){h(q);q.$elts.content.ajaxSuccess(function(){})}else{e(q,j(q,(r.is(".next")?"next":"prev")));if(q.params.stopSlideBtn==true){q.$elts.stopSlideBtn.trigger("pause")}else{m(q)}}}).removeClass("disabled").removeAttr("disabled");if(q.params.combinedClasses){r.removeClass("next-disabled previous-disabled").removeAttr("disabled")}}).bind("disable",function(){var r=g(this).unbind("click").addClass("disabled").attr("disabled","disabled");if(q.params.combinedClasses){if(r.is(".next")){r.addClass("next-disabled")}else{if(r.is(".previous")){r.addClass("previous-disabled")}}}}).hover(function(){g(this).toggleClass("hover")})}function o(q){q.$elts.pagination=g('<div class="center-wrap"><div class="carousel-pagination"><p></p></div></div>')[((q.params.paginationPosition=="outside")?"insertAfter":"appendTo")](q.$elts.carousel).find("p");q.$elts.paginationBtns=g([]);q.$elts.content.find("li").each(function(r){if(r%q.params.dispItems==0){k(q,r)}})}function k(r,q){if(r.params.pagination){r.$elts.paginationBtns=r.$elts.paginationBtns.add(g('<a role="button"><span>'+r.params.tabLabel(r.$elts.paginationBtns.length+1)+"</span></a>").data("firstStep",q)).appendTo(r.$elts.pagination);r.$elts.paginationBtns.slice(0,1).addClass("active");r.$elts.paginationBtns.click(function(s){e(r,g(this).data("firstStep"));if(r.params.stopSlideBtn==true){r.$elts.stopSlideBtn.trigger("pause")}else{m(r)}})}}function n(q){if(q.params.useAddress&&g.isFunction(g.fn.address)){g.address.init(function(s){var r=g.address.pathNames();if(r[0]===q.params.adressIdentifier&&!!r[1]){e(q,r[1]-1)}else{g.address.value("/"+q.params.adressIdentifier+"/1")}}).change(function(s){var r=g.address.pathNames();if(r[0]===q.params.adressIdentifier&&!!r[1]){e(q,r[1]-1)}})}else{q.params.useAddress=false}}function e(q,r){q.params.callback(r);l(q,r);q.steps.first=r;i(q);if(q.params.useAddress){g.address.value("/"+q.params.adressIdentifier+"/"+(r+1))}}function j(r,q){if(q=="prev"){if(!r.params.showEmptyItems){if(r.steps.first==0){return((r.params.loop)?(r.steps.count-r.params.dispItems):false)}else{return Math.max(0,r.steps.first-r.params.dispItems)}}else{if((r.steps.first-r.params.dispItems)>=0){return r.steps.first-r.params.dispItems}else{return((r.params.loop)?(r.steps.count-r.params.dispItems):false)}}}else{if(q=="next"){if((r.steps.first+r.params.dispItems)<r.steps.count){if(!r.params.showEmptyItems){return Math.min(r.steps.first+r.params.dispItems,r.steps.count-r.params.dispItems)}else{return r.steps.first+r.params.dispItems}}else{return((r.params.loop)?0:false)}}}}function l(q,r){switch(q.params.effect){case"no":if(q.params.direction=="vertical"){q.$elts.content.css("top",-(q.itemHeight*r)+"px")}else{q.$elts.content.css("left",-(q.itemWidth*r)+"px")}break;case"fade":if(q.params.direction=="vertical"){q.$elts.content.hide().css("top",-(q.itemHeight*r)+"px").fadeIn(q.params.animSpeed)}else{q.$elts.content.hide().css("left",-(q.itemWidth*r)+"px").fadeIn(q.params.animSpeed)}break;default:if(q.params.direction=="vertical"){q.$elts.content.stop().animate({top:-(q.itemHeight*r)+"px"},q.params.animSpeed,q.params.slideEasing)}else{q.$elts.content.stop().animate({left:-(q.itemWidth*r)+"px"},q.params.animSpeed,q.params.slideEasing)}break}}function i(q){if(j(q,"prev")!==false){q.$elts.prevBtn.trigger("enable")}else{q.$elts.prevBtn.trigger("disable")}if(j(q,"next")!==false){q.$elts.nextBtn.trigger("enable")}else{q.$elts.nextBtn.trigger("disable")}if(q.params.pagination){q.$elts.paginationBtns.removeClass("active").filter(function(){return(g(this).data("firstStep")==q.steps.first)}).addClass("active")}}function f(q){q.delayAutoSlide=window.setTimeout(function(){q.autoSlideInterval=window.setInterval(function(){e(q,j(q,"next"))},q.params.autoSlideInterval)},q.params.delayAutoSlide)}function m(q){window.clearTimeout(q.delayAutoSlide);window.clearInterval(q.autoSlideInterval);q.params.delayAutoSlide=0}function a(r){var q=r.$elts.stopSlideBtn;q.bind({play:function(){f(r);q.removeClass("pause").addClass("play").html(r.params.stopSlideTextPause)},pause:function(){m(r);q.removeClass("play").addClass("pause").html(r.params.stopSlideTextPlay)}});q.click(function(s){if(q.is(".play")){q.trigger("pause")}else{if(q.is(".pause")){q.trigger("play")}}});q.prependTo(r.$elts.wrap)}function p(q){return q.$elts.pagination.children().length}function b(q){return q.steps.first/q.params.dispItems}function h(q){q.$elts.carousel.prepend(q.$elts.loader);g.ajax({url:q.params.ajaxUrl,dataType:"json",success:function(r){q.lastItemsToLoad=r.bLastItemsToLoad;g(q.$elts.content).append(r.shtml);q.steps={first:q.steps.first+q.params.dispItems,count:q.$elts.content.children().length};q.steps.last=q.steps.count-1;c(q);k(q,q.steps.first);e(q,q.steps.first);if(q.params.stopSlideBtn==true){q.$elts.stopSlideBtn.trigger("pause")}else{m(q)}q.$elts.loader.remove()}})}})(jQuery);
/**
 * jQuery lightBox plugin
 * This jQuery plugin was inspired and based on Lightbox 2 by Lokesh Dhakar (http://www.huddletogether.com/projects/lightbox2/)
 * and adapted to me for use like a plugin from jQuery.
 * @name jquery-lightbox-0.5.js
 * @author Leandro Vieira Pinho - http://leandrovieira.com
 * @version 0.5
 * @date April 11, 2008
 * @category jQuery plugin
 * @copyright (c) 2008 Leandro Vieira Pinho (leandrovieira.com)
 * @license CCAttribution-ShareAlike 2.5 Brazil - http://creativecommons.org/licenses/by-sa/2.5/br/deed.en_US
 * @example Visit http://leandrovieira.com/projects/jquery/lightbox/ for more informations about this jQuery plugin
 */
(function($){$.fn.lightBox=function(settings){settings=jQuery.extend({overlayBgColor:'#000',overlayOpacity:0.8,fixedNavigation:false,imageLoading:'/images/lightbox-ico-loading.gif',imageBtnPrev:'/images/lightbox-btn-prev.gif',imageBtnNext:'/images/lightbox-btn-next.gif',imageBtnClose:'/images/lightbox-btn-close.gif',imageBlank:'/images/lightbox-blank.gif',containerBorderSize:10,containerResizeSpeed:400,txtImage:'Image',txtOf:'of',keyToClose:'c',keyToPrev:'p',keyToNext:'n',imageArray:[],activeImage:0},settings);var jQueryMatchedObj=this;function _initialize(){_start(this,jQueryMatchedObj);return false;}
function _start(objClicked,jQueryMatchedObj){$('embed, object, select').css({'visibility':'hidden'});_set_interface();settings.imageArray.length=0;settings.activeImage=0;if(jQueryMatchedObj.length==1){settings.imageArray.push(new Array(objClicked.getAttribute('href'),objClicked.getAttribute('title')));}else{for(var i=0;i<jQueryMatchedObj.length;i++){settings.imageArray.push(new Array(jQueryMatchedObj[i].getAttribute('href'),jQueryMatchedObj[i].getAttribute('title')));}}
while(settings.imageArray[settings.activeImage][0]!=objClicked.getAttribute('href')){settings.activeImage++;}
_set_image_to_view();}
function _set_interface(){$('body').append('<div id="jquery-overlay"></div><div id="jquery-lightbox"><div id="lightbox-container-image-box"><div id="lightbox-container-image"><img id="lightbox-image"><div style="" id="lightbox-nav"><a href="#" id="lightbox-nav-btnPrev"></a><a href="#" id="lightbox-nav-btnNext"></a></div><div id="lightbox-loading"><a href="#" id="lightbox-loading-link"><img src="'+settings.imageLoading+'"></a></div></div></div><div id="lightbox-container-image-data-box"><div id="lightbox-container-image-data"><div id="lightbox-image-details"><span id="lightbox-image-details-caption"></span><span id="lightbox-image-details-currentNumber"></span></div><div id="lightbox-secNav"><a href="#" id="lightbox-secNav-btnClose"><img src="'+settings.imageBtnClose+'"></a></div></div></div></div>');var arrPageSizes=___getPageSize();$('#jquery-overlay').css({backgroundColor:settings.overlayBgColor,opacity:settings.overlayOpacity,width:arrPageSizes[0],height:arrPageSizes[1]}).fadeIn();var arrPageScroll=___getPageScroll();$('#jquery-lightbox').css({top:arrPageScroll[1]+(arrPageSizes[3]/10),left:arrPageScroll[0]}).show();$('#jquery-overlay,#jquery-lightbox').click(function(){_finish();});$('#lightbox-loading-link,#lightbox-secNav-btnClose').click(function(){_finish();return false;});$(window).resize(function(){var arrPageSizes=___getPageSize();$('#jquery-overlay').css({width:arrPageSizes[0],height:arrPageSizes[1]});var arrPageScroll=___getPageScroll();$('#jquery-lightbox').css({top:arrPageScroll[1]+(arrPageSizes[3]/10),left:arrPageScroll[0]});});}
function _set_image_to_view(){$('#lightbox-loading').show();if(settings.fixedNavigation){$('#lightbox-image,#lightbox-container-image-data-box,#lightbox-image-details-currentNumber').hide();}else{$('#lightbox-image,#lightbox-nav,#lightbox-nav-btnPrev,#lightbox-nav-btnNext,#lightbox-container-image-data-box,#lightbox-image-details-currentNumber').hide();}
var objImagePreloader=new Image();objImagePreloader.onload=function(){$('#lightbox-image').attr('src',settings.imageArray[settings.activeImage][0]);_resize_container_image_box(objImagePreloader.width,objImagePreloader.height);objImagePreloader.onload=function(){};};objImagePreloader.src=settings.imageArray[settings.activeImage][0];};function _resize_container_image_box(intImageWidth,intImageHeight){var intCurrentWidth=$('#lightbox-container-image-box').width();var intCurrentHeight=$('#lightbox-container-image-box').height();var intWidth=(intImageWidth+(settings.containerBorderSize*2));var intHeight=(intImageHeight+(settings.containerBorderSize*2));var intDiffW=intCurrentWidth-intWidth;var intDiffH=intCurrentHeight-intHeight;$('#lightbox-container-image-box').animate({width:intWidth,height:intHeight},settings.containerResizeSpeed,function(){_show_image();});if((intDiffW==0)&&(intDiffH==0)){if($.browser.msie){___pause(250);}else{___pause(100);}}
$('#lightbox-container-image-data-box').css({width:intImageWidth});$('#lightbox-nav-btnPrev,#lightbox-nav-btnNext').css({height:intImageHeight+(settings.containerBorderSize*2)});};function _show_image(){$('#lightbox-loading').hide();$('#lightbox-image').fadeIn(function(){_show_image_data();_set_navigation();});_preload_neighbor_images();};function _show_image_data(){$('#lightbox-container-image-data-box').slideDown('fast');$('#lightbox-image-details-caption').hide();if(settings.imageArray[settings.activeImage][1]){$('#lightbox-image-details-caption').html(settings.imageArray[settings.activeImage][1]).show();}
if(settings.imageArray.length>1){$('#lightbox-image-details-currentNumber').html(settings.txtImage+' '+(settings.activeImage+1)+' '+settings.txtOf+' '+settings.imageArray.length).show();}}
function _set_navigation(){$('#lightbox-nav').show();$('#lightbox-nav-btnPrev,#lightbox-nav-btnNext').css({'background':'transparent url('+settings.imageBlank+') no-repeat'});if(settings.activeImage!=0){if(settings.fixedNavigation){$('#lightbox-nav-btnPrev').css({'background':'url('+settings.imageBtnPrev+') left 15% no-repeat'}).unbind().bind('click',function(){settings.activeImage=settings.activeImage-1;_set_image_to_view();return false;});}else{$('#lightbox-nav-btnPrev').unbind().hover(function(){$(this).css({'background':'url('+settings.imageBtnPrev+') left 15% no-repeat'});},function(){$(this).css({'background':'transparent url('+settings.imageBlank+') no-repeat'});}).show().bind('click',function(){settings.activeImage=settings.activeImage-1;_set_image_to_view();return false;});}}
if(settings.activeImage!=(settings.imageArray.length-1)){if(settings.fixedNavigation){$('#lightbox-nav-btnNext').css({'background':'url('+settings.imageBtnNext+') right 15% no-repeat'}).unbind().bind('click',function(){settings.activeImage=settings.activeImage+1;_set_image_to_view();return false;});}else{$('#lightbox-nav-btnNext').unbind().hover(function(){$(this).css({'background':'url('+settings.imageBtnNext+') right 15% no-repeat'});},function(){$(this).css({'background':'transparent url('+settings.imageBlank+') no-repeat'});}).show().bind('click',function(){settings.activeImage=settings.activeImage+1;_set_image_to_view();return false;});}}
_enable_keyboard_navigation();}
function _enable_keyboard_navigation(){$(document).keydown(function(objEvent){_keyboard_action(objEvent);});}
function _disable_keyboard_navigation(){$(document).unbind();}
function _keyboard_action(objEvent){if(objEvent==null){keycode=event.keyCode;escapeKey=27;}else{keycode=objEvent.keyCode;escapeKey=objEvent.DOM_VK_ESCAPE;}
key=String.fromCharCode(keycode).toLowerCase();if((key==settings.keyToClose)||(key=='x')||(keycode==escapeKey)){_finish();}
if((key==settings.keyToPrev)||(keycode==37)){if(settings.activeImage!=0){settings.activeImage=settings.activeImage-1;_set_image_to_view();_disable_keyboard_navigation();}}
if((key==settings.keyToNext)||(keycode==39)){if(settings.activeImage!=(settings.imageArray.length-1)){settings.activeImage=settings.activeImage+1;_set_image_to_view();_disable_keyboard_navigation();}}}
function _preload_neighbor_images(){if((settings.imageArray.length-1)>settings.activeImage){objNext=new Image();objNext.src=settings.imageArray[settings.activeImage+1][0];}
if(settings.activeImage>0){objPrev=new Image();objPrev.src=settings.imageArray[settings.activeImage-1][0];}}

function _finish(){$('#jquery-lightbox').remove();$('#jquery-overlay').fadeOut(function(){$('#jquery-overlay').remove();});$('embed, object, select').css({'visibility':'visible'});}
function ___getPageSize(){var xScroll,yScroll;if(window.innerHeight&&window.scrollMaxY){xScroll=window.innerWidth+window.scrollMaxX;yScroll=window.innerHeight+window.scrollMaxY;}else if(document.body.scrollHeight>document.body.offsetHeight){xScroll=document.body.scrollWidth;yScroll=document.body.scrollHeight;}else{xScroll=document.body.offsetWidth;yScroll=document.body.offsetHeight;}
var windowWidth,windowHeight;if(self.innerHeight){if(document.documentElement.clientWidth){windowWidth=document.documentElement.clientWidth;}else{windowWidth=self.innerWidth;}
windowHeight=self.innerHeight;}else if(document.documentElement&&document.documentElement.clientHeight){windowWidth=document.documentElement.clientWidth;windowHeight=document.documentElement.clientHeight;}else if(document.body){windowWidth=document.body.clientWidth;windowHeight=document.body.clientHeight;}
if(yScroll<windowHeight){pageHeight=windowHeight;}else{pageHeight=yScroll;}
if(xScroll<windowWidth){pageWidth=xScroll;}else{pageWidth=windowWidth;}
arrayPageSize=new Array(pageWidth,pageHeight,windowWidth,windowHeight);return arrayPageSize;};function ___getPageScroll(){var xScroll,yScroll;if(self.pageYOffset){yScroll=self.pageYOffset;xScroll=self.pageXOffset;}else if(document.documentElement&&document.documentElement.scrollTop){yScroll=document.documentElement.scrollTop;xScroll=document.documentElement.scrollLeft;}else if(document.body){yScroll=document.body.scrollTop;xScroll=document.body.scrollLeft;}
arrayPageScroll=new Array(xScroll,yScroll);return arrayPageScroll;};function ___pause(ms){var date=new Date();curDate=null;do{var curDate=new Date();}
while(curDate-date<ms);};return this.unbind('click').click(_initialize);};})(jQuery);

(function($)
{
	$.fn.customselect = function(opts) {
		var defaults = {};

		var options = $.extend({}, $.fn.customselect.defaults, opts||{});
         
		$(document).click(function(e){
          if(!$(e.target).parents('.b-dropdown').size()){
              $('.b-dropdown__list').hide().parents('.b-dropdown').removeClass('b-dropdown__active');
          }
        })
		
		this.each(function() {
			var selIndex = this.selectedIndex,
			    selElm = this,
				wrap = $('<div />').addClass(options.blockCls);

			$(this).css({left:'-1000em', position: 'absolute'})

			var listWrap = $('<div />').addClass('b-dropdown__list').hide(),
			    selItem = $('<span />').addClass('b-dropdown__text');
			for(var i = 0; i < this.length; i++) {
				var item = $('<span />')
								.addClass(options.itemCls)
								.text(this.options[i].text)
								.data('index', i);
				if(i === selIndex) {
					selItem.text(this.options[i].text);
				}

				item.click(function() {
					selItem.text( $(this).text() );
					listWrap.toggle();
					listWrap.parents('.b-dropdown').removeClass('b-dropdown__active');
					selElm.selectedIndex = $(this).data('index');
					if(options.callback)
						options.callback(selElm.selectedIndex);
				});
				listWrap.append(item);
			}

			function toggleList(){
				var parent = listWrap.parents('.b-dropdown');
				
				$('.b-dropdown__active').not(parent).removeClass('b-dropdown__active').find('.b-dropdown__list').hide();
				
				parent.toggleClass('b-dropdown__active');
				listWrap.toggle();
			}
			
			selItem.click(function() {
				toggleList();
			});

			listWrap.appendTo(wrap);
			selItem.appendTo(wrap);
			$('<span class="b-dropdown__l"/>').appendTo(wrap);
			$('<span class="b-dropdown__r"/>').appendTo(wrap);
			$('<span class="b-dropdown__arrow"/>').appendTo(wrap).click(function() {
				toggleList();
			});
			wrap.insertBefore(this);

			$(this)
				.data('select', this)
				.addClass('.b-custom-select_hidden')
				.delegate('.'+options.itemCls, 'click', function() {alert('sdsd');});
		})


	}

	$.fn.customselect.defaults = {
		blockCls: 'b-dropdown',

		itemCls: 'b-dropdown__item',

		selectItemCls: 'b-dropdown__item_selected'
	}
})(jQuery);