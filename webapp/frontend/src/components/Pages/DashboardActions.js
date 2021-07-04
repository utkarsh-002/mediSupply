
import React ,{Fragment} from 'react'
import { Link } from "react-router-dom"


const DashboardActions = ({role}) => {

    const ManLinks = (
        <div className="dash-buttons">
            <Link to="/addDrug" className="btn btn-light">
                <i className="fas fa-file-prescription text-primary"></i>Add Drug</Link>
            <Link to="/editDrug" className="btn btn-light">
                <i className="fas fa-edit text-primary"></i>Edit Drug</Link>
            <Link to="/readDrug" className="btn btn-light">
                <i className="fas fa-book-medical text-primary"></i>Read Drug</Link>    
            <Link to="/readOrder" className="btn btn-light">
                <i className="fas fa-folder-open text-primary"></i>Read Order</Link>
        </div>
      )


    const DistLinks = (
        <div>
            <Link to="/readDrug" className="btn btn-light">
                <i className="fas fa-book-medical text-primary"></i>Read Drug</Link>    
            <Link to="/readOrder" className="btn btn-light">
                <i className="fas fa-folder-open text-primary"></i>Read Order</Link>
            <Link to="/verify" className="btn btn-light">
                <i className="fas fa-qrcode text-primary"></i>Verify</Link>
        </div>
      )

    const ReatailLinks = (
        <div className="dash-buttons">
            <Link to="/readDrug" className="btn btn-light">
                <i className="fas fa-book-medical text-primary"></i>Read Drug</Link>    
            <Link to="/readOrder" className="btn btn-light">
                <i className="fas fa-folder-open text-primary"></i>Read Order</Link>
            <Link to="/addOrder" className="btn btn-light">
                <i className="fas fa-plus text-primary"></i>Add Order</Link>
            <Link to="/verify" className="btn btn-light">
                <i className="fas fa-qrcode text-primary"></i>Verify</Link>  
                
        </div>
      )  

 

    return (
        <>
            {role === "man" ? ManLinks : role === "dist" ? DistLinks : ReatailLinks } 

        </>
    )
}


export default DashboardActions