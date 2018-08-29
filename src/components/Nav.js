import React, {Component} from 'react';
import HomeIcon  from '@material-ui/icons/Home';
import DeleteIcon from '@material-ui/icons/Delete';

class Nav extends Component {

    render()
    {
        return (
            <nav className="navbar">
                <span id="navbar-toggle">
                    <i className="fas fa-bars"></i>
                </span>
               
                <img style={{maxWidth:'100%'}} src="assets/images/logos/transmax-image.png" alt="transmax"/>
                <img style={{maxWidth:'100%'}} src="assets/images/phone.png" alt="phone"/>
                <ul id="main-nav">
                    <li>
                     
                            <DeleteIcon/>
                       
                        <a href="#" className="nav-links">Home</a>
                    </li>
               
                    <li>
                        <a href="#" className="nav-links">Contact Us</a>
                    </li>
                    <li>
                        <a href="#" className="nav-links">Sign In</a>
                    </li>
                </ul>
            </nav>    
        )
    }
}

export default Nav;