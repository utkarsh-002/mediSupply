import React, { useEffect, useState, Fragment } from 'react';
import { Link, withRouter, Redirect } from 'react-router-dom';
import { setAlert } from "../../actions/alert"
import { register } from "../../actions/auth"
import { connect } from "react-redux"
import PropTypes from "prop-types"


const Register = ({ setAlert, register, isAuthenticated }) => {

    const [formData, setFormData] = useState({
        userName : "",
        email : "",
        password : "",
        contact : "",
        license_number : "",
        address :"",
        role : ""
        
      })
    
      const {userName, email, password, contact,license_number,address,role} = formData
      const onChange = (e) =>
        setFormData({ ...formData, [e.target.name]: e.target.value })
      
        const onSubmit = (e) => {
        e.preventDefault()
             console.log(formData);
          register({userName,email,password,contact,license_number,address,role});
        
      }
    
      if (isAuthenticated) {
        return <Redirect to="/dashboard" />
      }
    


  
    return (
        <Fragment>
            <section className="container">
            <div className="card-6">  
            <h1 className='large '>User Registration</h1>
            <form className='form' onSubmit={e => onSubmit(e)}>
                <div className='form-group'>
                    <input 
                        type='text'
                        placeholder='User Name'
                        name='userName'
                        value ={userName}
                        onChange={e => onChange(e)}
                    />
                 
                </div>
                <div className='form-group'>
                    <input
                        type='text'
                        placeholder='Email'
                        name='email'
                        value ={email}
                        onChange={e => onChange(e)}
                    />
                   
                </div>
                <div className='form-group'>
                    <input
                        type='password'
                        placeholder='Password'
                        name='password'
                        value ={password}
                        onChange={e => onChange(e)}
                    />
                   
                </div>
                <div  className='form-group'>
                    <select  name='role' value={role} onChange={e => onChange(e)}>
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
                        value ={license_number}
                        onChange={e => onChange(e)}
                    />
                 
                       
                </div>
                <div className='form-group'>
                    <input
                        type='text'
                        placeholder='Address'
                        name='address'
                        value ={address}
                        onChange={e => onChange(e)}
                    />
                 
                       
                </div>
                <div className='form-group'>
                    <input
                        type='text'
                        placeholder='Contact Number'
                        name='contact'
                        value ={contact}
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



Register.propTypes = {
    setAlert: PropTypes.func.isRequired,
    register: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool,
  }
  
  const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated,
  })
  
  export default connect(mapStateToProps, { setAlert, register })(Register)