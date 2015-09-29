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

	$('.main_menu').click( function(){ 
		var thisFaceID = $(this).data('cara');
		rotCubeMain(thisFaceID);
	});

});

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
		$('#cubo').css('-webkit-transform', 'rotateX('+rotDeg[0]+'deg) rotateY('+rotDeg[0]+'deg) rotateZ('+rotDeg[0]+'deg)');

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

function rotCubeMain(face){
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
		$('#cubo').css('-webkit-transform', 'rotateX(60deg) rotateY(45deg) rotateZ(60deg)');
		$('#escena').css({
	    	transform: 'scale(0.3)',
	    	transition: 'all 1s',
	    	top: '0'
		});

		setTimeout(function(){ 
			$('#cubo').css({ transition: 'all 2s' });
			$('#cubo').css('-webkit-transform', rotationValues); 
			$('#escena').css({
		    	transform: 'scale(1)',
		    	transition: 'all 2s',
		    	top: '0'
			});
		}, 1000);

		
		setTimeout(function(){ 
			sacarGrilla(face);
		}, 3000);
		paginaActual = face;

	}else if(!cuboZoom && volverInicio && !cuboEstadoInit){
		ponerGrilla(paginaActual);
		$('#cubo').css('-webkit-transform', 'rotateX(60deg) rotateY(60deg) rotateZ(60deg)');
		$('#escena').css('transform', 'scale(0.2)');
		centerScene();
		setTimeout(function(){ 
			$('#cubo').css('transition','none');
			rotateCubeInit();
		}, 3000);

		cuboEstadoInit = true;
		paginaActual = face;

	}else if(!volverInicio){
		$('#cubo').css({ transition: 'all 3s' });
		$('#escena').css({
	    	transform: 'scale(1)',
	    	transition: 'all 3s',
	    	top: '0'
		});
		$('#cubo').css('-webkit-transform', rotationValues);

		
		setTimeout(function(){ 
			sacarGrilla(face);
		}, 3000);
		cuboZoom = true;
		paginaActual = face;
		
	}

}

function sacarGrilla(face){
	$('#pagina'+face+' .grilla').each(function(i, e){
      window.setTimeout(function() {
        $(e).css('background','transparent');
      }, Math.random() * 2000);
    });
}

function ponerGrilla(face){
	$('#pagina'+face+' .grilla').each(function(i, e){
      window.setTimeout(function() {
        $(e).removeAttr('style');
      }, Math.random() * 2000);
    });
}

 

