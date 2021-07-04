import React ,{useState, Fragment} from "react";
import { connect } from "react-redux";
import { Link ,Redirect,withRouter} from "react-router-dom";
import PropTypes from "prop-types";
import {readOrder , clearOrder} from "./../../actions/order";



const ReadOrder = ({readOrder , clearOrder , order}) => {

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

  const onClick = e => {
    clearOrder();
}

  return (
    <section className="landing">
       <div className="dark-overlay">
         <div className="form-inner">
         { !order.loading   ? 
         <Fragment> <div className="card-6">
           <h4 className="large"> Order Details</h4> 
           <p className="text-inner">Drug Id :  {order.order.drugId}</p>
           <p className="text-inner">Drug Name :  {order.order.drugName}</p>
           <p className="text-inner">Quantity :  {order.order.quantity}</p>
           <p className="text-inner">Current Owner :  {order.order.currentOwner}</p>
           <p className="text-inner">Status :  {order.order.status}</p>
           <button className="btn btn-form" onClick={ (e) => onClick(e)} >Go Again</button>
           </div></Fragment> :  
         <form className="form card-5" onSubmit={(e) => onSubmit(e)}>
      <h3 className="large">Order Info</h3>
      <p className="lead">
        <i className="fas fa-folder-open"></i> Enter Order Id 
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
      </form>}
  </div> 
  </div>
    </section>
  )
}



ReadOrder.propTypes = {
  readOrder: PropTypes.func.isRequired,
  clearOrder : PropTypes.func.isRequired,
  order : PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  order: state.order
})



export default connect(mapStateToProps, { readOrder , clearOrder })(
  withRouter(ReadOrder)
);