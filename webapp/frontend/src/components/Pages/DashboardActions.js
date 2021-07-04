
import React from 'react'
import { Link } from "react-router-dom"

const DashboardActions = () => {
    return (
        <div className="dash-buttons">
            <Link to="/addDrug" className="btn btn-light">
                <i className="fas fa-file-prescription text-primary"></i>Add Drug</Link>
            <Link to="/editDrug" className="btn btn-light">
                <i className="fas fa-edit text-primary"></i>Edit Drug</Link>
            <Link to="/readDrug" className="btn btn-light">
                <i className="fas fa-book-medical text-primary"></i>Read Drug</Link>
            <Link to="/addOrder" className="btn btn-light">
                <i className="fas fa-plus text-primary"></i>Add Order</Link>
            <Link to="/readOrder" className="btn btn-light">
                <i className="fas fa-folder-open text-primary"></i>Read Order</Link>
        </div>
    )
}


export default DashboardActions