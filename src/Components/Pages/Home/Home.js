import React from 'react'
import Button from '../../Utilities/Button/Button'

export default function Home() {
  return (
    <>
      <div className="col-10 offset-1 justify-content-center">
        <div className="firstcon text-center justify-content-center">
          
          <h1 className="font-weight-bold">We're all in protect mode but we're motivated by different things.</h1>
          <h1 className="font-weight-bold"><i>What type of protector are you?</i></h1>
          <p>Take The Quiz To Find Out!</p>
          <Button linkTo="/quiz">Get Started</Button>
        </div>
      </div>
    </>
  )
}