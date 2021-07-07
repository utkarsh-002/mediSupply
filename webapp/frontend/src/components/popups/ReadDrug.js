import React ,{Fragment, useState} from "react";
import { connect } from "react-redux";
import { Link ,Redirect,withRouter} from "react-router-dom";
import PropTypes from "prop-types";
import {clearDrug, readDrug} from "./../../actions/drug";



const ReadDrug = ({readDrug ,clearDrug, drug}) => {

  const [formData, setFormData] = useState({
    drugId : ""  
  });
  
  const {
   drugId,
  } = formData;

  const onChange = e =>
      setFormData({ ...formData, [e.target.name]: e.target.value });


  const onSubmit = e => {
      e.preventDefault();
      console.log(formData)
      readDrug(drugId)
  };

  const onClick = e => {
      clearDrug();
  }

  return (
    <section className="landing">
       <div className="dark-overlay">
         <div className="form-inner">
         {drug.drug   ? 
         <Fragment> <div className="card-6">
           <h4 className="large"> Drug Details</h4> 
           <p className="text-inner">Name :  {drug.drug.drugName}</p>
           <p className="text-inner">Manufacturer :  {drug.drug.manufacturer}</p>
           <p className="text-inner">Manufactured Date :  {drug.drug.mfdDate}</p>
           <p className="text-inner">Expiry Date :  {drug.drug.expiryDate}</p>
           <p className="text-inner">Batch ID :  {drug.drug.batchId}</p>
           <button className="btn btn-form" onClick={ (e) => onClick(e)} >Go Again</button>
           </div></Fragment> : 
      <form className="form card-5" onSubmit={(e) => onSubmit(e)}>
      <h3 className="large">Drug Info</h3>
      <p className="lead">
        <i className="fas fa-book-medical"></i> Enter Drug Id 
      </p>
        <div className="form-group">
          <input
            type="text"
            placeholder="Drug Id"
            name="drugId"
            autoComplete="off"
            required
            value={drugId}
            onChange={(e) => onChange(e)}
          /> 
        </div>
        <input type="submit" className="btn btn-form" value="Submit" />
      </form>}  
         </div>
        </div>
    </section>
  )
}



ReadDrug.propTypes = {
  readDrug: PropTypes.func.isRequired,
  clearDrug: PropTypes.func.isRequired,
  drug :  PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  drug: state.drug
})




export default connect(mapStateToProps, { readDrug , clearDrug })(
  withRouter(ReadDrug)
);