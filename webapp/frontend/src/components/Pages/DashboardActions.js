
import React from 'react'
import { Link } from "react-router-dom"

const DashboardActions = () => {
    return (
        <div className="dash-buttons">
            <Link to="/addDrug" className="btn btn-light">
                <i className="fas fa-user-circle text-primary"></i>Add Drug</Link>
            <Link to="/editDrug" className="btn btn-light">
                <i className="fab fa-black-tie text-primary"></i>Edit Drug</Link>
            <Link to="/readDrug" className="btn btn-light">
                <i className="fab fa-black-tie text-primary"></i>Read Drug</Link>
            <Link to="/addOrder" className="btn btn-light">
                <i className="fab fa-black-tie text-primary"></i>Add Order</Link>
            <Link to="/readOrder" className="btn btn-light">
                <i className="fab fa-black-tie text-primary"></i>Read Order</Link>
        </div>
    )
}


export default DashboardActions