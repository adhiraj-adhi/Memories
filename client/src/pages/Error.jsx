import React from 'react'

const Error = () => {

    const errorStyling = {
        errorContainer : {
            height: "100vh",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center"
        },
        paraStyling : {
            fonySize: "0.9rem",
            color: "red",
        }
    }
  return (
    <div className='error_container' style={errorStyling.errorContainer}>
        <h2> Error !!! 401 </h2>
        <p style={errorStyling.paraStyling}> Most likely, you are attempting to access a resource for which you do not have permission...  </p>
    </div>
  )
}

export default Error