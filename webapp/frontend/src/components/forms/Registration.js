import React, { useEffect, useState, Fragment } from 'react';
import { Link, withRouter, Redirect } from 'react-router-dom';


const Registration = () => {
  
    return (
        <Fragment>
            <div className="card-6">
            <span style={{display : "inline" }}><Link to="/"> <i className="fa fa-arrow-left"></i></Link>  </span>    
            <h1 className='large '>User Registration</h1>
            <form className='form' >
                <div className='form-group'>
                    <input 
                        type='text'
                        placeholder='User Name'
                        name='userName'
                        // onChange={e => onChange(e)}
                    />
                 
                </div>
                <div className='form-group'>
                    <input
                        type='text'
                        placeholder='Email'
                        name='email'
                       
                        // onChange={e => onChange(e)}
                    />
                   
                </div>
                <div className='form-group'>
                    <input
                        type='password'
                        placeholder='Password'
                        name='password'
                       
                        // onChange={e => onChange(e)}
                    />
                   
                </div>
                <div  className='form-group'>
                    <select  name='role' style={{textAlign:'center'}}>
                        <option value='0'>Select Role</option>
                        <option value='man'>Manufacturer</option>
                        <option value='dist'>Distributor</option>
                        <option value='ret'>Retailer</option>
                        </select>
                </div>
               
                <div className='form-group'>
                    <input
                        type='text'
                        placeholder='License Number'
                        name='license_number'
                    
                        // onChange={e => onChange(e)}
                    />
                 
                       
                </div>
                <div className='form-group'>
                    <input
                        type='text'
                        placeholder='Address'
                        name='address'
                    
                        // onChange={e => onChange(e)}
                    />
                 
                       
                </div>
                <div className='form-group'>
                    <input
                        type='text'
                        placeholder='Contact Number'
                        name='contact'
                        // onChange={e => onChange(e)}
                    />
                
                </div>

                <input type='submit' className='btn btn-form my-1' value="Submit"/>
            </form>

            </div>
            
        </Fragment>
    );
};



export default Registration;