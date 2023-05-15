
import React ,{Fragment} from 'react'
import { Link } from "react-router-dom"


const DashboardActions = ({role}) => {

    const AdminLinks = (
        <div style={card_display} className="dash-buttons">
            <Link to="/allDrug" className="btn btn-dark">
                <div style={interior}>
                <i className="fas fa-pills text-primary large"></i>
                </div>
                <div style={interior}>
                    <p className="lead">All Drugs</p>
                </div>
            </Link>
            <Link to="/allOrder" className="btn btn-dark">
                <div style={interior}>
                <i className="fas fa-pencil-alt text-primary large"></i>
                </div>
                <div style={interior}>
                    <p className="lead">All Orders</p>
                </div>
            </Link>
            <Link to="/allUser" className="btn btn-dark">
                <div style={interior}>
                <i className="fas fa-user-circle text-primary large"></i>
                </div>
                <div style={interior}>
                    <p className="lead">All Users</p>
                </div>
            </Link>
        </div>
    )
    
    const ManLinks = (
        <div style={card_display} className="dash-buttons">
            <Link to="/addDrug" className="btn btn-dark">
                <div style={interior}>
                <i className="fas fa-plus text-primary large"></i>
                </div>
                <div style={interior}>
                    <p className="lead">Add Drug</p>
                </div>
            </Link>
            <Link to="/editDrug" className="btn btn-dark">
                <div style={interior}>
                <i className="fas fa-pencil-alt text-primary large"></i>
                </div>
                <div style={interior}>
                    <p className="lead">Edit Drug</p>
                </div>
            </Link>
            <Link to="/readDrug" className="btn btn-dark">
                <div style={interior}>
                <i className="fas fa-pills text-primary large"></i>
                </div>
                <div style={interior}>
                    <p className="lead">Read Drug</p>
                </div>
            </Link>  
            <Link to="/readOrder" className="btn btn-dark">
                <div style={interior}>
                <i className="fas fa-folder text-primary large"></i>
                </div>
                <div style={interior}>
                    <p className="lead">Read Order</p>
                </div>
            </Link>
        </div>
      )


    const DistLinks = (
        <div style={card_display}>
            <Link to="/readDrug" className="btn btn-dark">
                <div style={interior}>
                <i className="fas fa-book-medical text-primary large"></i>
                </div>
                <div style={interior}>
                    <p className="lead">Read Drug</p>
                </div>
            </Link>  
            <Link to="/readOrder" className="btn btn-dark">
                <div style={interior}>
                <i className="fas fa-folder text-primary large"></i>
                </div>
                <div style={interior}>
                    <p className="lead">Read Order</p>
                </div>
            </Link>
            <Link to="/verify" className="btn btn-dark">
                <div style={interior}>
                <i className="fas fa-qrcode text-primary large"></i>
                </div>
                <div style={interior}>
                    <p className="lead">Verify</p>
                </div>
            </Link>
        </div>
      )

    const RetailLinks = (
        <div style={card_display} className="dash-buttons">
            <Link to="/readDrug" className="btn btn-dark">
                <div style={interior}>
                <i className="fas fa-book-medical text-primary large"></i>
                </div>
                <div style={interior}>
                    <p className="lead">Read Drug</p>
                </div>
            </Link>   
            <Link to="/readOrder" className="btn btn-dark">
                <div style={interior}>
                <i className="fas fa-folder text-primary large"></i>
                </div>
                <div style={interior}>
                    <p className="lead">Read Order</p>
                </div>
            </Link>
            <Link to="/addOrder" className="btn btn-dark">
                <div style={interior}>
                <i className="fas fa-plus text-primary large"></i>
                </div>
                <div style={interior}>
                    <p className="lead">Add Order</p>
                </div>
            </Link>
            <Link to="/verify" className="btn btn-dark">
                <div style={interior}>
                <i className="fas fa-qrcode text-primary large"></i>
                </div>
                <div style={interior}>
                    <p className="lead">Verify</p>
                </div>
            </Link>  
            <Link to="/uploadimage" className="btn btn-dark">
                <div style={interior}>
                <i className="fas fa-upload text-primary large"></i>
                </div>
                <div style={interior}>
                    <p className="lead">Upload</p>
                </div>
            </Link>    
        </div>
      )  

 

    return (
        <>
            {role== "admin" ? AdminLinks : role === "man" ? ManLinks : role === "dist" ? DistLinks : RetailLinks } 

        </>
    )
}

// const card_display = {
//     boxShadow: "0 0.1rem 0 0 rgba(0, 0, 0, 0.1)",
//     margin: "0 auto",
//     display: "grid",
//     Width: "1200px",
//     gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
//     gridAutoRows: "180px",
//     gridGap:"20px",
//     paddingBottom: "70px"
//   }

//   const interior = {
//     display: "flex",
//     alignIems : "center",
//     justifyContent : "center",
//     padding : "5px",
//     testAlign : "center",
//     }

const card_display = {
    boxShadow: "0 0.1rem 0 0 rgba(0, 0, 0, 0.1)",
    margin: "0 auto",
    display: "grid",
    height: "100%",
    width: "800px",
    gridTemplateColumns: "1fr",
    gridAutoRows: "140px",
    gridGap: "40px",
    paddingBottom: "30px",
    overflowY: "hidden",
  };
  
  const interior = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "1px",
    textAlign: "center"
  };
  

export default DashboardActions