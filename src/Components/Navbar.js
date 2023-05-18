import React from 'react'


export default function Navbar(props) {
  return (
    <div>
       <nav className={`navbar navbar-expand-lg navbar-${props.mode} bg-${props.mode}`}>
  <div className="container-fluid">
    <a className="navbar-brand" href="/">IMS-Textutils</a>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          {/* <link className="nav-Link active" href='' aria-current="page" >Home</link> */}
        </li>
        <li className="nav-item">
          {/* <link className="nav-Link" href=''>About</link> */}
        </li>
      </ul>
      <div className={`form-check form-switch text-${props.mode==='light'?'dark':'light'}`}>
        <input onChange={props.toggler} className="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault" />
        <label className="form-check-label" htmlFor="flexSwitchCheckDefault">{props.mode==='dark'?'Disable':'Enable'} Dark Mode</label>
      </div>
    </div>
  </div>
</nav>
    </div>
  )
}

Navbar.prototype = {name: String.prototype

}

Navbar.defaultProps = {
  name: 'Kya Chalra'
}