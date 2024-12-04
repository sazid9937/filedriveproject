/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { SignedIn } from '@clerk/clerk-react';
import Login from './Login';
import { useAuth } from "./AuthContent";


const Header = () => {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate()
  const [showLogin, setShowLogin] = useState(false);

  // Toggle the login modal visibility
  const handleLoginClick = () => {
    setShowLogin(!showLogin);
  };

  const closeModal = () => {
    setShowLogin(false);
  };


  const handleLogoutClick = () => {
    logout();
    navigate("/");
  }

  return (
    <div className="relative z-10 border-b py-4 bg-gray-50">
      <div className="items-center container mx-auto justify-between flex">
        <Link to="/" className="flex gap-2 items-center text-xl text-black">
          <img src="/logo.png" width="50" height="50" alt="file drive logo" />
          FileDrive
        </Link>

        {isAuthenticated &&
          <Button variant={"outline"}>
            <Link to="/dashboard/files">Your Files</Link>
          </Button>
        }


        <div className="flex gap-2">
          {isAuthenticated ?
            <Button onClick={handleLogoutClick}>Logout</Button>
            :
            <Button onClick={handleLoginClick}>Sign In</Button>
          }
        </div>
      </div>

      {/* Conditionally render the Login modal */}
      {showLogin && <Login onClose={closeModal} />}
    </div>
  );
};

export default Header;
