import React, { useState } from 'react';
import {auth,db} from "../../firebase";
import {doc,getDoc} from "firebase/firestore";
import { Link, Outlet, useNavigate } from 'react-router-dom';
import style from './Menu.module.css'

const MenuBar = () => {
    const navigate=useNavigate();
    async function handleLogout(){
        try{
            await auth.signOut();
            navigate('/login')
            console.log("user Logging out Successfully")
        }
       catch(error){
        console.log("Error logging out: " ,error.message)
       }
    }

    const [activeLink, setActiveLink] = useState('Dashboard');

    const handleClick = (link) => {
      setActiveLink(link);
    };
    const [sidebarVisible, setSidebarVisible] = useState(false);

    const handleSidebarToggle = () => {
      setSidebarVisible(!sidebarVisible);
    };
  
    return (

<>
<div className={`container-fluid ${style.menuBar}`}>
<div className="container-fluid">
        <div className="row">
            <div className={`col-12 ${style.sideNavbar} col-md-3 col-lg-3 d-md-block collapse`}>
                <nav style={{border:'1px solid  #cbc0f3',borderRadius:'10px'}}>
                    <ul className='nav flex-column'>
                        <li className="nav-item"><Link className="nav-link" to='/profile'><i
                                className='bi bi-speedometer2'></i>Dashboard</Link></li>
                        <li className="nav-item"><Link className="nav-link" to='myprofile'><i
                                className='bi bi-person-fill'></i> My Profile</Link></li>
                        <li className="nav-item"><Link className="nav-link" to='mywork'><i
                                className='bi bi-list-task'></i> My Work</Link></li>     
                        <li className="nav-item"><Link className="nav-link" to='enrolled-courses'><i
                                className='bi bi-mortarboard-fill'></i> Enrolled Courses</Link></li>
                        <li className="nav-item"><Link className="nav-link" to='wishlist'><i
                                className="bi bi-bookmark-fill"></i> Wishlist</Link></li>
                        <li className="nav-item"><Link className="nav-link" to='reviews'><i
                                className="bi bi-star-fill"></i> Reviews</Link></li>
                        <li className="nav-item"><Link className="nav-link" to='quizAttempts'><i
                                className="bi bi-ui-checks-grid"></i>My Quiz Attempts</Link></li>
                        <li className="nav-item"><Link className="nav-link" to='orderHistory'><i
                                className="bi bi-cart-fill"></i>Order History</Link></li>
                        <li className="nav-item"><Link className="nav-link" to='question-answer'><i
                                className="bi bi-question-circle-fill"></i>Question & answer</Link></li>
                        <li className="nav-item"><Link className="nav-link" to='settings'><i
                                className="bi bi-gear-fill"></i>Settings</Link></li>
                        <li className="nav-item"><Link href="#" className="nav-link" onClick={handleLogout}><i
                                className="bi bi-box-arrow-right"></i> Logout</Link></li>
                    </ul>
                </nav>
            </div>
    <div  className={`${style.toggle} d-lg-none ${activeLink === 'Dashboard' || activeLink === 'Quiz Attempts' ? 'd-none' : 'd-block'}`}>
    <nav>
      <ul className='nav flex-column'>
        <li className="nav-item"><Link className="nav-link" to='/profile'><i className="bi bi-speedometer2"></i>Dashboard</Link></li>
        <li className="nav-item"><Link className="nav-link" to='myprofile'><i className="bi bi-person-fill"></i> My Profile</Link></li>
        <li className="nav-item"><Link className="nav-link" to='mywork'><i className="bi bi-list-task"></i> My Work</Link></li>
        <li className="nav-item"><Link className="nav-link" to='enrolled-courses'><i  className="bi bi-mortarboard-fill"></i> Enrolled Courses</Link></li>
        <li className="nav-item"><Link className="nav-link" to='wishlist'><i  className="bi bi-bookmark-fill"></i> Wishlist</Link></li>
        <li className="nav-item"><Link className="nav-link" to='reviews'><i className="bi bi-star-fill"></i> Reviews</Link></li>
        <li className="nav-item"><Link className="nav-link" to='quizAttempts'><i className="bi bi-ui-checks-grid"></i>My Quiz Attempts</Link></li>
        <li className="nav-item"><Link className="nav-link" to='orderHistory'><i className="bi bi-cart-fill"></i>Order History</Link></li>
        <li className="nav-item"><Link className="nav-link" to='question-answer'><i className="bi bi-question-circle-fill"></i>Question & answer</Link></li>
        <li className="nav-item"><Link className="nav-link" to='settings'><i className="bi bi-gear-fill"></i>Settings</Link></li>
        <li className="nav-item"><Link href="#" className="nav-link" onClick={handleLogout}><i className="bi bi-box-arrow-right"></i> Logout</Link></li>
      </ul>
      </nav>
    </div>
            <div className={`${style.mainContent} d-block col-12 col-md-9`}>
                <div style={{ padding: '10px', border:'1px solid #cbc0f3',borderRadius:'10px', wordWrap:'break-word'}}>
                    <Outlet />
                </div>
            </div>
            </div>
    </div>
    </div>
    <div className={`${style.bottomNav}`}>
    <div className='navbar' >
      <div className={`nav-item ${style.bottomNavItem}`}>
      <i className="bi bi-speedometer2"></i>
        <Link
          className={`${style.bottomNavLink} ${activeLink === 'Dashboard' ? style.active : ''}`}
          onClick={()=>{
            handleSidebarToggle()
            handleClick('Dashboard')
          }} to='/profile'
        >
          Dashboard
        </Link>
      </div>
      <div className={`nav-item ${style.bottomNavItem}`}>
      <i className="bi bi-ui-checks-grid"></i>
        <Link
          className={`${style.bottomNavLink} ${activeLink === 'Quiz Attempts' ? style.active : ''} `}
            onClick={() =>{
            handleSidebarToggle()
            handleClick('Quiz Attempts')}} to='quizAttempts'
        >
          Quiz Attempts
        </Link>
      </div>
      <div className={`nav-item ${style.bottomNavItem}`}>
      <i className="bi bi-list"></i>
        <Link
          className={`${style.bottomNavLink} 
            ${activeLink === 'Menu' ? style.active:''} `}
          onClick={() => handleClick('Menu')} to='/profile#'
        >
          Menu
        </Link>
        </div>
      </div>
    </div>
    </>

      
    );
};

export default MenuBar;