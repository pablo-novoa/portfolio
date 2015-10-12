var lugar = "Montevideo";
var tempUnit = "C";
var windUnit = "mps";
var metricSistem = "metric";
var tempValue;
var tempValueF;
var nubes;
var viento;
var humedad;
var presion;

var tempPronostico;
var nubesPronostico;

var dateHoy = new Date();
var dia = dateHoy.getDay();

var diasSemana = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];


$(document).ready(function(){
    consulta();
    consultaPronosticos();
    $("#switcher").click(switch_units);
});

function consulta()
{
    $.ajax({
        url: "http://api.openweathermap.org/data/2.5/weather?q="+lugar+"&units="+metricSistem+"&lang=sp",
	type:"get",
	dataType:"json"
    }).done(fdatos);
}

function fdatos(datos)
{
    tempValue = [Math.round(datos.main.temp),Math.round(datos.main.temp_min),Math.round(datos.main.temp_max)];
    nubes = [datos.weather[0].icon,datos.weather[0].description];
    viento = [Math.round(datos.wind.speed),Math.round(datos.wind.deg)];
    humedad = Math.round(datos.main.humidity);
    presion = Math.round(datos.main.pressure);
    lugar = datos.name+", "+datos.sys.country;
    
    datosClima(tempValue,nubes,viento,humedad,presion,lugar);
}

function switch_units()
{
    if (tempUnit == "C")
    {
        $('#switch_btn').animate({left:'55px'},300);
        tempUnit = "F";
        windUnit = "MPH";
        metricSistem = "imperial";
        consulta();
        consultaPronosticos();
    }else if (tempUnit == "F")
    {
        $('#switch_btn').animate({left:'0px'},300);
        tempUnit = "C";
        windUnit = "mps";
        metricSistem = "metric";
        consulta();
        consultaPronosticos();
    }
}

function datosClima(tempValue,nubes,viento,humedad,presion,lugar)
{
    $("#temp").html(tempValue[0]+"º <span>"+tempUnit+"</span>");
    $("#min_temp").html(tempValue[1]+"º <span>"+tempUnit+"</span>");
    $("#max_temp").html(tempValue[2]+"º <span>"+tempUnit+"</span>");
    
    $("#nubes img").attr("src","imgs/"+nubes[0]+".png");
    $("#nubes h3").html(nubes[1]);
    
    $("#viento img").css("transform","rotate("+viento[1]+"deg)");
    $("#viento h3").html(viento[1]+"º | "+viento[0]+" "+windUnit);
    
    $("#humedad h3").html(humedad+" %");
    
    $("#presion h3").html(presion+" hPa");
    
    $("#lugar").html(lugar);
}

function switch_lugar()
{
    lugar = $("#buscar_lugar").val();
    consulta();
    consultaPronosticos()
}

function consultaPronosticos()
{
    $.ajax({
        url: "http://api.openweathermap.org/data/2.5/forecast/daily?q="+lugar+"&units="+metricSistem+"&cnt=7",
	type:"get",
	dataType:"json"
    }).done(fpronosticos);
}

function fpronosticos(datosP)
{
    $("#pronosticos").html("");
    for(i=1; i<datosP.list.length; i++)
    {        
        tempPronostico = Math.round(datosP.list[i].temp.day);
        nubesPronostico = datosP.list[i].weather[0].icon;
        diaPronostico = diasSemana[(dia+i)%7];
        
        $("#pronosticos").append('<div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 datos2"><h4 id="dia1" class="dia_pronostico">'+diaPronostico+': </h4><h4> <span>'+tempPronostico+'</span>º <span>'+tempUnit+'</span> | </h4><img src="imgs/'+nubesPronostico+'.png" class="iconos_clima_pron"/></div>');
    }
}






