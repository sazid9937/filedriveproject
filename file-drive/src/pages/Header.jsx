/* eslint-disable no-unused-vars */
import React from 'react'
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { SignedIn, SignedOut, SignInButton, UserButton ,OrganizationSwitcher } from "@clerk/clerk-react";
const Header = () => {
  return (
    <div className="relative z-10 border-b py-4 bg-gray-50">
      <div className="items-center container mx-auto justify-between flex">
        <Link to="/" className="flex gap-2 items-center text-xl text-black">
          <img src="/logo.png" width="50" height="50" alt="file drive logo" />
          FileDrive
        </Link>

        <SignedIn>
          <Button variant={"outline"}>
            <Link to="/file">Your Files</Link>
          </Button>
        </SignedIn>

        <div className="flex gap-2">
          <OrganizationSwitcher />
          <UserButton />
          <SignedOut>
            <SignInButton>
              <Button>Sign In</Button>
            </SignInButton>
          </SignedOut>
        </div>
      </div>
    </div>
  )
}

export default Header