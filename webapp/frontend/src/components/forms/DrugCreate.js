import React, { useEffect, useState, Fragment } from 'react';
import { Link, withRouter, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {createDrug} from "./../../actions/drug"


const DrugCreate = ({ createDrug ,history})  => {
    const [formData, setFormData] = useState({
      drugId : "",
      drugName : "",
      drugManufacturer : "",
      manDate : "",
      expiryDate : "",
      batchId : "", 
      cost : "" 
    });
    
    const {
     drugId,
     drugManufacturer,
     drugName,
     manDate,
     expiryDate,
     batchId,
     cost
    } = formData;

    const onChange = e =>
        setFormData({ ...formData, [e.target.name]: e.target.value });
    const onSubmit = e => {
        e.preventDefault();
        console.log(formData)
        createDrug(formData,history)
    };


    return (
        <Fragment>
            <section className="container">
            <div className="card-6">
            <span ><Link to="/dashboard"> <i className="fa fa-arrow-left"></i></Link>  </span>    
            <h1 className='large '>Enter Drug Details</h1>
            <form className='form' onSubmit={e => onSubmit(e)}>
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
                        placeholder='Drug Name'
                        name='drugName'
                        value ={drugName}
                        onChange={e => onChange(e)}
                    />
                </div>
                <div className='form-group'>
                    <input
                        type='text'
                        placeholder='Manufacturer'
                        name='drugManufacturer'
                        value ={drugManufacturer}
                        onChange={e => onChange(e)}
                    />   
                </div>
                <div className='form-group'>
                    <input
                        type='date'
                        placeholder='Manufacturing Date'
                        name='manDate'
                        value ={manDate}
                        onChange={e => onChange(e)}
                    />           
                </div>
                <div className='form-group'>
                    <input
                        type='date'
                        placeholder='Expiry Date'
                        name='expiryDate'
                        value ={expiryDate}
                        onChange={e => onChange(e)}
                    />      
                </div>
                <div className='form-group'>
                    <input
                        type='text'
                        placeholder='Batch ID'
                        name='batchId'
                        value ={batchId}
                        onChange={e => onChange(e)}
                    />  
                </div>
                <div className='form-group'>
                    <input
                        type='text'
                        placeholder='Cost'
                        name='cost'
                        value ={cost}
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



DrugCreate.propTypes = {
    createDrug: PropTypes.func.isRequired
};



export default connect(null, { createDrug })(
    withRouter(DrugCreate)
);