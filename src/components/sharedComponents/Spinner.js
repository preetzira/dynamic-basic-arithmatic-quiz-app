import React from 'react'

const Spinner = (props) => {
  return <div className={`spinner-${props.className}`} role="status">
            <span className="sr-only">Loading...</span>
         </div>
}

export default Spinner
