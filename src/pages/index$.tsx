import React, { useState } from 'react'
import { Input, Carousel } from 'antd'
import { useHistory } from 'react-router-dom'
import className from '../styles/landing.module.css'
import image from './resturant.jpg'
import foodImgOne from '../styles/images/Omelet-PNG-HD.jpg'
import foodImgTwo from '../styles/images/Cooking-Recipe-PNG-Clipart.jpg'
import foodImgThree from '../styles/images/Cooking-Recipe-PNG-File.jpg'
import foodImgFour from '../styles/images/Juice-PNG-Pic.jpg'
import Footer from './components/footer'
import search from './components/search'

const { Search } = Input

function landingPage() {
  const [placeholder, setPlaceholder] = useState('Search A Recipe')
  const [status, setStatus] = useState(null)
  const router = useHistory()
  const onSearch = (value) => {
    if (value == '') {
      setPlaceholder('This Field Should Not Be Empty')
      setStatus('error')
    } else {
      router.push({ search: `q=${value}`, pathname: `/:id/results` })
    }
  }

  return (
    <>
      <div
        style={{
          backgroundImage: `url(${image})`,
        }}
        className={className.site_layout_content}
      >
        <div className={className.box}>
          <div className={className.column1}>
            <h1 className="text-6xl font-bold text-amber-500">Recipe Hub</h1>
            <h3 className={className.sub_title}>
              Your One Stop Site For Recipes
            </h3>
            <Search
              className={className.input_search}
              placeholder={placeholder}
              status={status}
              onSearch={onSearch}
              enterButton
            />
          </div>
          <div className={className.column2}>
            <Carousel className={className.carousel} autoplay={true}>
              <img
                className={className.banner}
                src={foodImgOne}
                alt="Image 1"
              />
              <img
                className={className.banner}
                src={foodImgTwo}
                alt="Image 2"
              />
              <img
                className={className.banner}
                src={foodImgThree}
                alt="Image 3"
              />
              <img
                className={className.banner}
                src={foodImgFour}
                alt="Image 4"
              />
            </Carousel>
          </div>
        </div>{' '}
      </div>
      <Footer />
    </>
  )
}

export default landingPage
