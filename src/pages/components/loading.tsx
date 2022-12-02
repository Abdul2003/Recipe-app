import * as React from 'react'
import { Spin } from 'antd'
import '../../styles/loading.css'
function loading() {
  return (
    <div>
      <Spin className="spin" size="large" tip="Loading..." />
    </div>
  )
}

export default loading
