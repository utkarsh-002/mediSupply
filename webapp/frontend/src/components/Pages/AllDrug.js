import React,{useEffect,Fragment} from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getAllDrug } from "../../actions/drug";
import DrugItem from "./DrugItem";

const AllDrug = ({drug:{drugs,loading},getAllDrug}) => {
  // console.log()
  
  useEffect(() => {
    getAllDrug()
  }, [])

  // loading?console.log("No drugs"):console.log(drugs)


  return (
    <section className="container">
        {/* <h1>All Drugs</h1> */}
        <Fragment>
            {loading ? <p className="lead">Drugs loading.....</p> : <Fragment>
                <p className="lead">
                    { ' ' } Browse Available Drugs{/* Muski scan karti hai */}
                </p>
                <div className="profiles">
                    {drugs.length > 0 ? (drugs.map(drug=> (<DrugItem key={drug._id} drug={drug} />))) :
                        <h4>No Drug Found...</h4>}
                </div>
            </Fragment>}
        </Fragment>    
    </section>
  )
  
}

AllDrug.propTypes = {
  drugs: PropTypes.object.isRequired,
  getAllDrug : PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  drug : state.drug,
})

export default connect(mapStateToProps, {getAllDrug})(AllDrug);