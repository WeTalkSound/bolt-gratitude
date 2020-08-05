import React from 'react'
import './Button.css'
import { Link } from "react-router-dom"

export default function Button({ type, linkTo, onClick, href, ...props }) {
  let RenderedButton = null
  switch (true) {
    case linkTo !== undefined:
      RenderedButton = (
        <Link className="btn btn-primary" to={linkTo} {...props}>
          {props.children}
        </Link>
      )
      break;
    case href !== undefined:
      RenderedButton = (
        <a className="btn btn-primary" target="_blank" rel="noopener noreferrer" href={href} {...props}>
          {props.children}
        </a>
      )
      break;
  
    default:
      RenderedButton = (
        <button className="btn btn-primary" onClick={onClick} {...props}>
          {props.children}
        </button>
      )
      break;
  }
  return (
    <>
      {RenderedButton}
    </>
  )
}