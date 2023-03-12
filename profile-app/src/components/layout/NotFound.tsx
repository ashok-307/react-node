import React from 'react'

function NotFound() {
  return (
    <section className="container">
        <h1 className="x-large text-primary">
            <i className="fa fa-exclamation-triangle"></i>{' '} Page Not Found
        </h1>
        <p className="large">Sorry, this page does not exist</p>
    </section>
  )
}

export default NotFound;
