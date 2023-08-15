import { useState } from "react";
import { BsArrowRight } from "react-icons/bs";
import axiosInstance from "../../axiosSetup";

const SignUpForm = (props) => {
    const [formData, setFormData] = useState({ name: "", email: "", password: "", confPassword: "" });
    const [errorMessage, setErrorMessage] = useState("")

    function collectData(e) {
        const name = e.target.name;
        setFormData({ ...formData, [name]: e.target.value })
    }
    function createUser(e) {
        e.preventDefault();
        console.log(formData);
        // try {
        //     const response = await createUser(formData);
        //     console.log(response);
        // } catch (err) {
        //     console.log(err);
        // }

        axiosInstance.post("/signup",  formData)
            .then(response => props.toggleView())
            .catch(error => {
                console.log(error.response.data.errMsg);
                const errData = error.response.data.errMsg;
                if (errData.name) {
                    return setErrorMessage(errData.name)
                } 
                if (errData.email) {
                    return setErrorMessage(errData.email)
                }
                if (errData.password) {
                    return setErrorMessage(errData.password)
                }
            });
    }

    return (
        <>
            <h1> SignUp </h1>
            <form onSubmit={createUser}>
                <p> {errorMessage} </p>
                <input type="text"
                    placeholder="Enter Name..."
                    name="name"
                    value={formData.name}
                    onChange={collectData}
                /><br />
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
                <input type="password"
                    placeholder="Confirm Password..."
                    name="confPassword"
                    value={formData.confPassword}
                    onChange={collectData}
                /><br />
                <input type="submit" value="Register" />
            </form>
            <p className="register_router" onClick={props.toggleView}> Already Registered ? Click to login <span> <BsArrowRight /> </span> </p>
        </>
    )
}

export default SignUpForm;