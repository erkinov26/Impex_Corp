import React from "react"
import "@styles/components/Loader.scss"

const Loader = () => {
  return (
    <div className="wrapper">
      <div className="lds-dual-ring">
        <h2>Loading...</h2>
      </div>
    </div>
  )
}

export default Loader
