import React, { Fragment } from "react"
import { Link } from "react-router-dom"
import DrugCreate from './../forms/DrugCreate';


const Dashboard = () => {
  
  return (
<>
<div className="container-form">
<DrugCreate/>
</div>
</>
  )
}


export default Dashboard