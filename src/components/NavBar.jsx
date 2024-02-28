import { useState } from "react";

import logo from "../logo.svg";

const AccountDropDown = ({ user, logout }) => {
    return (
        <div className="account-dropdown">
            <div className="user-detail">
                <div className="avatar">
                    <img src={user.photoURL} alt="Usr avatar" />
                </div>
                <div className="name">{user.displayName}</div>
            </div>
            <div className="user-detail">
                <div className="avatar icon">
                    <img src={logo} alt="Jabber Chat" />
                </div>
                <div className="user-email">
                    @{user.email.split("@")[0]}
                </div>
            </div>
            <div className="logout-container">
                <button onClick={logout}>Logout</button>
            </div>
        </div>
    )
}

const Navbar = ({ user, logout }) => {
    console.log(user);
    const [showDropDown, setShowDropDown] = useState(false);
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
            <div className="user-info">
                <div className="avatar-container" onClick={() => { setShowDropDown(!showDropDown) }}>
                    <img src={user.photoURL} alt={`${user.displayName} avatar`} />
                </div>
            </div>
            {showDropDown && <AccountDropDown user={user} logout={logout} />}
        </nav>
    );
}

export default Navbar;