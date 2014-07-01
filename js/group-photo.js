$(function(){

	var ExpertList,
		dirPrefix = './',
		timer = null,
		selectedPerson = null;

    var backstage = {
        elm: $('#g-photo__backstage'),
        top: $('#g-photo').offset().top,
        left: $('#g-photo').offset().left
    }

    var canvas = document.createElement("canvas"),
        ctx;

    ctx = canvas.getContext('2d');

	
	var Progressbar = {
		init: function(){
			this.imageCount = ExpertList.length;
			this.imageLoaded = 0;
			
			$('#g-photo').append($('<span class="progress-bar"><span class="indicator"/></span>'));
		},
		update: function(){
			this.imageLoaded += 1;
			$('#g-photo').find('.indicator').width((this.imageLoaded/this.imageCount)*920);
			
			if(this.imageLoaded === this.imageCount)
				$('#g-photo').find('.progress-bar').remove();
		}
	}

	$.getJSON('./js/data.json', function(r){
        ExpertList = r;
		
		Progressbar.init();
		
		var cursor = 0;
		
		function loadNext(){
			if(ExpertList.length === cursor + 1){
                $(document).trigger('image.loaded');
                return;
            }
			
			cursor += 1;
            ExpertList[cursor].img.src = dirPrefix + ExpertList[cursor].image;
		}
		
		$.each(ExpertList, function(i, o){
			o.img = new Image();
			o.img.onload = function(){
				o.elm = createDOMNode(o, i);
				addToBackstage(o.elm);
				Progressbar.update();
				loadNext();
			}
			o.img.onerror = function(){ loadNext(); }
			if(i < 3)
				o.img.src = dirPrefix + o.image;
		});
		
		$('.competence-filter input').click(function(){
			var t = getExpertByCompetence(this.value),
				isChecked = this.checked;
			
				$.each(t, function(i, p){
					var checkFlag = p.elm.data('checkFlag') || 0;
					
					if(isChecked){
						p.elm.data('checkFlag', ++checkFlag);
						p.elm.addClass('g-photo__persona_active');
					}
					else{
						p.elm.data('checkFlag', --checkFlag);
						if(checkFlag == 0)
							p.elm.removeClass('g-photo__persona_active');
					}
				})
			
		});

	});

    $(document).on("image.loaded", function(){
        backstage.elm.addClass('loaded');
        $('.competence-filter input').removeAttr("disabled");

        $('.g-photo__item_active').each(function(){
            $(this).css('backgroundImage', 'url(' + $(this).data('aura-image') + ')')
        })
    })
	
	$(window).resize(function(){
		if(backstage)
		{
			var coord = $('#g-photo').offset();
			backstage.top = coord.top;
			backstage.left = coord.left;
		}
	});
	
	function isAlphaPixel(x, y, o) {
		
		canvas.width = o.img.width;
		canvas.height = o.img.height;
		
		ctx.drawImage(o.img, 0, 0);
		
		var imageData = ctx.getImageData(x, y, 1, 1),
			alpha = imageData.data[3];
		
		imageData = null;
		
		return (alpha > 0) ? false : true;
	}
	
	function createDOMNode(o, n){
		var elm = $('<span class="g-photo__persona"/>');
		elm.data('page_url', '/expert/')
           .data('index', n);
		elm.click(function(e){
			// location.href = $(this).data('page_url');
            e.preventDefault();      
            alert('Переходим на детальную страницу');
		});
		elm.css({
			width: o.img.width,
			height: o.img.height,
			top: o.top,
			left: o.left,
			zIndex: o.z
		});
		
		elm.append( $('<img class="g-photo__item"/>').attr('src', dirPrefix+o.image) );
		elm.append( $('<i class="g-photo__item_active"/>').data('aura-image', dirPrefix + o.image_aura) );
		
		return elm;
	}
	
	function addToBackstage(elm){
		backstage.elm.append(elm);
		elm.animate({opacity: 1}, 300);
		//animation.enqueue(elm);
	}
	
	function getExpertFromPoint(top, left){
		var p = [];
		$.each(ExpertList, function(i, o){
			if((left >= o.left && left <= (o.left + o.img.width)) && (top >= o.top && top <= (o.top + o.img.height))){
				if(!p[o.z])
					p[o.z] = [];
				p[o.z].push(o);
			}
		});

		return p;
	}
	
	function deselectPerson(){
		if(selectedPerson)
			selectedPerson.elm.removeClass('g-photo__persona_active');
	}
	
	function renderInfo(expert){
		
		var elmInfo = $('.g-photo__info');
		var html = '<h3>' + expert.title + '</h3>';
		
		if(expert.competences.length > 0){
			html += '<div class="g-photo__ls"><h4>Компетенции:</h4>';
			html += '<ul class="g-bullet g-bullet_blue">';
			$.each(expert.competences, function(i, o){
				html += '<li>' + o.title + '</li>';
			});
			html += '</ul></div>';
		}
		
		if(expert.projects.length > 0){
			html += '<div class="g-photo__ls"><h4>Проекты:</h4>';
			html += '<ul class="g-bullet g-bullet_blue">';
			$.each(expert.projects, function(i, o){
				html += '<li>' + o.title + '</li>';
			});
			html += '</ul></div>';
		}
		
		
		if(html)
			elmInfo
				.html(html);
		else
			elmInfo.empty();
		
	}
	
	function getExpertByCompetence(id){
		var t = [];
		$.each(ExpertList, function(i, info){
			
			$.each(info.competences, function(j, competence){
				if(competence.id == id)
					t.push(info)
			});
			
		});
		
		return t;
	}
	
	function sortByUniqIndex(ar){
		var tmpAr = [], lIndex = 0, rIndex = 0;
		$.each(ar, function(i, o){
			var index = o.elm.data('index');
			if(index > rIndex){
				rIndex = index;
				tmpAr.push(o);
			}
			else{
				lIndex = index;
				tmpAr.unshift(o);
			}
		});
		return tmpAr;
	}

    backstage.elm.mousemove(function(e){

        var coords = {
            top: e.pageY - backstage.top,
            left: e.pageX - backstage.left
        };

        var pointedExperts = getExpertFromPoint(coords.top, coords.left);

        if(pointedExperts.length === 0)
        {
            deselectPerson();
            $('.g-photo__info').empty();
            return;
        }

        var curPersona;
        for(var i = pointedExperts.length-1;i >= 0;i--){

            if(!$.isArray(pointedExperts[i]))
                continue;

            var sortedAr = sortByUniqIndex(pointedExperts[i]);

            for(var j = sortedAr.length-1; j >= 0; j--){
                curPersona = sortedAr[j];

                if( !isAlphaPixel(coords.left - curPersona.left, coords.top - curPersona.top,curPersona) ){

                if(selectedPerson == curPersona && selectedPerson.elm.hasClass('g-photo__persona_active'))
                    return;

                deselectPerson();
                selectedPerson = curPersona;
                selectedPerson.elm.addClass('g-photo__persona_active');
                // renderInfo(curPersona);
                return;

                }else
                    continue;
            }

        }
    })
});