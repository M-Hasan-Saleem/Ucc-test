import { Link } from "react-router-dom";
import Logo from "../../assets/images/got.png";

export default function Sidenav() {
  function dd() {
    var element = document.getElementById("myDIV");
    element.classList.toggle("mystyle");
  }
  function addnav() {
    var element = document.getElementById("navadd");
    element.classList.toggle("open");
  }
  function addTour() {
    var element = document.getElementById("navTour");
    element.classList.toggle("open");
  }
  function addLeag() {
    var element = document.getElementById("navLeag");
    element.classList.toggle("open");
  }
  function addTopTen() {
    var element = document.getElementById("navTopTen");
    element.classList.toggle("open");
  }
  function adduser() {
    var element = document.getElementById("navuser");
    element.classList.toggle("open");
  }
  return (
    <div>
      <div
        className="main-menu menu-fixed menu-dark menu-accordion menu-shadow"
        data-scroll-to-active="true"
      >
        <div className="navbar-header">
          <ul className="nav navbar-nav flex-row">
            <li className="nav-item me-auto daslogo">
              <Link
                className="navbar-brand"
               to="/"
              >
                <span className="brand-logo">
                  <img src={Logo} alt="logo" />
                </span>
                {/* <h2 className="brand-text">GotNext</h2> */}
              </Link>
            </li>
            <li className="nav-item nav-toggle">
              <a
                className="nav-link modern-nav-toggle pe-0"
                data-bs-toggle="collapse"
                onClick={() => dd()}
              >
                <i className="fal fa-times feather feather-x d-block d-xl-none text-primary toggle-icon font-medium-5"></i>
              </a>
            </li>
          </ul>
        </div>
        <div className="shadow-bottom"></div>
        <div className="main-menu-content">
          <ul
            className="navigation navigation-main"
            id="main-menu-navigation"
            data-menu="menu-navigation"
          >
            <li className=" navigation-header">
              <span data-i18n="Apps &amp; Pages">Apps &amp; Pages</span>
              <i data-feather="more-horizontal"></i>
            </li>
            <li className=" nav-item">
              <Link className="d-flex align-items-center" to="/AllUsers">
                <i className="fal fa-users"></i>
                <span className="menu-title text-truncate" data-i18n="Email">
                  All Users
                </span>
              </Link>
            </li>
            <li className=" nav-item">
              <Link className="d-flex align-items-center" to="/AllRoles">
                <i className="fal fa-briefcase"></i>
                <span className="menu-title text-truncate" data-i18n="Email">
                  All Roles
                </span>
              </Link>
            </li>
            
            <li className=" nav-item">
              <Link className="d-flex align-items-center" to="/AllCategories">
                <i className="fal fa-users"></i>
                <span className="menu-title text-truncate" data-i18n="Email">
                  All Categories
                </span>
              </Link>
            </li>


            <li className=" nav-item">
              <Link className="d-flex align-items-center" to="/AllVideos">
                <i className="fal fa-video"></i>
                <span className="menu-title text-truncate" data-i18n="Email">
                  All Videos
                </span>
              </Link>
            </li>

            <li className=" nav-item">
              <Link className="d-flex align-items-center" to="/AllChannels">
                <i className="fal fa-tv"></i>
                <span className="menu-title text-truncate" data-i18n="Email">
                  All Channels
                </span>
              </Link>
            </li>

            <li className=" nav-item">
              <Link className="d-flex align-items-center" to="/AllMemberships">
                <i className="fal fa-bell"></i>
                <span className="menu-title text-truncate" data-i18n="Email">
                  All Memberships
                </span>
              </Link>
            </li>

            <li className=" nav-item">
              <Link className="d-flex align-items-center" to="/AllBlogs">
                <i className="fal fa-blog"></i>
                <span className="menu-title text-truncate" data-i18n="Email">
                  All Blogs
                </span>
              </Link>
            </li>

            <li className=" nav-item">
              <Link className="d-flex align-items-center" to="/AllPages">
                <i className="far fa-page-break"></i>
                <span className="menu-title text-truncate" data-i18n="Email">
                  All Pages
                </span>
              </Link>
            </li>

            <li className=" nav-item">
              <Link className="d-flex align-items-center" to="/MerchantPayment">
                <i className="fas fa-money-check-alt"></i>
                <span className="menu-title text-truncate" data-i18n="Email">
                  Merchant Payment Setup
                </span>
              </Link>
            </li>


            <li className=" nav-item">
              <Link className="d-flex align-items-center" to="/Orders">
                <i className="fas fa-bags-shopping"></i>
                <span className="menu-title text-truncate" data-i18n="Email">
                  Orders
                </span>
              </Link>
            </li>

          </ul>
        </div>
      </div>
    </div>
  );
}
