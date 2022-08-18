import React from 'react'

function NavbarComponent() {
    return (
        <div>
            <nav className="navbar navbar-dark bg-dark">

                <a className="navbar-brand" href="/">
                    <span>Payment Management System</span>
                </a>

                <button className='btn btn-light'><a href="http://localhost:3000/dashboard">Dashboard</a></button>
            </nav>

            
        </div>
    )
}

export default NavbarComponent
