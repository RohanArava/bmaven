import {useNavigate} from "react-router-dom";
import { useState, useEffect } from "react";
import "./SignUser.css"
import {useDispatch} from "react-redux";
import {userLogin} from "../app/store";
import { useLocation } from "react-router-dom";
// import useFetch from "../useFetch"
function AdminAuth() {
    
    const initialValues = { username: "", email: "", password: "" };
    const dispatch = useDispatch();
    // const [signUp, setSignUp] = useState(false);
    const [formValues, setFormValues] = useState(initialValues);
    const [formErrors, setFormErrors] = useState({});
    const [isSubmit, setIsSubmit] = useState(false);
    // const [isUser, setIsUser] = useState(true);
    const navigate = useNavigate();
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setFormErrors(validate(formValues));
        setIsSubmit(true);
    };

    useEffect(() => {
        if (Object.keys(formErrors).length === 0 && isSubmit) {
            console.log(formValues);
            fetch("http://localhost:8085/admin/login",{
                method:"POST", headers:{"content-type":"application/json"}, body:JSON.stringify({
                    email: formValues.email,
                    password: formValues.password,
                })
            }).then(()=>navigate("/a/dashboard"));
        }
    }, [formErrors]);
    const validate = (values) => {
        const errors = {};
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
        if (!values.email) {
            errors.email = "Email is required!";
        } else if (!regex.test(values.email)) {
            errors.email = "This is not a valid email format!";
        }
        if (!values.password) {
            errors.password = "Password is required";
        } else if (values.password.length < 4) {
            errors.password = "Password must be more than 4 characters";
        } else if (values.password.length > 10) {
            errors.password = "Password cannot exceed more than 10 characters";
        }
        return errors;
    };

    return (
        <div className="container">

            <form onSubmit={handleSubmit}>
                <h1 className="primary-text">{"Login "}As Admin</h1><br />
                <div></div>
                <div>
                    <table className="formWrap">
                        <tr>
                            <td>
                                <label className="on-surface-text">Email</label></td>
                            <td>
                                <input
                                    type="text"
                                    name="email"
                                    placeholder="Email"
                                    value={formValues.email}
                                    onChange={handleChange}
                                /></td></tr>

                        <p>{formErrors.email}</p>
                        <tr>
                            <td>
                                <label className="on-surface-text">Password</label></td>
                            <td>
                                <input
                                    type="password"
                                    name="password"
                                    placeholder="Password"
                                    value={formValues.password}
                                    onChange={handleChange}
                                /></td>
                        </tr>
                        <p>{formErrors.password}</p>

                    </table><div className="buttons">
                        <div className="self-end">
                            <button className="self-end secondary-container on-secondary-container-text">Submit</button></div>
                        <div className="self-center">

                            {/* <button onClick={()=>{setIsUser(!isUser)}} type="button" className="self-center secondary-container on-secondary-container-text">Are you a {isUser?"vendor":"user"}?</button> */}
                            </div>
                    </div> </div>
            </form>
        </div>
    );
}

export default AdminAuth;