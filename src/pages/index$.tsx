import { Layout, Input, Carousel } from 'antd'
import React from 'react'
import '../styles/landing.css'
import 'antd/dist/antd.css'
import image from '../styles/images/background2.jpg'
import Fade from 'react-reveal/Fade'
import Flip from 'react-reveal/Flip'
import '../index.css'
import { useHistory } from 'react-router-dom'
import foodOne from '../styles/images/food1.jpg'
import foodTwo from '../styles/images/Omelet-PNG-HD.jpg'
import foodThree from '../styles/images/Cooking-Recipe-PNG-Clipart.jpg'
import foodFour from '../styles/images/Cooking-Recipe-PNG-File.jpg'
import foodFive from '../styles/images/Juice-PNG-Pic.jpg'
import Footer from './components/footer'

const { Content } = Layout
const { Search } = Input

function App() {
  const router = useHistory()

  const onSearch = (value) =>
    router.push({ search: `q=${value}`, pathname: `/:id` })

  return (
    <>
      <Layout className="layout">
        <Content id="wrap">
          <div
            style={{
              backgroundImage: `url(${image})`,
            }}
            className="site-layout-content"
          >
            {' '}
            <div className="box">
              <div className="column1">
                <Fade top>
                  <h1 className="text-6xl font-bold text-amber-500 title ">
                    Recipe Hub
                  </h1>
                </Fade>
                <Flip duration={3000} bottom>
                  <h3 className="sub-title">Your One Stop Site For Recipes</h3>
                </Flip>
                <Search
                  placeholder="Search Recipe"
                  onSearch={onSearch}
                  enterButton
                />
              </div>

              <div className="column2">
                <Carousel autoplay={true}>
                  <img className="banner" src={foodTwo} alt="Image 5" />
                  <img className="banner" src={foodThree} alt="Image 3" />
                  <img className="banner" src={foodFour} alt="Image 4" />
                  <img className="banner" src={foodFive} alt="Image 2" />
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

export default App
