// var QrCode = require('qrcode-reader');
// var qr = new QrCode();

const qrcode1 = window.qrcode;

const btn = document.querySelector('button');
const video = document.createElement("video");
const canvasElement = document.getElementById("qr-canvas");
const canvas = canvasElement.getContext("2d");

const qrResult = document.getElementById("qr-result");
const outputData = document.getElementById("outputData");
const btnScanQR = document.getElementById("btn-scan-qr");

let scanning = false;

qrcode1.callback = (res) => {
  if (res) {
    data={data:res}
    sendData(data);
    outputData.innerText = res;
    console.log(res);
    scanning = false;

    video.srcObject.getTracks().forEach(track => {
      track.stop();
    });

    qrResult.hidden = false;
    canvasElement.hidden = true;
    btnScanQR.hidden = false;
  }
  window.open(res, '_self');
  //   window.open(res, '_blank'); for opening in new tab

}

btnScanQR.onclick = () => {
  
    navigator.mediaDevices
      .getUserMedia({ video: { facingMode: "environment" } })
      .then(function (stream) {
          scanning = true;
          qrResult.hidden = true;
          btnScanQR.hidden = true;
      canvasElement.hidden = false;
      video.setAttribute("playsinline", true); // required to tell iOS safari we don't want fullscreen
      video.srcObject = stream;
      video.play();
      tick();
      scan();
    });

};

function tick() {
    canvasElement.height = video.videoHeight;
    canvasElement.width = video.videoWidth;
  canvas.drawImage(video, 100, 100, canvasElement.width, canvasElement.height);


  scanning && requestAnimationFrame(tick);
}

function scan() {
    try {
        qrcode1.decode();
      } catch (e) {
          setTimeout(scan, 300);
        }
      }
      
        // qr.callback = function (error, result) {
        //   if (error) {
        //     console.log(error);
        //     return;
        //   }
        //   console.log(result);
        // }
      


      function sendData( data ) {
        const XHR = new XMLHttpRequest(),
              FD  = new FormData();
      
        // Push our data into our FormData object
        for( name in data ) {
          FD.append( name, data[ name ] );
        }
      
        // Define what happens on successful data submission
        XHR.addEventListener( 'load', function( event ) {
          alert( 'Yeah! Data sent and response loaded.' );
        } );
      
        // Define what happens in case of error
        XHR.addEventListener(' error', function( event ) {
          alert( 'Oops! Something went wrong.' );
        } );
      
        // Set up our request
        XHR.open( 'POST', 'https://example.com/cors.php' );
        // **********enter URL
      
        // Send our FormData object; HTTP headers are set automatically
        XHR.send( FD );
      }
      
      btn.addEventListener( 'click', function()
        { sendData( {test:'ok'} );
      } )        