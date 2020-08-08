import React, { useState, useLayoutEffect } from 'react'
import Button from '../../Utilities/Button/Button'

export default function Home() {
  const [ status,setStatus ] = useState("INITIAL")
  const [ error,setError ] = useState("")
  const [ image,setImage ] = useState("")
  const [ file,setFile ] = useState(new Blob())
  const [ gratitude,setGratitude ] = useState("")

  const submit = () => {
    console.log("File triggered")
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
    const file = Array.from(e.target.files)[0]

    console.log(file.type.match(/image.*/))

    if( file.type.match(/image.*/) ) {
      let reader = new FileReader()
      reader.onload = readerEvent => {
        let image = new Image()
        image.onload = imageEvent => {
          let 
            canvas = document.createElement('canvas'), 
            max_size = 1024,
            width = image.width,
            height = image.height
          if (width > height) {
            if (width > max_size) {
              height *= max_size / width
              width = max_size
            }
          }
          else {
            if (height > max_size) {
              width *= max_size / height
              height = max_size
            }
          }
          canvas.width = width
          canvas.height = height
          canvas.getContext('2d').drawImage(image, 0, 0, width, height)

          console.log("Before To Blob")
          console.log(canvas)
          canvas.toBlob(blob => {
            console.log("To Blob")
            console.log(blob)
            setImage(URL.createObjectURL(blob))
            setFile(blob)
          })
        }
        image.src = readerEvent.target.result;
      }
      reader.readAsDataURL(file);
    }
    else {
      setError("Please upload an image.")
      return
    }
  }

  const btnChecked = (e) => {
    if(e.target.checked) {
      setGratitude(e.target.name)
      setStatus("SLIDER")
    }
  }

  const GratitudeSelector = () => (
    <div  className="animate__animated animate__flipInX">
      <h1 className="font-weight-bold">What are you most grateful for?</h1>
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
      <p>{error}</p>
    </div>
  )

  const GratitudeSlider = () => (
    <div className="animate__animated animate__flipInX">
      <h1>Slide to show your gratitude</h1>
      <div className="form-group">
        <input type="range" step="1" min="0" max="10" onChange={(e) => setStatus("IMAGE")}  className="custom-range" id="formControlRange" />
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
    </div>
  )

  const GratitudeImageUpload = () => (
    <div className="animate__animated animate__flipInX">
      <h1>Upload Your Image!</h1>
      <div className="col-12 mb-3 text-center">
        {/* <img className="img-fluid" src={image} alt="Your Gratitude" /> */}
        <Button type="primary" >
          <label className="m-0" htmlFor='single-image'>
            UPLOAD IMAGE
          </label>
        </Button>
        <input style={{display: "none", opacity: 0}} type='file' id='single-image' onChange={onUpload} /> 
      </div>
    </div>
  )

  const GratitudeDisplay = () => (
    <div className="animate__animated animate__flipInX">
      <h1>Share Your Image!</h1>
      <div className="col-12 mb-3 text-center">
        <img className="img-fluid" style={{background: "black"}} src={image} alt="Your Gratitude" />
      </div>
    </div>
  )

  let content

  switch (status) {
    case "INITIAL":
      content = <GratitudeSelector />
      break;
    
    case "SLIDER":
      content = <GratitudeSlider />
      break;
    
    case "IMAGE":
      content = <GratitudeImageUpload />
      break;
    
    case "UPLOADING":
      content = <h2 className="animate__animated animate__flipInX">Loading, Please Wait...</h2>
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
          {content}
        </div>
      </div>
    </>
  )
}