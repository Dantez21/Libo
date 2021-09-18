
 $(document).ready(function() {

        var ctx = document.getElementById('annualBarChart');


        // console.log(chartData);

        myChart = new Chart(ctx, {

          type: 'bar',
          responsive: true,
          data: {
            labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"],
            datasets: [{
                label : "Sales",
                backgroundColor : "#800080",
                data: chartData['sales']
            },{
              label : "Expenses",
                backgroundColor: "#ffaa00",
                data: chartData['expenses']
            }]
          },
          options: {
              maintainAspectRatio: false,
                animation:false,
              legend: {
                display: false
              },
              scales: {
                yAxes: [{
                  display : true,
                  ticks: {
                    display: true,
                    padding : 15,
                    fontFamily : "nun",
                    callback : function (value, index, values) {
                        
                        if(value > 0){
                            return value + "K"
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
            }
        });

        var data = $('#body')[0];

        html2canvas(data, {allowTaint: true }).then(canvas => {

            // jspdf changes
            var pdf = new jsPDF('p', 'mm', 'a4');

            var pageCount = data.scrollHeight/970;
            
            for (var i = 0; i <= pageCount; i++) {

                //! This is all just html2canvas stuff
                var srcImg  = canvas;
                var sX      = 0;
                var sY      = 970*i; // start 980 pixels down for every new page
                var sWidth  = 753.7;
                var sHeight = 970;
                var dX      = 0;
                var dY      = 0;
                var dWidth  = 753.7;
                var dHeight = 970;

                window.onePageCanvas = document.createElement("canvas");
                onePageCanvas.setAttribute('width', 753.7);
                onePageCanvas.setAttribute('height', 970);
                var ctx = onePageCanvas.getContext('2d');
                // details on this usage of this function: 
                // https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Using_images#Slicing
                ctx.drawImage(srcImg,sX,sY,sWidth,sHeight,dX,dY,dWidth,dHeight);

                // document.body.appendChild(canvas);
                var canvasDataURL = onePageCanvas.toDataURL("image/JPG", 1.0);

                var width         = onePageCanvas.width;
                var height        = onePageCanvas.clientHeight;

                //! If we're on anything other than the first page,
                // add another page
                if (i > 0) {
                    pdf.addPage(); //8.5" x 11" in pts (in*72)
                }
                //! now we declare that we're working on that page
                pdf.setPage(i+1);
                //! now we add content to that page!
                pdf.addImage(canvasDataURL, 'JPEG', 5, 10);  

            }

            // pdf.deletePage(pageCount);

            printJS({
              type: 'pdf',
              showModal: true,
              printable: URL.createObjectURL(pdf.output("blob")),
              onPrintDialogClose: function () {
                window.close()
              }
            })

        });

        // const pdfBlob = new Blob([string], { type: "application/pdf" });
        // const url = URL.createObjectURL(pdfBlob);

        // window.open(url)
        // printJS(url);
        
    });