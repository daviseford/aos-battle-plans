import React from 'react'

const PageHeader = () => {
  return (
    <div className="jumbotron jumbotron-fluid mb-0 py-2">
      <div className="container text-center">
        <h3 className="">AoS Battle Plans</h3>
        <p className="lead">
          From the creator of{' '}
          <a href="https://aosreminders.com" target="blank">
            AoS Reminders
          </a>{' '}
          and{' '}
          <a href="https://twitter.com/PositiveVictim" target="blank">
            @PositiveVictim
          </a>
        </p>
      </div>
    </div>
  )
}

export default PageHeader
