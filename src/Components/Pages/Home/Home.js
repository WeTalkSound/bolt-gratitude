import React, { useState, useLayoutEffect } from 'react'
import Button from '../../Utilities/Button/Button'

export default function Home() {
  const [ status,setStatus ] = useState("INITIAL")
  const [ error,setError ] = useState("")
  const [ image,setImage ] = useState("")
  const [ file,setFile ] = useState("")
  const [ gratitude,setGratitude ] = useState("")

  const submit = () => {
    if (!gratitude.length) {
      setError("Please select something you're grateful for.")
      return
    }
    if (!file) {
      setError("Please upload an image.")
      return
    }
    setStatus("UPLOADING")
    const formData = new FormData()

    formData.append("image", file)

    console.log(formData, formData.toString())

    fetch(`https://services.etin.space/bolt-campaign/api/gratitude/?gratefulFor=${gratitude}`, {
      method: 'POST',
      body: formData
    })
      .then(res => {
        return res.blob()
      })
      .then(images => {
        let imageUrl = (URL.createObjectURL(images))
        setImage(imageUrl)
        setStatus("LOADED")
      })
  }

  useLayoutEffect(submit, [file])

  const onUpload = e => {
    const files = Array.from(e.target.files)
    if (files[0].size > 16000000) {
      setError("File size too large!")
      return
    }
    setImage(URL.createObjectURL(files[0]))
    setFile(files[0])
  }

  const btnChecked = (e) => {
    if(e.target.checked) {
      setGratitude(e.target.name)
    }
  }

  const GratitudeSelector = () => (
    <>
      <div className="form-group">
        
        <label className="checkbtn">Life &amp; Health
          <input type="checkbox" name="Life" onChange={btnChecked}  />
          <span className="checkmark"></span>
        </label>
        <label className="checkbtn">Funds
          <input type="checkbox" name="Funds" onChange={btnChecked}  />
          <span className="checkmark"></span>
        </label>
        <label className="checkbtn">Family &amp; Friends
          <input type="checkbox" name="Family" onChange={btnChecked}  />
          <span className="checkmark"></span>
        </label>
      </div>
      <div className="form-group">
        <label className="checkbtn">Career
          <input type="checkbox" name="Career" onChange={btnChecked}  />
          <span className="checkmark"></span>
        </label>
        <label className="checkbtn">Growth
          <input type="checkbox" name="Growth" onChange={btnChecked}  />
          <span className="checkmark"></span>
        </label>
        <label className="checkbtn">Uche from Bolt
          <input type="checkbox" name="Uche" onChange={btnChecked}  />
          <span className="checkmark"></span>
        </label>
        <label className="checkbtn">Good Looks
          <input type="checkbox" name="Good" onChange={btnChecked}  />
          <span className="checkmark"></span>
        </label>
      </div>
      <div className="form-group">
        <label htmlFor="formControlRange">Slide to show your gratitude</label>
        <input type="range" step="1" min="0" max="10"  className="custom-range" id="formControlRange" />
        <div className="row range-indicators">
          <div style={{textAlign:"left"}} className="col">0</div>
          <div className="col">1</div>
          <div className="col">2</div>
          <div className="col">3</div>
          <div className="col">4</div>
          <div className="col">5</div>
          <div className="col">6</div>
          <div className="col">7</div>
          <div className="col">8</div>
          <div className="col">9</div>
          <div style={{textAlign:"right"}} className="col">10</div>
        </div>
      </div>
      <div className="col-12 mb-3 text-center">
        {/* <img className="img-fluid" src={image} alt="Your Gratitude" /> */}
        <Button type="primary" >
          <label className="m-0" htmlFor='single-image'>
            UPLOAD IMAGE
          </label>
        </Button>
        <input style={{display: "none", opacity: 0}} type='file' id='single-image' onChange={onUpload} /> 
      </div>
      <p>{error}</p>
    </>
  )

  const GratitudeDisplay = () => (
    <>
      <div className="col-12 mb-3 text-center">
        <img className="img-fluid" style={{background: "black"}} src={image} alt="Your Gratitude" />
      </div>
    </>
  )

  let content

  switch (status) {
    case "INITIAL":
      content = <GratitudeSelector />
      break;
    
    case "UPLOADING":
      content = <h2>Loading, Please Wait...</h2>
      break;

    case "LOADED":
      content = <GratitudeDisplay />
      break;
    
    default:
      break;
  }

  return (
    <>
      <div className="col-12 justify-content-center">
        <div className="text-center justify-content-center">
          <h1 className="font-weight-bold">What are you most grateful for?</h1>
          {content}
        </div>
      </div>
    </>
  )
}