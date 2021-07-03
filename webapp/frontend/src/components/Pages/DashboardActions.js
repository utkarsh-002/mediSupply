
import React from 'react'
import { Link } from "react-router-dom"

const DashboardActions = () => {
    return (
        <div className="dash-buttons">
            <Link to="/addDrug" className="btn btn-light">
                <i className="fas fa-user-circle text-primary"></i>Add Drug </Link>
            <Link to="/editDrug" className="btn btn-light">
                <i className="fab fa-black-tie text-primary"></i>Edit Drug </Link>
        </div>
    )
}


export default DashboardActions