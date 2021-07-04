import React ,{useState} from "react";
import { connect } from "react-redux";
import { Link ,Redirect,withRouter} from "react-router-dom";
import PropTypes from "prop-types";
import {readOrder} from "./../../actions/order";



const ReadOrder = ({readOrder}) => {

  const [formData, setFormData] = useState({
    orderId : ""  
  });
  
  const {
   orderId,
  } = formData;

  const onChange = e =>
      setFormData({ ...formData, [e.target.name]: e.target.value });


  const onSubmit = e => {
      e.preventDefault();
      console.log(formData)
      readOrder(orderId)
  };



  return (
    <section className="landing">
       <div className="dark-overlay">
         <div className="form-inner">
         <form className="form card-5" onSubmit={(e) => onSubmit(e)}>
      <h3 className="large">Order Info</h3>
      <p className="lead">
        <i className="fas "></i> Enter Order Id 
      </p>
        <div className="form-group">
          <input
            type="text"
            placeholder="Order Id"
            name="orderId"
            autoComplete="off"
            required
            value={orderId}
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



ReadOrder.propTypes = {
  readOrder: PropTypes.func.isRequired
};



export default connect(null, { readOrder })(
  withRouter(ReadOrder)
);