import React, {useState} from 'react'
import { Link } from "react-router-dom";
import QrScan from 'react-qr-reader'
import {verify} from '../../actions/verify'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const QRscanner=({verify,user,history}) => {

    const [qrscan, setQrscan] = useState("");
    const handleScan = data => {
        if (data) {
            console.log(data)
            setQrscan(data)
        }
    }
    const handleError = err => {
    console.error(err)
    }
    const onClick = e => {
        if(qrscan!=""){
            console.log("Verified Clicked");
            verify(user.role, qrscan,history);
        }
    }

    return (
        <section className="landing">
        <div className="dark-overlay">
        <div className="landing-inner">
            <section className="card-7">
            <h3 className="large" >QR Scanner</h3>
            <center>
            <div >
                <QrScan
                    delay={300}
                    onError={handleError}
                    onScan={handleScan}
                    style={{ height: 600, width: 500 }}
                />
            </div>
            <div>
            <p value={qrscan}></p>
            </div>
            </center>
            {qrscan!=""? <button className="btn btn-form" onClick={ (e) => onClick(e)}> verify</button>:<p className="lead">Waiting to Scan....</p>}
            </section>
        </div></div>
        </section>   
    );
  }
  
  QRscanner.propTypes = {
    user: PropTypes.object.isRequired,
  }
  
  const mapStateToProps = (state) => ({
    user: state.auth.user,
  })
  
  export default connect(mapStateToProps, { verify })(QRscanner)
  