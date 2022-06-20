import React from 'react'
import {FaAngleDown} from 'react-icons/fa'

import { Link } from "react-router-dom";

export const Header = () => {
  return (
    <header id="header" className="fixed-top d-flex align-items-center">
    <div className="container">	
        <div className="header-container d-flex align-items-center">	
            <div className="logo mr-auto">
                <h1 className="text-light">
                    <Link to={"/"}>
                     LIBCON
                    </Link>
                </h1>
                <div className='subLogo'>A CELECT Product</div>                        
            </div>				
            <nav className="nav-menu d-none d-lg-block">
                <ul>
                    <li className="drop-down">
                        <Link to={""}>
                        Productivity <FaAngleDown className='iconLeft'/>
                        </Link>
                        <ul>
                        <li><a href="/KOHA-library-management-system.aspx">KOHA</a></li>     
                        <li><a href="/Library-mobile-app.aspx">Library Mobile App</a></li>
                        <li><a href="/Dspace-digitalization.aspx">DSPACE</a></li>
                        <li><a href="/Meeting-room-manager-for-library.aspx">Meeting Room Manager</a></li>
                        <li><a href="/Digital-signage-system-for-library.aspx">Digital Signage Systems</a></li>
                        <li><a href="/School-library-software.aspx">School Library Software</a></li>
                        </ul>
                    </li>

                    <li className="drop-down">
                        <Link to={""}>
                        Automation <FaAngleDown className='iconLeft'/>
                        </Link>
                        <ul>
                            <li><a href="/Barcode-Printer-Scanner.aspx">Barcode Systems</a></li>                                    
                            <li><a href="/Smart-cards-for-library.aspx">Smart Cards</a></li>    
                            <li><a href="/Patron-identification-using-biometrics.aspx">Biometrics</a></li>
                            <li><a href="/Library-patron-traffic-counter.aspx">Patron Traffic Counter</a></li>
                            <li><a href="/Barcode-based-selfcheck.aspx">Barcode based Self Check</a></li>
                            <li><a href="/Library-opac-kiosk.aspx">OPAC Kiosks & Fine Panels</a></li>
                        </ul>

                  </li>
                    <li className="drop-down"><a href="">RFID <FaAngleDown className='iconLeft'/></a>
                        <ul>
                        <li><a href="/RFID-tags-for-library-automation.aspx">RFID Tags</a></li>
                        <li><a href="/RFID-staff-workstations.aspx">Staff Stations</a></li>
                        <li><a href="/RFID-selfcheck-system.aspx">Self Check Systems</a></li>                                
                        <li><a href="/Stock-taking-mobile-readers.aspx">Stock Taking Readers</a></li>
                        <li><a href="/RFID-security-gate-system.aspx">Security Gate</a></li>
                        <li><a href="/RFID-book-drop-system.aspx">Book Drop System</a></li>
                        <li><a href="/RFID-tattle-tape-hybrid-system.aspx">RFID + Tattle Tape Hybrid System</a></li>
                        </ul>
                    </li>
                    <li className="drop-down"><a href="">Tattle Tape <FaAngleDown className='iconLeft'/></a>
                        <ul>
                            <li><a href="/EM-tattle-tape-strips.aspx">Tattle tape</a></li>               
                            <li><a href="/EM-tattle-tape-workstation.aspx">Tattle tape Staff Workstation</a></li>
                            <li><a href="/EM-tattle-tape-security-gate.aspx">Tattle tape security gate</a></li>
                        </ul>
                    </li>
                    <li className="drop-down"><a href="">About <FaAngleDown className='iconLeft'/></a>
                        <ul>
                            <li><a href="/About-Libcon.aspx">About Us</a></li>               
                            <li><a href="/contact-libcon.aspx">Contact Us</a></li>
                            <li><a href="/Libcon-customers.aspx">Our Customers</a></li>
                            <li><a href="/blog/">LIBCON Blog</a></li>
                        </ul>
                    </li>  
                    <li className="get-started"><a target="_new" href="http://www.celect.in">CELECT</a></li>	
                </ul>	
            </nav>	
        </div>
    </div>
</header>
  )
}
