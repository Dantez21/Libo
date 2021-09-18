$(document).ready( function() {

  var BASE_URL = $("#site_url").val();

    var table = $("#dataTable").DataTable({

        "columnDefs" : [{"targets" : [0,1,2,3] , "orderable" : false}

        ],

        "order" : [],

        "dom": "<'row '<'col-sm-12'tr>>" 
    });

  // General configuration for the charts with Line gradientStroke

    AnnualChartOptions = {
      maintainAspectRatio: false,
      showAllTooltips: true,
      legend: {
        display: false
      },
      responsive: 1,
      scales: {
        yAxes: [{
          display : true,
          ticks: {
            display: true,
            padding : 15,
            fontFamily : "nun",
            precision : 0,
            callback : function (value, index, values) {
                
                if(value > 0){
                    return value + ""
                }else{

                    return value
                }
            }
          },
          gridLines: {
            zeroLineColor: "transparent",
            borderColor    : '#ccc',
            borderDash: [5, 3],
            lineWidth : .5,
            drawBorder: false
          }
        }],
        xAxes: [{
          display: true,
          gridLines: 0,
          barThickness : 10,
          ticks: {
            padding : 15,
            display: true,
            fontFamily : "nun"
          },
          gridLines: {
            zeroLineColor: "transparent",
            drawTicks: false,
            display: false,
            drawBorder: true
          }
        }]
      },
      layout: {
        padding: {top :30, left: 10, bottom: 20, right: 20}
      },

      tooltips : {

        caretPadding : 15,

        xPadding : 10,

        width : 200,

        yPadding : 9,

        caretSize : 6,

        cornerRadius : 3,

        titleFontSize : 12,

        titleFontColor : '#888',

        titleFontFamily : 'nun',

        bodyFontSize : 12,

        bodyFontColor : '#888',

        bodyFontFamily : "nun",

        bodyFontStyle : "bold",

        displayColors : false,

        borderColor : '#ff8500',

        borderWidth : .5,

        backgroundColor : "#ffffe6",

        callbacks: {

            title: function(tooltipItem, data) {

              return data.datasets[tooltipItem[0].datasetIndex].label;
            },

            label: function(tooltipItem, data) {

                var label = data.datasets[tooltipItem.datasetIndex].label || '';

                if (label) {
                    label += ' ';
                }
                label = Math.round(tooltipItem.yLabel * 100) / 100; // *1000 to convert to real numbers
                return label.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
            },
            labelColor: function(tooltipItem, chart) {

              return "#000";
              
            },
            labelTextColor: function(tooltipItem, chart) {
              
              return '#ff8500';
            }
        },
      }
    };

    ctx = document.getElementById('barChart').getContext("2d");

    ctxP = document.getElementById('pieChart').getContext("2d");

    var radiusBackground = function() {

      var self = this;

      self.draw = function(chartInstance) {
        if(chartInstance.options.radiusBackground) {
          var x = chartInstance.chart.canvas.clientWidth / 2 ,
              y = chartInstance.chart.canvas.clientHeight / 2,
              ctxP = chartInstance.chart.ctx;

          ctxP.beginPath();
          ctxP.arc(x-5, y, chartInstance.outerRadius - (chartInstance.radiusLength / 2), 0, 2 * Math.PI);
          ctxP.lineWidth = chartInstance.radiusLength;
          ctxP.strokeStyle = chartInstance.options.radiusBackground.color || '#d1d1d1';
          ctxP.stroke();
        }
      };

      // see http://www.chartjs.org/docs/#advanced-usage-creating-plugins for plugin interface
      return {
        beforeDatasetsDraw: self.draw,
        onResize: self.draw
      }
    };

    // Register with Chart JS
    Chart.plugins.register(new radiusBackground());

    PieChartOptions = {
      // Here is where we enable the 'radiusBackground'
      radiusBackground: {
        color: '#d1d1d1' // Set your color per instance if you like
      },
      maintainAspectRatio: false,
      cutoutPercentage :75,
      showAllTooltips: true,
      legend: {
        display: false
      },
      responsive: 1,
      scales: {
        yAxes: [{
          display: false,
          ticks: {
            display: false
          },
          gridLines: {
            zeroLineColor: "transparent",
            borderColor    : '#ccc',
            drawBorder: false
          }
        }],
        xAxes: [{
          display: false,
          gridLines: 0,
          ticks: {
            display: false
          },
          gridLines: {
            zeroLineColor: "transparent",
            drawTicks: false,
            display: false,
            drawBorder: false
          }
        }]
      },
      layout: {
        padding: {top :10, left: 0, bottom: 10, right: 10}
      },

      tooltips : {

        caretPadding : 15,

        xPadding : 10,

        width : 200,

        yPadding : 9,

        caretSize : 6,

        cornerRadius : 3,

        backgroundColor : "#ffffe6",

        titleFontSize : 12,

        titleFontColor : '#ff8500',

        titleFontFamily : 'nun',

        bodyFontSize : 12,

        bodyFontColor : '#888',

        bodyFontFamily : "nun",

        bodyFontStyle : "bold",

        displayColors : false,

        borderColor : '#ff8500',

        borderWidth : .5,

        callbacks: {
          title: function(tooltipItem, data) {
            return data['labels'][tooltipItem[0]['index']];
          },
          label: function(tooltipItem, data) {
            var val =  data['datasets'][0]['data'][tooltipItem['index']];
                return "" + val.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
          },
          afterLabel: function(tooltipItem, data) {
            var dataset = data['datasets'][0];
            var percent = Math.round((dataset['data'][tooltipItem['index']] / dataset["_meta"][0]) * 100)
            //return '(' + percent + '%)';
          }
        }
      }
    }

    $.get(BASE_URL + "/home/getStats/0", function(data){

        var obj = JSON.parse(data);

        console.log(obj)

        $(".ordersThisMonth").html(obj.ordersThisMonth)

        $(".annual_orders").html(obj.annual_orders)

        table.clear();

        table.rows.add(obj.latest_orders)

        table.draw()

        myChart = new Chart(ctx, {

          type: 'bar',
          responsive: true,
          data: {
            labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"],
            datasets: [{
                label : "Delivered Orders",
                backgroundColor : "#1ab394",
                data: obj.barChart["successful"]
            },{
              label : "Cancelled Orders ",
                backgroundColor: "#ed5565",
                data: obj.barChart["cancelled"]
            }]
          },
          options: AnnualChartOptions
        });

        mChart = new Chart(ctxP, {

          type: 'doughnut',
          responsive: true,
          data: {
            labels: ['Delivered Orders', 'Cancelled'],
            datasets: [{
                data: obj.pieData,
                backgroundColor : ["#1ab394", "#ed5565"]
            }]
          },
          options: PieChartOptions
        });

        // populate pie progress data

        var total_e_s = +obj.pieData[0] + +obj.pieData[1];

        $("#orders_progress_amount").html(obj.pieData[0])

        $("#expense_progress_amount").html(obj.pieData[1])

        $("#orders_progress").css('width', obj.pieData[0]*100/total_e_s + "%");

        $("#expense_progress").css('width', obj.pieData[1]*100/total_e_s + "%");

    });

    $("#annual_export").click(function(event) {
      
        var year = $("#year").val();            

        var time_start = moment(year + "-01-01").unix();

        var time_end = moment(year + "-12-01").endOf('month').unix();

        // console.log(year)

        window.open("index.php/home/printIt/" + time_start + "/" + time_end);

    });

});

function updateBar(year) {

    $.get(BASE_URL + "/home/getBarData/" + year, function(data){

      var obj = JSON.parse(data);

      console.log(obj)

      var index = 0;

      myChart.data.datasets.forEach((dataset) => {
          dataset.data = obj[index];
          index++;
      });

      myChart.update();
    });
}
                
function updatePie(duration) {

    $.get(BASE_URL + "/home/getPieData/" + duration, function(response){

        // console.log(response);

        var obj = JSON.parse(response);

        var total_e_s = +obj[0] + +obj[1];

        $("#orders_progress_amount").html(to_currency(obj[0]))

        $("#expense_progress_amount").html(to_currency(obj[1]))

        $("#orders_progress").css('width', obj[0]*100/total_e_s + "%");

        $("#expense_progress").css('width', obj[1]*100/total_e_s + "%");

        $("#duration_label").html(obj[2])

        var index = 0;

        mChart.data.datasets.forEach((dataset) => {
            dataset.data = obj;
            index++;
        });

        mChart.update();
        

    });
}
