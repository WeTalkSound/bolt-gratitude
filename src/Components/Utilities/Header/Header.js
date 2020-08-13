import React from 'react'
import logo from './header-logo.png'

export default function Header() {
  return (
    <div className="fixed-top firstcon text-center justify-content-center">
      <a href="/">
        <img src={ logo } alt="Bolt Protect" style={{ maxHeight: "40px" }} className="headerlogo mx-auto d-flex img-fluid" />
      </a>
    </div>
  )
}