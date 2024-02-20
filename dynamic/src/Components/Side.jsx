import React, { useEffect, useState } from 'react'
// import Conte from './Conte'
import '../Css/sidebar.css'

const Side = () => {
    const [isCollapsed, setIsCollapsed] = useState(window.innerWidth < 992);
    
    useEffect(() => {
        const handleResize = () => {
            setIsCollapsed(window.innerWidth < 992);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const toggleSidebar = () => {
        setIsCollapsed(!isCollapsed);
    };

    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

  return (
    <div>
        <div  style={{float:'left'}}>
    <ul className={`sidebar nav flex-column shadow d-flex  ${isCollapsed ? 'collapsed' : ''} px-2`}>
        <li className="nav-item logo-holder">
            <div className="text-center text-white logo py-4 mx-4">
                <a className="text-white text-decoration-none" id="title" href="#"><strong>Sidebar</strong></a>
                <a className="text-white float-right" id="sidebarToggleHolder" href="#" onClick={toggleSidebar}>
                    <i className="fa fa-bars" id="sidebarToggle"></i>
                </a>
            </div>
        </li>
        <li className="nav-item"><a className="nav-link text-left text-white py-1 px-0" href="#"><i className="fas fa-tachometer-alt mx-3"></i><span className="text-nowrap mx-2">Dashboard</span></a></li>
        <li className="nav-item"><a className="nav-link text-left text-white py-1 px-0" href="#"><i className="fas fa-user mx-3"></i><span className="text-nowrap mx-2">User profile</span></a></li>
        <li className="nav-item"><a className="nav-link text-left text-white py-1 px-0" href="#"><i className="far fa-life-ring mx-3"></i><span className="text-nowrap mx-2">Support tickets</span></a></li>
        <li className="nav-item"><a className="nav-link text-left text-white py-1 px-0" href="#"><i className="fas fa-archive mx-3"></i><span className="text-nowrap mx-2">Archive</span></a></li>
        <li className="nav-item"><a className="nav-link text-left text-white py-1 px-0" href="#"><i className="fas fa-chart-bar mx-3"></i><span className="text-nowrap mx-2">Statistics</span></a></li>
        <li className="nav-item dropdown">
            <a
                className="dropdown-toggle nav-link text-left text-white py-1 px-0 position-relative"
                href="#"
                onClick={toggleDropdown}
            >
                <i className="fas fa-sliders-h mx-3"></i>
                <span className="text-nowrap mx-2">Settings</span>
                <i className={`fas fa-caret-${isOpen ? 'up' : 'down'} float-none float-lg-right fa-sm`}></i>
            </a>
            <div className={`dropdown-menu border-0 animated ${isOpen ? 'fadeIn show' : ''}`}>
                <a className="dropdown-item text-white" href="#"><span>Change password</span></a>
                <a className="dropdown-item text-white" href="#"><span>Change email</span></a>
                <a className="dropdown-item text-white" href="#"><span>More</span></a>
            </div>
        </li>
        <li className="nav-item">
            <a className="nav-link text-left text-white py-1 px-0" href="#">
                <i className="fas fa-sign-out-alt mx-3"></i>
                <i className="fa fa-caret-right d-none position-absolute"></i>
                <span className="text-nowrap mx-2">Log out</span>
            </a>
        </li>
    </ul>
    </div>
   

</div>

  )
}

export default Side