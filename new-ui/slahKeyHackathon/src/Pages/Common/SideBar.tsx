import React from 'react'
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import AdminPanelSettingsOutlinedIcon from '@mui/icons-material/AdminPanelSettingsOutlined';
import MedicalInformationOutlinedIcon from '@mui/icons-material/MedicalInformationOutlined';
import AccountTreeOutlinedIcon from '@mui/icons-material/AccountTreeOutlined';
import PaidOutlinedIcon from '@mui/icons-material/PaidOutlined';
import TopBar from './TopBar';

const SideBar = () => {
  return (
    <div>
      <nav className="sidebar sidebar-offcanvas" id="sidebar">
        <div className="sidebar-brand-wrapper d-flex d-lg-flex align-items-start justify-content-center fixed-top">
          <a className="sidebar-brand brand-logo" href="index.html"><img src="assets/images/logo.svg" alt="logo" /></a>
          <a className="sidebar-brand brand-logo-mini" href="index.html"><img src="assets/images/logo.svg"
            alt="logo" /></a>
        </div>
        <ul className="nav">
          
          <li className="nav-item nav-category">
            <span className="nav-link">Navigation</span>
          </li>
          <li className="nav-item menu-items">
            <a className="nav-link" href="home">
              <span className="menu-icon">
                <HomeOutlinedIcon/>
              </span>
              <span className="menu-title">Home</span>
            </a>
          </li>
          <li className="nav-item menu-items">
            <a className="nav-link" href="departments">
              <span className="menu-icon">
                <PeopleAltOutlinedIcon/>
              </span>
              <span className="menu-title">Departments</span>
            </a>
          </li>
          <li className="nav-item menu-items">
            <a className="nav-link" href="admin">
              <span className="menu-icon">
                <AdminPanelSettingsOutlinedIcon/>
              </span>
              <span className="menu-title">Admin</span>
            </a>
          </li>
          <li className="nav-item menu-items">
            <a className="nav-link" href="officer">
              <span className="menu-icon">
              <MedicalInformationOutlinedIcon/>  
              </span>
              <span className="menu-title">Officer</span>
            </a>
          </li>
          <li className="nav-item menu-items">
            <a className="nav-link" href="projects">
              <span className="menu-icon">
                <AccountTreeOutlinedIcon/>
              </span>
              <span className="menu-title">Projects</span>
            </a>
          </li>
          <li className="nav-item menu-items">
            <a className="nav-link" href="transactions">
              <span className="menu-icon">
                <PaidOutlinedIcon/>
              </span>
              <span className="menu-title">Transactions</span>
            </a>
          </li>
        </ul>
      </nav>
    </div>
  )
}

export default SideBar