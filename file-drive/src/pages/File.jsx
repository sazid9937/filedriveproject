// import React from 'react'
import { SideNav } from './dashboard/side-nav'
import { Dashboard } from './Dashboard'
const file = () => {
  return (
    <>
    <main className="container mx-auto pt-12 min-h-screen">
      <div className="flex gap-8">
        <SideNav />

        <div className="w-full">
            <Dashboard title="Your Files"/>
        </div>
      </div>
    </main>
    </>
  )
}

export default file