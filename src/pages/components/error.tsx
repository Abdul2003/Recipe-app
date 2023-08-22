import React, { useState } from 'react'
import image from '../../styles/images/404.jpg'
import '../../styles/error.css'
import '../../index.css'
import 'antd/dist/reset.css'
import { Button } from 'antd'
import { Link } from 'react-router-dom'

function loadError(props) {
  console.log(props.message)
  return (
    <div className="section">
      <img className="image" src={image} />
      <h1 className="md:text-2xl flex justify-center text-xl xl:text-3xl">
        {props.error}
      </h1>
      {props.error == 'Error 404' ? (
        <h3 className="text-base flex justify-center md:text-lg">
          Page Not Found
        </h3>
      ) : (
        <h3 className="text-base flex justify-center md:text-lg">
          Try Refreshing or
        </h3>
      )}

      <div className="flex justify-center">
        {window.innerWidth <= 766 ? (
          <Button className="button" size="middle" type="primary" shape="round">
            Back To HomePage
          </Button>
        ) : (
          <Button className="button" size="large" type="primary" shape="round">
            <Link
              to=""
              onClick={() => {
                window.location.href = '/'
              }}
            >
              Back To HomePage
            </Link>
          </Button>
        )}
      </div>
    </div>
  )
}

export default loadError
