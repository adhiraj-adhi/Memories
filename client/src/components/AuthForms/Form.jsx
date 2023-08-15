import {useState} from "react";
import {GrClose} from "react-icons/gr"
import {useSelector, useDispatch} from "react-redux";
import { setViewForm } from "../../reducers/reducerSlice";
import "./styles.css";
import SignInForm from "./SignInForm";
import SignUpForm from "./SignUpForm";

const Form = () => {
    const viewForm = useSelector(state => state.reducerSlice.viewForm);
    const dispatch = useDispatch();
    const [viewSignIn, setViewSignIn] = useState(true)
    function  toggleView(){
        setViewSignIn(prevState => !prevState)
    }
    return (
        <div className="userform_container">
            <div className="signInForm">
                <GrClose className="close_form" onClick={() => dispatch(setViewForm(!viewForm))} />
                {viewSignIn && <SignInForm toggleView={toggleView} />}
                {!viewSignIn && <SignUpForm toggleView={toggleView} />}
            </div>
        </div>
    )
}

export default Form;