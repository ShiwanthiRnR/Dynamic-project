import React, { useState } from 'react'

const Nav = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

  return (
    <nav className="navbar w-100 h-80 navbar-expand-md bg-body justify-content-around">
  <div className=" d-flex w-100  justify-content-between">
    <a className="navbar-brand" href="#">Finance and Operation</a>
    <button data-bs-toggle="collapse" data-bs-target="#navcol-1" className="navbar-toggler">
      <span className="visually-hidden">Toggle navigation</span><span className="navbar-toggler-icon" /></button>
    <div class="collapse navbar-collapse justify-content-around" id="navcol-1" style={{marginLeft: 1, paddingLeft: 0}}>
      <input type="search" className="justify-content-center mx-auto" placeholder="search for a page" /><i class="fa-solid fa-magnifying-glass"></i>
      <ul className="navbar-nav">
        <li className="nav-item" />
        <li className="nav-item"><a className="nav-link active" href="#">First Item</a></li>
        <li className="nav-item"><a className="nav-link" href="#">Second Item</a></li>
        <li className="nav-item"><a className="nav-link" href="#">Third Item</a></li>
      </ul>
    </div>
  </div>
</nav>

  )
}

export default Nav