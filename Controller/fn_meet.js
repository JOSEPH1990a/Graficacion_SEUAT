addEventListener('load',inicializarEventos,false);

function inicializarEventos()
{
    for(var f=1;f<=2;f++)
  {
    var ob=document.getElementById('fecha'+f);
    ob.addEventListener('click',presionEnlace,false);
  }
}

function presionEnlace(e)
{
    e.preventDefault();
    var url=e.target.getAttribute('href');
    cargarHoroscopo(url); 
}
var conexion1;
var usuarios = new Array();
var horas = new Array();
function cargarHoroscopo(url) 
{
  conexion1=new XMLHttpRequest();  
  conexion1.onreadystatechange = procesarEventos;
  conexion1.open("GET", url, true);
  conexion1.send();
}

function procesarEventos()
{
  var detalles = document.getElementById("detalles");
  if(conexion1.readyState == 4)
  {
    var a = conexion1;
    json = $.parseJSON(a.responseText);
    var i = 0, req_index = "";
    $.each(json, function(index, value){
        usuarios.push(index);
        horas.push(value);
        i++;
        });
    detalles.innerHTML = a.responseText;
    //alert(usuarios["usuario"]);
    mostrarDatos();
    mostrarDatosTabla();
  } 
  else 
  {
    detalles.innerHTML = 'Cargando...';
  }
  
}
function mostrarDatos(){
 
  
  var salesChartCanvas = document.getElementById('revenue-chart-canvas').getContext('2d')
  var chartUsuarios = [];
  var charDatos = [];
  for(var i=0;i<usuarios.length;i++){
    chartUsuarios.push(usuarios[i]);
  }
  for(var i=0;i<horas.length;i++){
    charDatos.push(horas[i]);
  }
  /*
  var salesChartData = {
    labels: chartUsuarios,
    datasets: [
      {
        label: 'Electronics',
        backgroundColor: 'rgba(210, 214, 222, 1)',
        borderColor: 'rgba(210, 214, 222, 1)',
        pointRadius: false,
        pointColor: 'rgba(210, 214, 222, 1)',
        pointStrokeColor: '#c1c7d1',
        pointHighlightFill: '#fff',
        pointHighlightStroke: 'rgba(220,220,220,1)',
        data: charDatos,
        backgroundColor: ['rgba(113, 79, 227, 1)','rgba(113, 79, 227, 1)','rgba(113, 79, 227, 1)','rgba(113, 79, 227, 1)','rgba(113, 79, 227, 1)','rgba(113, 79, 227, 1)','rgba(113, 79, 227, 1)','rgba(113, 79, 227, 1)',
        'rgba(113, 79, 227, 1)','rgba(113, 79, 227, 1)','rgba(113, 79, 227, 1)','rgba(113, 79, 227, 1)','rgba(113, 79, 227, 1)','rgba(113, 79, 227, 1)','rgba(113, 79, 227, 1)','rgba(113, 79, 227, 1)',
        'rgba(113, 79, 227, 1)','rgba(113, 79, 227, 1)','rgba(113, 79, 227, 1)','rgba(113, 79, 227, 1)','rgba(113, 79, 227, 1)','rgba(113, 79, 227, 1)','rgba(113, 79, 227, 1)','rgba(113, 79, 227, 1)',
        'rgba(113, 79, 227, 1)','rgba(113, 79, 227, 1)','rgba(113, 79, 227, 1)','rgba(113, 79, 227, 1)','rgba(113, 79, 227, 1)','rgba(113, 79, 227, 1)','rgba(113, 79, 227, 1)','rgba(113, 79, 227, 1)',
        'rgba(113, 79, 227, 1)','rgba(113, 79, 227, 1)','rgba(113, 79, 227, 1)','rgba(113, 79, 227, 1)','rgba(113, 79, 227, 1)','rgba(113, 79, 227, 1)','rgba(113, 79, 227, 1)','rgba(113, 79, 227, 1)',
        'rgba(113, 79, 227, 1)','rgba(113, 79, 227, 1)','rgba(113, 79, 227, 1)','rgba(113, 79, 227, 1)','rgba(113, 79, 227, 1)','rgba(113, 79, 227, 1)','rgba(113, 79, 227, 1)','rgba(113, 79, 227, 1)',
        'rgba(113, 79, 227, 1)','rgba(113, 79, 227, 1)','rgba(113, 79, 227, 1)','rgba(113, 79, 227, 1)','rgba(113, 79, 227, 1)','rgba(113, 79, 227, 1)','rgba(113, 79, 227, 1)','rgba(113, 79, 227, 1)',
        'rgba(113, 79, 227, 1)','rgba(113, 79, 227, 1)','rgba(113, 79, 227, 1)','rgba(113, 79, 227, 1)','rgba(113, 79, 227, 1)','rgba(113, 79, 227, 1)','rgba(113, 79, 227, 1)','rgba(113, 79, 227, 1)']
      }
    ]
  }
  var salesChartOptions = {
    maintainAspectRatio: false,
    responsive: true,
    legend: {
      display: false
    },
    scales: {
      xAxes: [{
        gridLines: {
          display: false
        }
      }],
      yAxes: [{
        gridLines: {
          display: false
        }
      }]
    }
  }
  var salesChart = new Chart(salesChartCanvas, {
    type: 'bar',
    data: salesChartData,
    options: salesChartOptions
  })
  */
  var salesChartData = {
    labels:chartUsuarios,
    datasets: [
      {
        label:'Horas',
        borderColor: [
          'rgba(255,99,132,1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(255,99,132,1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(255,99,132,1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(255,99,132,1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)'
        ],
        borderWidth: 0.5,
        data: charDatos,
        backgroundColor: [
          'rgba(255, 99, 132, 0.4)',
          'rgba(54, 162, 235, 0.4)',
          'rgba(255, 206, 86, 0.4)',
          'rgba(75, 192, 192, 0.4)',
          'rgba(153, 102, 255, 0.4)',
          'rgba(255, 159, 64, 0.4)',
          'rgba(255, 99, 132, 0.4)',
          'rgba(54, 162, 235, 0.4)',
          'rgba(255, 206, 86, 0.4)',
          'rgba(75, 192, 192, 0.4)',
          'rgba(153, 102, 255, 0.4)',
          'rgba(255, 159, 64, 0.4)',
          'rgba(255, 99, 132, 0.4)',
          'rgba(54, 162, 235, 0.4)',
          'rgba(255, 206, 86, 0.4)',
          'rgba(75, 192, 192, 0.4)',
          'rgba(153, 102, 255, 0.4)',
          'rgba(255, 159, 64, 0.4)',
          'rgba(255, 99, 132, 0.4)',
          'rgba(54, 162, 235, 0.4)',
          'rgba(255, 206, 86, 0.4)',
          'rgba(75, 192, 192, 0.4)',
          'rgba(153, 102, 255, 0.4)',
          'rgba(255, 159, 64, 0.4)'
        ],
      }
    ]
  }
  var salesChartOptions = {
    maintainAspectRatio: false,
    responsive: true,
    events: [],
    legend: {
      display: false
    },
    scales: {
      xAxes:[{
        gridLines: {
          display: false,
          stacked: false
        }
      }],
      yAxes: [{
        gridLines: {
          display: true,
        }
      }]
    },
    layout: {
      padding: {
        left: 0,
        right: 0,
        top:0,
        bottom:0
      }
    },
    animation: {
      onComplete: function(){
        var chartInstance = this.chart,
        ctx = chartInstance.ctx;
        ctx.font = Chart.helpers.fontString(Chart.defaults.global.defaultFontSize, Chart.defaults.global.defaulFontStyle,Chart.defaults.global.defaultFontFamily);
        ctx.textAlign = 'center';
        ctx.textBaseline = 'bottom';
        this.data.datasets.forEach(function(dataset, i){
          var meta = chartInstance.controller.getDatasetMeta(i);
          meta.data.forEach(function(bar, index){
            if(dataset.data[index] >0){
              var data = dataset.data[index];
              ctx.fillText(data, bar._model.x, bar._model.y);
            }
          });
        });
      }
    }
  }
  var salesChart = new Chart(salesChartCanvas, {
    type: 'bar',
    data: salesChartData,
    options: salesChartOptions
  })



}
function mostrarDatosTabla(){
  google.charts.load('current', {'packages':['table']});
      google.charts.setOnLoadCallback(drawTable);

      function drawTable() {
        var data = new google.visualization.DataTable();
        data.addColumn('string', 'Usuario');
        data.addColumn('string', 'Tiempo');
        for(var i = 0; i <Object.keys(jsonResponse1).length-1 ; i++) {
          data.addRow([uno1[i], (dos1[i])])
          }
        var table = new google.visualization.Table(document.getElementById('table_div'));
        table.draw(data, {showRowNumber: true, width: '100%', height: '100%'});
        } 
}
