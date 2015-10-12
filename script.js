var cuboZoom = false;
var cuboEstadoInit = true;
var paginaActual = 0;
$(document).ready(function(){
	centerScene();
	printGrilla();
	var timerRotateCube;
	rotateCubeInit();

	$(window).resize(function(){
		
	});


	

	menuClickEvent();

});

function menuClickEvent(){
	$('.main_menu').on("click", function(){
	    var thisFaceID = $(this).data('cara');
		var thisTrabajoID = $(this).data('trabajo');
		rotCubeMain(thisFaceID, thisTrabajoID);
	});
}

function printGrilla(){
	$('.cara').each(function(){
		var caraID = $(this).attr('id');
		for (var i = 0; i < 100; i++) {
			$(this).append('<div class="grilla"></div>');
		}
	});
}

function centerScene(){
	var sceneTop =  window.innerHeight*0.25;
	$('#escena').css('top', sceneTop+'px');
}

function rotateCubeInit(){

	var rotDeg = [60, true];
	timerRotateCube = setInterval(function(){ 
		$('#cubo').css('transform', 'rotateX('+rotDeg[0]+'deg) rotateY('+rotDeg[0]+'deg) rotateZ('+rotDeg[0]+'deg)');

		switch( rotDeg[1] ) {
		    case true:
		        rotDeg[0] += 0.1;
				if( rotDeg[0] >= 420 ){ rotDeg[1] = false; }
		        break;
		    case false:
		        rotDeg[0] -= 0.1;
				if( rotDeg[0] <= 0 ){ rotDeg[1] = true; }
		        break;
		    default:
		        break;
		}

	}, 4);

}

function rotCubeMain(face, trabajo){
	$('.main_menu').off();
	if(cuboEstadoInit && face != 0 ){ 
		clearInterval(timerRotateCube); 
		cuboEstadoInit = false;
	}
	var rotationValues;
	var volverInicio = false;

	switch (face) {
		case 0:
	        cuboZoom = false;
	        volverInicio = true;
	        break;
	    case 1:
	        rotationValues = 'rotateX(0deg) rotateY(0deg) rotateZ(0deg)';
	        break;
	    case 2:
	        rotationValues = 'rotateX(90deg) rotateY(0deg) rotateZ(0deg)';
	        break;
	    case 3:
	        rotationValues = 'rotateX(0deg) rotateY(180deg) rotateZ(0deg)';
	        break;
	    case 4:
	        rotationValues = 'rotateX(-90deg) rotateY(0deg) rotateZ(0deg)';
	        break;
	    case 5:
	        rotationValues = 'rotateX(0deg) rotateY(-90deg) rotateZ(0deg)';
	        break;
	    case 6:
	        rotationValues = 'rotateX(0deg) rotateY(90deg) rotateZ(0deg)';
	        break;
	}

	if(cuboZoom){
		ponerGrilla(paginaActual);
		$('#cubo').css('transform', 'rotateX(60deg) rotateY(45deg) rotateZ(60deg)');
		$('#escena').css({
	    	transform: 'scale(0.3)',
	    	transition: 'all 1s',
	    	top: '0'
		});

		setTimeout(function(){ 
			$('#pagina'+paginaActual+' .cara_wrap').html('');
			$('#cubo').css({ transition: 'all 2s' });
			$('#cubo').css('transform', rotationValues); 
			$('#escena').css({
		    	transform: 'scale(1)',
		    	transition: 'all 2s',
		    	top: '0'
			});
			contenidoCaras(face, trabajo);
			paginaActual = face;
		}, 1000);

	}else if(!cuboZoom && volverInicio && !cuboEstadoInit){
		ponerGrilla(paginaActual);
		$('#cubo').css('transform', 'rotateX(60deg) rotateY(60deg) rotateZ(60deg)');
		$('#escena').css('transform', 'scale(0.2)');
		centerScene();
		setTimeout(function(){ 
			$('#pagina'+paginaActual+' .cara_wrap').html('');
			$('#cubo').css('transition','none');
			rotateCubeInit();
			paginaActual = face;
			menuClickEvent();
		}, 2800);

		cuboEstadoInit = true;

	}else if(!volverInicio){
		$('#cubo').css({ transition: 'all 3s' });
		$('#escena').css({
	    	transform: 'scale(1)',
	    	transition: 'all 3s',
	    	top: '0'
		});
		$('#cubo').css('transform', rotationValues);

		contenidoCaras(face, trabajo);
		
		cuboZoom = true;
		paginaActual = face;
		
	}

}

function contenidoCaras(face, trabajo){
	$.ajax({
        url: "caras_cont.php?trabajo="+trabajo,
        type:"get",
        cache: false,
		dataType:"html"
    }).done(function(datos) {
    	$("#pagina"+face+" .cara_wrap").html(datos);
        setTimeout(function(){ 
			sacarGrilla(face);
		}, 2000);
        galeriaImg();
    });
}

function sacarGrilla(face){
	$('#pagina'+face+' .grilla').each(function(i, e){
      window.setTimeout(function() {
        $(e).css('background','transparent');
      }, Math.random() * 1500);
    });

   setTimeout(function() {
    	$('#pagina'+face+' .grilla').css('opacity','0');
      }, 2000);

   setTimeout(function() {
        $('#pagina'+face+' .grilla').css('display','none');
        menuClickEvent();
      }, 2500);
}

function ponerGrilla(face){
	$('#pagina'+face+' .grilla').css('display','block');
	$('#pagina'+face+' .grilla').each(function(i, e){
      window.setTimeout(function() {
        $(e).removeAttr('style');
      }, Math.random() * 800);
    });

}


function galeriaImg(){
	$('.cara_item').click(function(){
    	var thisImgURL = $(this).children('img').attr('src');
    		
    	$('.cara_item_big').css('opacity','0');
    	setTimeout(function(){
    		$('.cara_item_big img').attr('src',thisImgURL);
    		$('.cara_item_big').css('opacity','1');
    	}, 500);

    });
	
}


 

