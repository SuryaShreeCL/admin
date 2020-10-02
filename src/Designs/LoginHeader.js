import React from 'react'
import 'bootstrap/dist/css/bootstrap.css'
import './asset/login.css'

export default function Login_Header() {
    return (
        <div>
            <div className="login-header">
                <nav className="navbar navbar-expand-lg navbar-light bg-primary fixed-top">
                    <div className="container">
                        <img className="home-logo" src="https://mernlmsassets.s3.ap-south-1.amazonaws.com/img/Careerlabs.png" alt="CareerLabs" />
                    </div>
                </nav>
            </div>
        </div>
    )
}
