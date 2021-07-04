import React ,{useState} from "react";
import { connect } from "react-redux";
import { Link ,Redirect,withRouter} from "react-router-dom";
import PropTypes from "prop-types";
import {readDrug} from "./../../actions/drug";



const ReadDrug = ({readDrug}) => {

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



  return (
    <section className="landing">
       <div className="dark-overlay">
         <div className="form-inner">
         <form className="form card-5" onSubmit={(e) => onSubmit(e)}>
      <h3 className="large">Drug Info</h3>
      <p className="lead">
        <i className="fas "></i> Enter Drug Id 
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
      </form>
         </div>
        </div>
    </section>
  )
}



ReadDrug.propTypes = {
  readDrug: PropTypes.func.isRequired
};



export default connect(null, { readDrug })(
  withRouter(ReadDrug)
);