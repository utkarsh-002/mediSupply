import React, { useEffect, useState, Fragment } from 'react';
import { Link, withRouter, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {createOrder} from "./../../actions/order"


const OrderCreate = ({ createOrder ,history})  => {
    const [formData, setFormData] = useState({
      orderId : "",
      drugId : "",
      quantity : ""
    });
    
    const {
        orderId,
        drugId,
        quantity
    } = formData;

    const onChange = e =>
        setFormData({ ...formData, [e.target.name]: e.target.value });
    const onSubmit = e => {
        e.preventDefault();
        console.log(formData)
        createOrder(formData,history)
    };


    return (
        <Fragment>
            <section className="container">
            <div className="card-6">
            <span ><Link to="/"> <i className="fa fa-arrow-left"></i></Link>  </span>    
            <h1 className='large '>Enter Order Details</h1>
            <form className='form' onSubmit={e => onSubmit(e)}>
                <div className='form-group'>
                    <input 
                        type='text'
                        placeholder='Order Id'
                        name='orderId'
                        value ={orderId}
                        onChange={e => onChange(e)}
                    />
                </div>
                <div className='form-group'>
                    <input
                        type='text'
                        placeholder='Drug Id'
                        name='drugId'
                        value ={drugId}
                        onChange={e => onChange(e)}
                    />
                </div>
                <div className='form-group'>
                    <input
                        type='text'
                        placeholder='Quantity'
                        name='quantity'
                        value ={quantity}
                        onChange={e => onChange(e)}
                    />   
                </div>
                <input type='submit' className='btn btn-form my-1' value="Submit"/>
            </form>
            </div>
            </section>
        </Fragment>
    );
};



OrderCreate.propTypes = {
    createOrder: PropTypes.func.isRequired
};



export default connect(null, { createOrder })(
    withRouter(OrderCreate)
);