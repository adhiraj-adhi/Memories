import { useState } from "react";
import { BsArrowRight } from "react-icons/bs"
import { useSelector, useDispatch } from "react-redux";
import axiosInstance from "../../axiosSetup";
import { setUser, setViewForm } from "../../reducers/reducerSlice";
import "./styles.css"

const SignInForm = (props) => {
    const viewForm = useSelector(state => state.reducerSlice.viewForm);
    const dispatch = useDispatch();

    const [formData, setFormData] = useState({ email: "", password: "" });
    const [errorMessage, setErrorMessage] = useState("")

    function collectData(e) {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    function sendData(e) {
        e.preventDefault();
        axiosInstance.post("/signin", formData)
            .then(response => {
                localStorage.setItem("memories", JSON.stringify(response.data))
                dispatch(setViewForm(!viewForm))
                dispatch(setUser(response.data));
            })
            .catch(err => {
                console.log(err);
                setErrorMessage(err.response.data.errMsg.signInErr);
            })
    }
    return (
        <>
            <h1> Sign In </h1>
            <form onSubmit={sendData}>
                <p> {errorMessage} </p>
                <input type="text"
                    placeholder="Enter Email..."
                    name="email"
                    value={formData.email}
                    onChange={collectData}
                /><br />
                <input type="password"
                    placeholder="Enter Password..."
                    name="password"
                    value={formData.password}
                    onChange={collectData}
                /><br />
                <input type="submit" value="Login" />
            </form>
            <p className="register_router" onClick={props.toggleView}> New Here ? Register and Explore <span> <BsArrowRight /> </span> </p>
        </>
    )
}

export default SignInForm;