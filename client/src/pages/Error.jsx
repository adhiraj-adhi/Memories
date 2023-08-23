import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const Error = () => {
    const errorMessage = useSelector(state => state.reducerSlice.errorMessage);
    const dispatch = useDispatch();

    const errorStyling = {
        errorContainer: {
            height: "100vh",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center"
        },
        paraStyling: {
            fonySize: "0.9rem",
            color: "red",
        }
    }

    const navigate = useNavigate();

    return (
        <div className='error_container' style={errorStyling.errorContainer}>
            <h2> Error !!! 401 </h2>
            <p style={errorStyling.paraStyling}> {errorMessage ? errorMessage : "Most likely, you are attempting to access a resource for which you do not have permission..."}  </p>
            <button onClick={() => navigate(-1)}
                style={{marginTop: "1.25rem", 
                padding: "0.6rem 1.2rem", 
                border: "none", 
                outline: "none", 
                background: "var(--black-color)",
                color: "var(--white-color)",
                cursor: "pointer",
                borderRadius: "7px"
            }}
            >Go Back</button>
        </div>
    )
}

export default Error