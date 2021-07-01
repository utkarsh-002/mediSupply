import React, { useEffect, useState, Fragment } from 'react';
import { Link, withRouter, Redirect } from 'react-router-dom';


const OrderCreate = () => {
    return (
        <Fragment>
            <div className="card-6">
            <span style={{display : "inline" }}><Link to="/"> <i className="fa fa-arrow-left"></i></Link>  </span>    
            <h1 className='large '>Enter Drug Details</h1>
            <form className='form' >
                <div className='form-group'>
                    <input 
                        type='text'
                        placeholder='Order ID'
                        name='orderId'
                        // onChange={e => onChange(e)}
                    />
                 
                </div>
                <div className='form-group'>
                    <input
                        type='text'
                        placeholder='Drug Id'
                        name='drugId'
                       
                        // onChange={e => onChange(e)}
                    />
                   
                </div>
                <div className='form-group'>
                    <input
                        type='text'
                        placeholder='Quantity'
                        
                        name='quantity'
                     
                        // onChange={e => onChange(e)}
                    />
               
                     
                </div>

                <input type='submit' className='btn btn-form my-1' value="Submit"/>
            </form>

            </div>
            
        </Fragment>
    );
};

export default OrderCreate;