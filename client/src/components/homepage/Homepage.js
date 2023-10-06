import React from 'react'
import Navbar from '../navbar/Navbar'
import AllDataComponent from '../fetch user data/ShowStudents'

export default function Homepage() {
  return (
    <div>
        <Navbar/>
        <AllDataComponent/>
    </div>
  )
}
