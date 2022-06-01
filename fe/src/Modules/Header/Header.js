import React from 'react'
import { FaSearch } from 'react-icons/fa';
import { FiLogOut } from 'react-icons/fi'
import { useNavigate } from 'react-router-dom';

const Header = () => {

    const history = useNavigate();

    const logout = () => {
        localStorage.clear();
        history('/login');
    }
    
  return (
    <header id="page-topbar" style={{ background: '#2a3042' }}>
    <div className="navbar-header">
        <div className="d-flex justify-content-between" style={{ padding: '30px', width: '100%' }}>

            <div className="navbar-brand-box">
                <a className="logo logo-dark">
                    <span className="logo-sm">
                        <img src="assets/images/logo.svg" alt="" height="22" />
                    </span>
                    <span className="logo-lg">
                        <img src="assets/images/logo-dark.png" alt="" height="17" />
                    </span>
                </a>

                <a href="index.html" className="logo logo-light">
                    <span className="logo-sm">
                        <img src="assets/images/logo-light.svg" alt="" height="22" />
                    </span>
                    <span className="logo-lg">
                        <img src="assets/images/logo-light.png" alt="" height="19" />
                    </span>
                </a>
            </div>

            {/* <button type="button" className="btn btn-sm px-3 font-size-16 d-lg-none header-item waves-effect waves-light" data-bs-toggle="collapse" data-bs-target="#topnav-menu-content">
                <i className="fa fa-fw fa-bars"></i>
            </button> */}

            <form className="app-search d-none d-lg-block">
                <div className="position-relative">
                    <input type="text" style={{
                        backgroundColor: 'rgba(243,243,249,.07)',
                        color: '#fff'
                    }} className="form-control" placeholder="Search..." />
                    <span className="bx bx-search-alt"><FaSearch /></span>
                </div>
            </form>
            <div style={{ color: '#ddd', cursor: 'pointer' }} onClick={() => logout()} className="d-flex align-items-center">
                <FiLogOut color='#ddd' size={22} style={{ marginRight: '12px' }} /> Logout
            </div>
        </div>

        <div className="d-flex">

            <div className="dropdown d-inline-block d-lg-none ms-2">
                <button type="button" className="btn header-item noti-icon waves-effect" id="page-header-search-dropdown" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <i className="mdi mdi-magnify"></i>
                </button>
                <div className="dropdown-menu dropdown-menu-lg dropdown-menu-end p-0" aria-labelledby="page-header-search-dropdown">

                    <form className="p-3">
                        <div className="form-group m-0">
                            <div className="input-group">
                                <input type="text" className="form-control" placeholder="Search ..." aria-label="Search input" />

                                <button className="btn btn-primary" type="submit"> <span className="bx bx-search-alt"><FaSearch /></span></button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>



        </div>
    </div>
</header>
  )
}

export default Header