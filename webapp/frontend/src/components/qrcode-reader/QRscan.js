// import React, {useState} from 'react'
// import { Link } from "react-router-dom";
// import QrScan from 'react-qr-reader'

// function QRscanner() {

//     const [qrscan, setQrscan] = useState('No result');

//     const handleScan = data => {
//         if (data) {
//             console.log(data)
//             setQrscan(data)
//         }
//     }
//     const handleError = err => {
//     console.error(err)
//     }

//     return (
//         <div>
//              <section className="container">
//           <Link to="/dashboard">
//                 <i className="fa fa-arrow-left"></i>
//             </Link>
//             <span><h3 className="large" >QR Scanner</h3></span>
//             <center>
//             <div >
//                 <QrScan
//                     delay={300}
//                     onError={handleError}
//                     onScan={handleScan}
//                     style={{ height: 500, width: 320 }}
//                 />
//             </div>
//             <div>
//             <p value={qrscan}> </p>
//             </div>
//             </center>
//           </section>   
//         </div>
         
//     );
//   }
  
//   export default QRscanner;

import React, {useState} from 'react'
import { Link } from "react-router-dom";
import QrScan from 'react-qr-reader'

function QRscanner() {

    const [qrscan, setQrscan] = useState('No result');
    const handleScan = data => {
        if (data) {
            console.log(data)
            setQrscan(data)
        }
    }
    const handleError = err => {
    console.error(err)
    }

    return (
          <section className="container">
          <Link to="/dashboard">
                <i className="fa fa-arrow-left"></i>
            </Link>
            <span><h3 className="large" >QR Scanner</h3></span>
            <center>
            <div >
                <QrScan
                    delay={300}
                    onError={handleError}
                    onScan={handleScan}
                    style={{ height: 500, width: 320 }}
                />
            </div>
            <div>
            <p value={qrscan}></p>
            </div>
            </center>
          </section>   
    );
  }
  
  export default QRscanner;
  