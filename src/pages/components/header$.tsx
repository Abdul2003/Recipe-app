import React, { useState, useEffect } from 'react'
import { Layout, Input } from 'antd'
import { Link } from 'react-router-dom'
import { useParams } from 'react-router-dom'
// import Searchbox from './search'
import '../../styles/header.css'
import Search from './search'

// import Sidenav from './Sidenav'

function HomeLayout(props) {
  return (
    <div className="topNav">
      <Link
        className="topNav-title"
        to=""
        onClick={() => {
          window.location.href = '/'
        }}
      >
        Recipe Hub
      </Link>

      <Search search={props.input} />
    </div>
  )
}
export default HomeLayout
