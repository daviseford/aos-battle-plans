import React from 'react'
import { version } from '../../../package.json'

const PageFooter = () => {
  return (
    <div className="container-fluid bg-dark pb-2">
      <div className="text-center">
        <small className="text-white">AoS Battle Plans - Alpha - v{version}</small>
      </div>
    </div>
  )
}

export default PageFooter
