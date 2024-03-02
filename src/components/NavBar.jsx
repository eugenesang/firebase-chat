import { useState } from "react";

import logo from "../logo.svg";

const AccountDropDown = ({ user, logout, close }) => {
    const { displayName, photoURL, email } = user;
    return (
        <div className="account-dropdown">
            <div className="cancel">
                <i className="fas fa-xmark" onClick={close}></i>
            </div>
            <div className="email-container">
                <p>{email}</p>
            </div>
            <div className="avatar-img">
                <img src={photoURL} alt={`${displayName} avatar`} />
            </div>
            <div className="user-name">
                <p>Hi, {displayName.split(" ")[0]}!</p>
            </div>
            <div className="account-action">
                <button>Manage Your Account</button>
            </div>
            <div className="actions">
                <button onClick={logout}>Logout</button>
                <button>Contacts</button>
            </div>
        </div>
    )
}

const LogoutOkCancel = ({ logout, cancelLogout }) => {
    return (
        <div className="logout-ok-cancel-container">
            <div className="logout-ok-cancel">
                <div className="text">Are you sure you want to logout?</div>
                <div className="actions">
                    <button onClick={logout} className="okBtn" >Yes</button>
                    <button onClick={cancelLogout} className="cancelBtn">Cancel</button>
                </div>
            </div>
        </div>
    )
}

const Navbar = ({ user, logout }) => {
    const [showDropDown, setShowDropDown] = useState(false);
    const [showLogout, setShowLogout] = useState(false);
    return (
        <nav>
            <div className="logo-container">
                <div className="logo">
                    <img src={logo} alt="logo" />
                </div>
                <div className="brand-name">
                    Jabber Chat Base
                </div>
            </div>
            <div className="user-info" >
                <div className="help" title="Help">
                    <i className="fas fa-circle-question"></i>
                </div>
                <div className="notifications" title="Notifications">
                    <i className="fas fa-bell"></i>
                </div>
                <div className="avatar-container" title="Account" onClick={() => { setShowDropDown(!showDropDown) }}>
                    <img src={user.photoURL} alt={`${user.displayName} avatar`} />
                </div>
            </div>
            {showDropDown && <AccountDropDown user={user} logout={() => { setShowLogout(!showLogout) }} close={() => { setShowDropDown(false) }} />}
            {showLogout && <LogoutOkCancel logout={logout} cancelLogout={() => { setShowLogout(false); }} />}
        </nav>
    );
}

export default Navbar;