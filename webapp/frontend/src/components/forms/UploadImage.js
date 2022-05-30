import { useState, Fragment } from 'react'
import axios from 'axios'

// import './App.css'

async function postImage({Image}) {

  let formData = {Image:Image}

  const result = await axios.post('http://localhost:5000/images', formData, { headers: {'Content-Type': 'application/json'}})
  return result.data
}


const UploadImage = ()  => {

  // let base64code = ""

  const [file, setFile] = useState()
  // const [images, setImages] = useState([])

  let response1 = ""

  const submit = async event => {
    event.preventDefault()

    // let reader = new FileReader();
    // reader.readAsDataURL(file);

    var reader = new FileReader();
    reader.onloadend = async() => {
      // console.log(reader.result)
      response1 = await postImage({Image: reader.result})
    }
    reader.readAsDataURL(file);

    // setImages([result.image, ...images])
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