import React from 'react'
import { Layout, Input, Carousel } from 'antd'
import { useHistory } from 'react-router-dom'
import className from '../styles/landing.module.css'
import 'antd/dist/reset.css'
import image from '../styles/images/background2.jpg'
// import Fade from 'react-reveal/Fade'
// import Flip from 'react-reveal/Flip'
import foodImgOne from '../styles/images/Omelet-PNG-HD.jpg'
import foodImgTwo from '../styles/images/Cooking-Recipe-PNG-Clipart.jpg'
import foodImgThree from '../styles/images/Cooking-Recipe-PNG-File.jpg'
import foodImgFour from '../styles/images/Juice-PNG-Pic.jpg'
import Footer from './components/footer'
import '../index.css'

const { Content } = Layout
const { Search } = Input

function landingPage() {
  const router = useHistory()

  const onSearch = (value) =>
    router.push({ search: `q=${value}`, pathname: `/:id/results` })

  return (
    <>
      <Layout className={className.layout}>
        <Content id="wrap">
          <div
            style={{
              backgroundImage: `url(${image})`,
            }}
            className={className.site_layout_content}
          >
            {' '}
            <div className={className.box}>
              <div className={className.column1}>
                {/* <Fade top> */}
                <h1 className="text-6xl font-bold text-amber-500 title">
                  Recipe Hub
                </h1>
                {/* </Fade>
                <Flip duration={3000} bottom> */}
                <h3 className={className.sub_title}>
                  Your One Stop Site For Recipes
                </h3>
                {/* </Flip> */}
                <Search
                  className={className.input_search}
                  placeholder="Search Recipe"
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
        </Content>
        <Footer />
      </Layout>
    </>
  )
}

export default landingPage
