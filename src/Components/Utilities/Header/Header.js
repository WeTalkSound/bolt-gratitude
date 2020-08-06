import React from 'react'
import { Link } from "react-router-dom";
import logo from './header-logo.png'

export default function Header() {
  return (
    <div className="firstcon text-center justify-content-center">
      <Link to="/">
        <img src={ logo } alt="Bolt Protect" style={{ maxHeight: "40px" }} className="headerlogo mx-auto d-flex img-fluid" />
      </Link>
    </div>
  )
}