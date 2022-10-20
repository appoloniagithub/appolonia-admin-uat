import React from "react"

const Horizental = ({ content }) => {
  return (
    <div
      style={{
        display: "flex",
        overflowX: "scroll",
        width: "100%",
      }}
    >
      {content}
    </div>
  )
}

export default Horizental
