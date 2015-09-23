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
	$('.princpal').each(function(){
		for (var i = 0; i < 100; i++) {
			$(this).append('<div class="grilla">'+i+'</div>');
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
	clearInterval(timerRotateCube);
	$('#cubo').css({ transition: 'all 3s' });
	$('#escena').css({
		//perspective: '160vw',
    	transform: 'scale(1)',
    	transition: 'all 3s',
    	top: '0'
	});

	$('#cubo').css({
		transform:'rotateX(0deg) rotateY(0deg) rotateZ(0deg)'
	});
}


