import React ,{useState} from "react";
import { connect } from "react-redux";
import { login } from "../../actions/auth";
import { Link ,Redirect} from "react-router-dom";
import PropTypes from "prop-types";


const Login = ({ login, auth}) => {

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })

  const { email, password } = formData
  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value })
  const onSubmit = (e) => {
    e.preventDefault()
    console.log(formData);
    login(email, password)
  }
  if (auth.user) {
    return <Redirect to="/dashboard" />
  }

  return (
    <section className="landing">
       <div className="dark-overlay">
         <div className="form-inner">
         <form className="form card-5" onSubmit={(e) => onSubmit(e)}>
      <h1 className="large">Welcome</h1>
      <p className="lead">
        <i className="fas fa-user-lock"></i> Sign into Your Account
      </p>
        <div className="form-group">
          <input
            type="email"
            placeholder="Email Address"
            name="email"
            autoComplete="off"
            required
            value={email}
            onChange={(e) => onChange(e)}
          /> 
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={password}
            onChange={(e) => onChange(e)}
          />
        </div>
        <input type="submit" className="btn btn-form" value="Login" />
      </form>
         </div>
        </div>
    </section>
  )
}

Login.propTypes = {
  auth: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
  auth: state.auth,
})

export default connect(mapStateToProps, { login })(Login)