import * as React from 'react'
import { Layout } from 'antd'
const { Footer } = Layout
function Foot(id) {
  return (
    <Layout>
      <Footer
        style={{
          textAlign: 'center',
          fontSize: '20px',
          backgroundColor: '#f59e0b',
        }}
      >
        Designed By Abdul
      </Footer>
    </Layout>
  )
}

export default Foot
