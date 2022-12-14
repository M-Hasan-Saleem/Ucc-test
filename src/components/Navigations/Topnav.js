import React, { Fragment, useEffect, useState } from "react";
import avatar from "../../assets/images/avtar/avatar-s-11.jpg";
import { useNavigate } from "react-router-dom";
import { User, Power, Settings } from "react-feather";
import { Link } from "react-router-dom";
import{Badge,UncontrolledDropdown,DropdownMenu,DropdownItem,DropdownToggle,Input,Button,}from "reactstrap";
import classnames from "classnames";
import PerfectScrollbar from "react-perfect-scrollbar";
import { Bell, X, Check, AlertTriangle } from "react-feather";
import Logo from "../../assets/images/got.png";
import './top.css'
import { domain } from "../../utils/baseUrl";
import DefaultImage from '../../assets/images/default.png'

export default function Topnav() {
  function addnav() {
    var element = document.getElementById("navadd");
    element.classList.toggle("open");
  }
  function dd() {
    var element = document.getElementById("myDIV");
    element.classList.toggle("mystyle");
  }
  const navigate = useNavigate();
  const logout = ()=>{
    localStorage.clear()
    navigate("/login");
    
  } 

  // ** Notification Array
  const notificationsArray = [
    {
      img: require("../../assets/images/avtar/avatar-s-11.jpg").default,
      subtitle: "Won the monthly best seller badge.",
      title: (
        <p className="media-heading">
          <span className="fw-bolder">Congratulation Sam 🎉</span>winner!
        </p>
      ),
    },
    {
      img: require("../../assets/images/avtar/avatar-s-11.jpg").default,
      subtitle: "You have 10 unread messages.",
      title: (
        <p className="media-heading">
          <span className="fw-bolder">New message</span>&nbsp;received
        </p>
      ),
    },
    {
      avatarContent: "MD",
      color: "light-danger",
      subtitle: "MD Inc. order updated",
      title: (
        <p className="media-heading">
          <span className="fw-bolder">Revised Order 👋</span>&nbsp;checkout
        </p>
      ),
    },
    {
      title: <h6 className="fw-bolder me-auto mb-0">System Notifications</h6>,
      switch: (
        <div className="form-switch">
          <Input
            type="switch"
            id="primary"
            name="primary"
            inline="true"
            defaultChecked
          />
        </div>
      ),
    },
    {
      avatarIcon: <X size={14} />,
      color: "light-danger",
      subtitle: "USA Server is down due to hight CPU usage",
      title: (
        <p className="media-heading">
          <span className="fw-bolder">Server down</span>&nbsp;registered
        </p>
      ),
    },
    {
      avatarIcon: <Check size={14} />,
      color: "light-success",
      subtitle: "Last month sales report generated",
      title: (
        <p className="media-heading">
          <span className="fw-bolder">Sales report</span>&nbsp;generated
        </p>
      ),
    },
    {
      avatarIcon: <AlertTriangle size={14} />,
      color: "light-warning",
      subtitle: "BLR Server using high memory",
      title: (
        <p className="media-heading">
          <span className="fw-bolder">High memory</span>&nbsp;usage
        </p>
      ),
    },
  ];
  /*eslint-disable */
  const renderNotificationItems = () => {
    return (
      <PerfectScrollbar
        component="li"
        className="media-list scrollable-container"
        options={{
          wheelPropagation: false,
        }}
      >
        {notificationsArray.map((item, index) => {
          return (
            <a
              key={index}
              className="d-flex"
              href="/"
              onClick={(e) => e.preventDefault()}
            >
              <div
                className={classnames("list-item d-flex", {
                  "align-items-start": !item.switch,
                  "align-items-center": item.switch,
                })}
              >
                {!item.switch ? (
                  <Fragment>
                    <div className="me-1"></div>
                    <div className="list-item-body flex-grow-1">
                      {item.title}
                      <small className="notification-text">
                        {item.subtitle}
                      </small>
                    </div>
                  </Fragment>
                ) : (
                  <Fragment>
                    {item.title}
                    {item.switch}
                  </Fragment>
                )}
              </div>
            </a>
          );
        })}
      </PerfectScrollbar>
    );
  };
  /*eslint-enable */

  const [AdminData, setAdminData] = useState([]);
  const [profilePicUrl, setprofilePicUrl] = useState('')

    useEffect(() => {
        let data =  localStorage.getItem('GotNextAdmin');
        setAdminData(JSON.parse(data))
    }, [])

    useEffect(() => {
      setprofilePicUrl(AdminData.profilePic)
    }, [AdminData])

  return (
    <div>
      <nav className="header-navbar navbar navbar-expand-lg align-items-center floating-nav navbar-dark navbar-shadow container-xxl">
        <div className="navbar-container d-flex content">
          <div className="bookmark-wrapper d-flex align-items-center">
            <ul className="nav navbar-nav d-xl-none">
              <li className="nav-item">
                <a className="nav-link menu-toggle" href="#" onClick={() => dd()}>
                  <i className="fal fa-bars"></i>
                </a>
              </li>
            </ul>

            <ul className="nav navbar-nav">
              <li className="nav-item d-none d-lg-block">
                <a className="nav-link bookmark-star">
                  <i className="ficon text-warning" data-feather="star"></i>
                </a>
                <div className="bookmark-input search-input">
                  <div className="bookmark-input-icon">
                    <i data-feather="search"></i>
                  </div>
                 <input className="form-control input" type="text" placeholder="Bookmark" tabIndex="0" data-search="search" />
                  <ul className="search-list search-list-bookmark"></ul>
                </div>
              </li>
            </ul>
          </div>
          <ul className="nav navbar-nav align-items-center ms-auto">
            {/* <UncontrolledDropdown tag="li" className="dropdown-notification nav-item me-25" >
             <DropdownToggle tag="a" className="nav-link" href="/" onClick={(e) => e.preventDefault()}>
                <Bell size={21} />
                <Badge pill color="danger" className="badge-up"> 5 </Badge>
              </DropdownToggle>
              <DropdownMenu end tag="ul" className="dropdown-menu-media mt-0">
                <li className="dropdown-menu-header">
                  <DropdownItem className="d-flex" tag="div" header>
                    <h4 className="notification-title mb-0 me-auto">
                      Notifications
                    </h4>
                    <Badge tag="div" color="light-primary" pill> 6 New </Badge>
                  </DropdownItem>
                </li>
                {renderNotificationItems()}
                <li className="dropdown-menu-footer">
                  <Button color="primary" block>
                    Read all notifications
                  </Button>
                </li>
              </DropdownMenu>
            </UncontrolledDropdown> */}
            <UncontrolledDropdown tag="li" className="dropdown-user nav-item">
              <DropdownToggle href="/" tag="a" className="nav-link dropdown-user-link" onClick={(e) => e.preventDefault()}
>
                <div className="user-nav d-sm-flex d-none">
                  <span className="user-name fw-bold">{"UCC on Demand"}</span>
                  <span className="user-status">{"Admin"}</span>
                </div>
                <img src={profilePicUrl ? `${domain}${profilePicUrl}` : DefaultImage} alt="profile"/>
            
              </DropdownToggle>
              <DropdownMenu end>
                

                <DropdownItem tag={Link} to = "/Profile ">
                  <User size={14} className="me-75" />
                  <span className="align-middle">Profile</span>
                </DropdownItem>
                <DropdownItem onClick={() => logout()}>
                  <Power size={14} className="me-75" />
                  <span className="align-middle">Logout</span>
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </ul>
        </div>
      </nav>
    </div>
  );
}
