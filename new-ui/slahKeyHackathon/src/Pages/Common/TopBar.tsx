import React from 'react'
import MenuIcon from '@mui/icons-material/Menu';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import AdminPanelSettingsOutlinedIcon from '@mui/icons-material/AdminPanelSettingsOutlined';
import MedicalInformationOutlinedIcon from '@mui/icons-material/MedicalInformationOutlined';
import AccountTreeOutlinedIcon from '@mui/icons-material/AccountTreeOutlined';
import PaidOutlinedIcon from '@mui/icons-material/PaidOutlined';

const TopBar = () => {
    return (
        <div>
            <nav className="navbar p-0 fixed-top d-flex flex-row">
                <div className="navbar-brand-wrapper d-flex d-lg-none align-items-center justify-content-center">
                    <a className="navbar-brand brand-logo-mini" href="index.html"><img src="assets/images/logo.svg"
                        alt="logo" /></a>
                </div>
                <div className="navbar-menu-wrapper flex-grow d-flex align-items-stretch">
                    <ul className="navbar-nav navbar-nav-right">
                        <img src="images/logo.svg" alt="" />
                        <li className="nav-item dropdown d-none d-lg-block">
                            <MenuIcon style={{cursor: 'pointer'}} className='create-new-button' id="createbuttonDropdown" data-toggle="dropdown" aria-expanded="false" href="#" />
                            {/* <a className="nav-link btn btn-success create-new-button" id="createbuttonDropdown" data-toggle="dropdown"
                                aria-expanded="false" href="#">Menu</a> */}
                            <div className="dropdown-menu dropdown-menu-right navbar-dropdown preview-list"
                                aria-labelledby="createbuttonDropdown">
                                <h6 className="p-3 mb-0">Projects</h6>
                                <div className="dropdown-divider"></div>
                                <a className="dropdown-item preview-item">
                                    <div className="preview-thumbnail">
                                        <div className="preview-icon bg-dark rounded-circle">
                                            <HomeOutlinedIcon />
                                        </div>
                                    </div>
                                    <div className="preview-item-content">
                                        <a href='home' className="preview-subject ellipsis mb-1">Home</a>
                                    </div>
                                </a>
                                <div className="dropdown-divider"></div>
                                <a className="dropdown-item preview-item">
                                    <div className="preview-thumbnail">
                                        <div className="preview-icon bg-dark rounded-circle">
                                            <PeopleAltOutlinedIcon />
                                        </div>
                                    </div>
                                    <div className="preview-item-content">
                                        <a href='department' className="preview-subject ellipsis mb-1">Department</a>
                                    </div>
                                </a>
                                <div className="dropdown-divider"></div>
                                <a className="dropdown-item preview-item">
                                    <div className="preview-thumbnail">
                                        <div className="preview-icon bg-dark rounded-circle">
                                            <MedicalInformationOutlinedIcon />
                                        </div>
                                    </div>
                                    <div className="preview-item-content">
                                        <a href='officer' className="preview-subject ellipsis mb-1">Officer</a>
                                    </div>
                                </a>
                                <div className="dropdown-divider"></div>
                                <a className="dropdown-item preview-item">
                                    <div className="preview-thumbnail">
                                        <div className="preview-icon bg-dark rounded-circle">
                                            <AccountTreeOutlinedIcon />
                                        </div>
                                    </div>
                                    <div className="preview-item-content">
                                        <a href='projects' className="preview-subject ellipsis mb-1">Projects</a>
                                    </div>
                                </a>
                                <div className="dropdown-divider"></div>
                                <a className="dropdown-item preview-item">
                                    <div className="preview-thumbnail">
                                        <div className="preview-icon bg-dark rounded-circle">
                                            <PaidOutlinedIcon />
                                        </div>
                                    </div>
                                    <div className="preview-item-content">
                                        <a href='transactions' className="preview-subject ellipsis mb-1">Transactions</a>
                                    </div>
                                </a>
                                <div className="dropdown-divider"></div>
                                <p className="p-3 mb-0 text-center">See all projects</p>
                            </div>
                        </li>
                        {/* <li className="nav-item nav-settings d-none d-lg-block">
                            <a className="nav-link" href="#">
                                <i className="mdi mdi-view-grid"></i>
                            </a>
                        </li> */}
                    </ul>
                    <ul className="navbar-nav w-100">
                        <li className="nav-item w-100">
                            <form className="nav-link mt-2 mt-md-0 d-none d-lg-flex search">
                                <input type="text" className="form-control" placeholder="Search products" />
                            </form>
                        </li>
                    </ul>

                    <button className="navbar-toggler navbar-toggler-right d-lg-none align-self-center" type="button"
                        data-toggle="offcanvas">
                        <span className="mdi mdi-format-line-spacing"></span>
                    </button>
                    <ul className="navbar-nav navbar-nav-right">
                        <li className="nav-item dropdown d-none d-lg-block">
                            <a className="nav-link btn btn-success create-new-button" id="createbuttonDropdown" data-toggle="dropdown"
                                aria-expanded="false" href="#">Login</a>
                            <div className="dropdown-menu dropdown-menu-right navbar-dropdown preview-list"
                                aria-labelledby="createbuttonDropdown">
                                <h6 className="p-3 mb-0">Projects</h6>
                                <div className="dropdown-divider"></div>
                                <a className="dropdown-item preview-item">
                                    <div className="preview-thumbnail">
                                        <div className="preview-icon bg-dark rounded-circle">
                                            <HomeOutlinedIcon />
                                        </div>
                                    </div>
                                    <div className="preview-item-content">
                                        <a href='home' className="preview-subject ellipsis mb-1">Admin</a>
                                    </div>
                                </a>
                                <div className="dropdown-divider"></div>
                                <a className="dropdown-item preview-item">
                                    <div className="preview-thumbnail">
                                        <div className="preview-icon bg-dark rounded-circle">
                                            <PeopleAltOutlinedIcon />
                                        </div>
                                    </div>
                                    <div className="preview-item-content">
                                        <a href='department' className="preview-subject ellipsis mb-1">Officer</a>
                                    </div>
                                </a>
                                <div className="dropdown-divider"></div>
                            </div>
                        </li>
                        {/* <li className="nav-item nav-settings d-none d-lg-block">
                            <a className="nav-link" href="#">
                                <i className="mdi mdi-view-grid"></i>
                            </a>
                        </li> */}
                    </ul>
                </div>
            </nav>
        </div>
    )
}

export default TopBar