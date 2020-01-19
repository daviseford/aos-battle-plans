import React from 'react'
import { version } from '../../../package.json'
import { GITHUB_URL } from 'utils/env'

const PageFooter = () => {
  return (
    <div className="container-fluid bg-dark pb-2">
      <div className="text-center">
        <p>
          {' '}
          <small className="text-white">
            Feedback is appreciated and needed while we work on this site.
            <br />
            Please direct it to our{' '}
            <a href={GITHUB_URL} className="text-white" target="blank">
              Github
            </a>
            , or{' '}
            <a href="https://twitter.com/daviseford" className="text-white" target="blank">
              @daviseford
            </a>
            , or{' '}
            <a href="https://twitter.com/PositiveVictim" className="text-white" target="blank">
              @PositiveVictim
            </a>
          </small>
        </p>
        <small className="text-white">AoS Battle Plans - Alpha - v{version}</small>
      </div>
    </div>
  )
}

export default PageFooter
