
import React ,{Fragment} from 'react'
import { Link } from "react-router-dom"


const DashboardActions = ({role}) => {

    const ManLinks = (
        <div className="dash-buttons">
            <Link to="/addDrug" className="btn btn-light">
                <i className="fas fa-file-prescription text-primary"></i>Add Drug</Link>
            &nbsp;&nbsp;&nbsp;&nbsp;
            <Link to="/editDrug" className="btn btn-light">
                <i className="fas fa-edit text-primary"></i>Edit Drug</Link>
            &nbsp;&nbsp;&nbsp;&nbsp;
            <Link to="/readDrug" className="btn btn-light">
                <i className="fas fa-book-medical text-primary"></i>Read Drug</Link>  
            <br></br>  <br></br>
            <Link to="/readOrder" className="btn btn-light">
                <i className="fas fa-folder-open text-primary"></i>Read Order</Link>
        </div>
      )


    const DistLinks = (
        <div>
            <Link to="/readDrug" className="btn btn-light">
                <i className="fas fa-book-medical text-primary"></i>Read Drug</Link>  
            &nbsp;&nbsp;&nbsp;&nbsp;  
            <Link to="/readOrder" className="btn btn-light">
                <i className="fas fa-folder-open text-primary"></i>Read Order</Link>
            &nbsp;&nbsp;&nbsp;&nbsp;
            <Link to="/verify" className="btn btn-light">
                <i className="fas fa-qrcode text-primary"></i>Verify</Link>
        </div>
      )

    const ReatailLinks = (
        <div className="dash-buttons">
            <Link to="/readDrug" className="btn btn-light">
                <i className="fas fa-book-medical text-primary"></i>Read Drug</Link>  
            &nbsp;&nbsp;&nbsp;&nbsp;  
            <Link to="/readOrder" className="btn btn-light">
                <i className="fas fa-folder-open text-primary"></i>Read Order</Link>
            &nbsp;&nbsp;&nbsp;&nbsp;
            <Link to="/addOrder" className="btn btn-light">
                <i className="fas fa-plus text-primary"></i>Add Order</Link>
            <br></br>  <br></br>
            <Link to="/verify" className="btn btn-light">
                <i className="fas fa-qrcode text-primary"></i>Verify</Link>  
            &nbsp;&nbsp;&nbsp;&nbsp;
            <Link to="/uploadimage" className="btn btn-light">
                <i className="fa-solid fa-upload text-primary"></i>Upload Prescription</Link>
                
        </div>
      )  

 

    return (
        <>
            {role === "man" ? ManLinks : role === "dist" ? DistLinks : ReatailLinks } 

        </>
    )
}


export default DashboardActions