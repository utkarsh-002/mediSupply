import { useState, Fragment } from 'react'
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { FileUploader } from "react-drag-drop-files";
import { verifyPrescription } from "./../../actions/verifyPrescription";


const UploadImage = ({user,verifyPrescription , history})  => {
  
  const fileTypes = ["JPEG", "PNG", "GIF"];

  const [file, setFile] = useState()
  const submit = async event => {
    event.preventDefault()
    verifyPrescription(file,history,user)
  }

  const fileSelected = file => {
    // const file = event.target.files[0]
		setFile(file)
	}

  return (
        <Fragment>
            {/* <section className="container">
            <div className="card-6">    
            <h1 className='large '>Upload Prescription</h1>
            <form className='form' onSubmit={submit}>
            <input onChange={fileSelected} type="file" accept="image/*"></input>
            <br></br><br></br>
            <button type="submit" className="btn btn-light">Submit</button>
            </form>
            </div>
            </section> */}

            <section className="container">
            <div className="card-8">    
            <h1 className='large '>Upload Prescription</h1>
            <form className='form' onSubmit={submit}>
            <FileUploader
                multiple={true}
                handleChange={fileSelected}
                name="file"
                types={fileTypes}
                />
                <br></br><p>{file ? `File name: ${file[0].name}` : "no files uploaded yet"}</p>
            <br></br><br></br>
            <button type="submit" className="btn btn-light">Submit</button>
            </form>
            </div>
            </section>   
        </Fragment>
  );
}

UploadImage.propTypes = {
  verifyPrescription: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
  user : state.auth.user,
})

export default connect(mapStateToProps,{verifyPrescription})(UploadImage);