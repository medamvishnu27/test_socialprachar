import React, { useEffect, useState } from "react";
import navBarStyle from "./navbar.module.css";
import course2 from "../../assets/02.svg";
import course3 from "../../assets/04.svg";
import course6 from "../../assets/01.svg";
import spLogo from "../../assets/SP_Logo.png";


import { Link, useLocation, useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone, faTrophy } from "@fortawesome/free-solid-svg-icons";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import Marquee from 'react-fast-marquee';
import { faGraduationCap, faUsers, faHandshake, faMedal } from "@fortawesome/free-solid-svg-icons";

const NavBar = () => {
  const location = useLocation();



  const dropDownValues = [
    { label: "Data Science + AI", path: "/data-science" },
    { label: "Full Stack Program", path: "/full-stack-developer-course" },
    { label: "Digital Marketing", path: "/digital-marketing-course-training-institute-hyderabad" }
  ];

  const navigate = useNavigate();
  const [selectedValue, setSelectedValue] = useState("");

  const handleCategoryClick = (path, category) => {
    navigate(path, { state: { category } });
  };

  const handleCategoryDropDown = (event) => {
    const selectedIndex = event.target.selectedIndex;
    if (selectedIndex > 0) {
      const selectedOption = dropDownValues[selectedIndex - 1]; // Adjust for default option
      navigate(selectedOption.path, { state: { category: selectedOption.label } });
      setSelectedValue(""); // Reset dropdown after navigation
    }
  };

  const [expanded, setExpand] = useState(false);
  const Showtoggle = () => {
    setExpand(!expanded);
  };
  const closeToggle = () => {
    setExpand(false);
  };

  useEffect(() => { }, [handleCategoryClick]);
  const isCareerWorkshopPage =
    location.pathname === "/Career-Success-workshop";

  // for drop Down
  const [dropdowns, setDropdowns] = useState({
    dropdown1: false,
    dropdown2: false,
  });

  const toggleDropdown = (dropdown) => {
    setDropdowns((prevState) => ({
      ...prevState,
      [dropdown]: !prevState[dropdown], // Toggle only the clicked dropdown
    }));
  };

  const closeDropdown = (dropdown) => {
    setDropdowns((prevState) => ({
      ...prevState,
      [dropdown]: false, // Close only the specified dropdown
    }));
  };

  const marqueeItems = [
    { text: "Recent Best Package 16 LPA", icon: <FontAwesomeIcon icon={faTrophy} className="me-3" style={{ color: 'white' }} /> },
    { text: "Learn Till Get Placed", icon: <FontAwesomeIcon icon={faGraduationCap} className="me-3" style={{ color: 'white' }} /> },
    { text: "Micro Batches - Just 15 students!", icon: <FontAwesomeIcon icon={faUsers} className="me-3" style={{ color: 'white' }} /> },
    { text: "Get Guaranteed Internships & Full-Time Jobs", icon: <FontAwesomeIcon icon={faHandshake} className="me-3" style={{ color: 'white' }} /> },
    { text: "16,000+ Success stories since 2014", icon: <FontAwesomeIcon icon={faMedal} className="me-3" style={{ color: 'white' }} /> },
  ];


  return (
    <div className={`${navBarStyle.navBarSticky}`}>
      {/* second nav bar starts */}
      <div className="py-1" style={{ background: '#553cdf' }}>
        <Marquee speed={80} gradient={false} className="fs-5 fw-semibold">
          {marqueeItems.map((item, index) => (
            <span key={index} className="mx-5 d-flex align-items-center">
              <span style={{ fontSize: '30px' }}>{item.icon} </span><span style={{ color: 'white' }}>{item.text}</span>
            </span>
          ))}
        </Marquee>
      </div>


      <nav className={`navbar navbar-expand-lg ${navBarStyle.secondNav}`}>
        <div
          className={`${navBarStyle.containerfluidForNav} container-fluid`}
        >
          {/* brand name and category code start */}
          <div className="d-flex">
            <a className="navbar-brand" href="http://socialprachar.com">
              <img src={spLogo} className={`${navBarStyle.spLogo}`} />
            </a>

            {!isCareerWorkshopPage && (
              <div className="d-flex align-items-center">
                <select
                  className={`form-select ${navBarStyle.selectDropDown}`}
                  value={selectedValue}
                  onChange={handleCategoryDropDown}
                >
                  <option>Courses</option>
                  {dropDownValues.map((item, index) => (
                    <option key={index} value={item.label}>
                      {item.label}
                    </option>
                  ))}
                </select>
              </div>
            )}



          </div>

          {/* brand name and category code start */}

          {/* togglet code starts  */}
          <button
            className={`navbar-toggler ${navBarStyle.navbarTogglerBar}`}
            type="button"
            onClick={Showtoggle}
          >
            <span className="navbar-toggler-icon "></span>
          </button>
          {/* togglet code ends  */}


          {/* navigation code starts */}

          <div className={`${navBarStyle.navBarList}`}>
            <div
              className={`collapse navbar-collapse offcanvas offcanvas-end ${navBarStyle.offCanvasContaniner}  ${!!expanded && "show"}`}
            >
              <div
                className={`offcanvas-header  ${navBarStyle.offCanvasContaninerHeader}`}
              >
                <button
                  type="button"
                  className="btn-close btn-close-white"
                  style={{ position: "absolute", left: 0 }}
                  onClick={Showtoggle}
                  data-bs-dismiss="offcanvas"
                  aria-label="Close"
                ></button>
              </div>

              <ul className="navbar-nav me-auto mb-lg-0 gap-3 ">
                <li className="nav-item d-flex">
                  <NavLink
                    to={"/"}
                    className={`nav-link ${navBarStyle.NavLinkForHover}`}
                    onClick={closeToggle}
                  >
                    Home
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    to={"/courses"}
                    className={`nav-link ${navBarStyle.NavLinkForHover}`}
                    onClick={closeToggle}
                  >
                    Courses
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    to={"/success-stories"}
                    className={`nav-link ${navBarStyle.NavLinkForHover}`}
                    onClick={closeToggle}
                  >
                    Success Stories
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    to={"/career-counselling"}
                    className={`nav-link ${navBarStyle.NavLinkForHover}`}
                    onClick={closeToggle}
                  >
                    Career Workshop
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    to={"/upcoming-batches"}
                    className={`nav-link ${navBarStyle.NavLinkForHover}`}
                    onClick={closeToggle}
                  >
                    Upcoming Batches
                  </NavLink>
                </li>
                <li className="nav-item" onMouseLeave={() => closeDropdown("dropdown2")}>
                  <NavLink
                    className={`nav-link navbar-toggle dropdown-toggle ${navBarStyle.NavLinkForHover}`}
                    onClick={() => toggleDropdown("dropdown2")}
                  >
                    Subscription
                  </NavLink>
                  <div className={`dropdown-menu ${dropdowns.dropdown2 ? "show" : ""} ${navBarStyle.customDropdown}`}>

                    <NavLink
                      to="/subscription/working-professionals" // ✅ Absolute Path
                      className="dropdown-item"
                      onClick={() => {
                        closeDropdown("dropdown2");
                        closeToggle();
                      }}
                    >
                      Working Professionals
                    </NavLink>
                    <NavLink
                      to="/subscription/students" // ✅ Lowercase "students"
                      className="dropdown-item"
                      onClick={() => {
                        closeDropdown("dropdown2");
                        closeToggle();
                      }}
                    >
                      Students
                    </NavLink>
                  </div>
                </li>



                <li className="nav-item" onMouseLeave={() => closeDropdown("dropdown1")}>
                  <NavLink
                    className={`nav-link navbar-toggle dropdown-toggle ${navBarStyle.NavLinkForHover}`}
                    onClick={() => toggleDropdown("dropdown1")}
                  >
                    More
                  </NavLink>
                  <div className={`dropdown-menu ${dropdowns.dropdown1 ? "show" : ""} ${navBarStyle.customDropdown}`}>

                    <NavLink
                      to="/aboutUs"
                      className="dropdown-item"
                      onClick={() => {
                        closeDropdown("dropdown1");
                        closeToggle();
                      }}
                    >
                      About us
                    </NavLink>
                    <NavLink
                      to="/courseBlog"
                      className="dropdown-item"
                      onClick={() => {
                        closeDropdown("dropdown1");
                        closeToggle();
                      }}
                    >
                      courseBlog
                    </NavLink>

                    <NavLink
                      to="/codeclash"
                      className="dropdown-item"
                      onClick={() => {
                        closeDropdown("dropdown1");
                        closeToggle();
                      }}
                    >
                      codeclash
                    </NavLink>

                    <NavLink
                      to="/events"
                      className="dropdown-item"
                      onClick={() => {
                        closeDropdown("dropdown1");
                        closeToggle();
                      }}
                    >
                      Events
                    </NavLink>
                    <a
                      href="https://finversity.in"
                      className="dropdown-item"
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => {
                        closeDropdown("dropdown1");
                        closeToggle();
                      }}
                    >
                      Finversity
                    </a>
                    <NavLink
                      to="/scholarship-test"
                      className="dropdown-item"
                      onClick={() => {
                        closeDropdown("dropdown1");
                        closeToggle();
                      }}
                    >
                      Scholarship Test
                    </NavLink>
                    <NavLink
                      to="/socialhire"
                      className="dropdown-item"
                      onClick={() => {
                        closeDropdown("dropdown1");
                        closeToggle();
                      }}
                    >
                      SocialHire
                    </NavLink>
                    <NavLink
                      to="projects"
                      className="dropdown-item"
                      onClick={() => {
                        closeDropdown("dropdown1");
                        closeToggle();
                      }}
                    >
                      Students-Projects
                    </NavLink>
                  </div>
                </li>



              </ul>
            </div>
          </div>
          {/* search icon and login button code ends */}
        </div>
      </nav>

      {/* second nav bar ends */}

      {/* search bar */}
    </div>
  );
};

export default NavBar;
