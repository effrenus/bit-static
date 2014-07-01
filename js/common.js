$(function() {
    $('.b-header').delegate('.b-nav-global__item', 'hover', function(e) {

        if(e.type === 'mouseenter' && !$(this).hasClass('b-nav_header__item_active'))
            $(this).addClass('b-nav_header__item_hover');
        else
            $(this).removeClass('b-nav_header__item_hover');
    });
    
    $(".project-slider__wrap").carousel( { dispItems: 4 } );
    
    $('.filter-block select').customselect();

    $('.post-body img, .info__detailtext img').each(function(){
        if($(this).parents('a').size() == 0){
            $(this).wrap(function(){
                return '<a class="lightbox" href="' + $(this).attr('src') + '"/>';
            });
        }
    });
    
    $('.post-body .lightbox, .info__detailtext .lightbox').lightBox({
        txtImage:'Изображение', 
        txtOf:'из', 
        imageBtnClose: '/static/images/lightbox-btn-close.png',
        imageLoading: '/static/images/lightbox-ico-loading.gif',
        imageBtnPrev: '/static/images/lightbox-btn-prev.gif',
        imageBtnNext: '/static/images/lightbox-btn-next.gif',});
});