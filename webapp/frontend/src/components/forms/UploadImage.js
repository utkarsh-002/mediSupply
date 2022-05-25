import { useState, Fragment } from 'react'
import axios from 'axios'

// import './App.css'

async function postImage({image}) {
  const formData = new FormData();
  formData.append("image", image)

  const result = await axios.post('http://localhost:5000/images', formData, { headers: {'Content-Type': 'multipart/form-data'}})
  return result.data
}


const UploadImage = ()  => {

  const [file, setFile] = useState()
  const [images, setImages] = useState([])

  const submit = async event => {
    event.preventDefault()
    const result = await postImage({image: file})
    setImages([result.image, ...images])
  }

  const fileSelected = event => {
    const file = event.target.files[0]
		setFile(file)
	}

  return (

        <Fragment>
            <section className="container">
            <div className="card-6">    
            <h1 className='large '>Upload Prescription</h1>
            <form className='form' onSubmit={submit}>
            <input onChange={fileSelected} type="file" accept="image/*"></input>
            <br></br><br></br>
            <button type="submit" className="btn btn-light">Submit</button>
            </form>
            </div>
            </section>
                
        </Fragment>
  );
}

export default UploadImage;