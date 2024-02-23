import {useNavigate} from "react-router-dom";
import { useState, useEffect } from "react";
import "./SignUser.css"
import {useDispatch} from "react-redux";
import {userLogin, businessLogin} from "../app/store";
// import useFetch from "../useFetch"
function SignUser() {
    const initialValues = { username: "", email: "", password: "" };
    const dispatch = useDispatch();
    const [signUp, setSignUp] = useState(false);
    const [formValues, setFormValues] = useState(initialValues);
    const [formErrors, setFormErrors] = useState({});
    const [isSubmit, setIsSubmit] = useState(false);
    const [isUser, setIsUser] = useState(true);
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
        console.log(formErrors);
        alert(JSON.stringify(formErrors));
        if (Object.keys(formErrors).length === 0 && isSubmit && isUser) {
            console.log(formValues);
            // fetch("http://localhost:8085/user/sign")
            // .then(data => data.json())
            // .then(data => {dispatch(userLogin(data)); navigate("/u/profile")});
            if(signUp){
                fetch("http://localhost:8085/auth/user/signup", {
                    method:"POST", headers:{'content-type': "application/json"}, body:JSON.stringify({
                        email: formValues.email,
                        password: formValues.password,
                        userId: formValues.username
                    })
                }).then((data)=>data.json()).then((data)=>{
                    if(data.error){
                        alert(data.error);
                        return;
                    }
                    console.log(data)
                    dispatch(userLogin({
                        userName: data.user.userId,
                        userId: data.user.userId,
                        collections: data.collections,
                        history: data.history
                    }));
                    navigate("/u/profile");
                });
            } else{
                fetch("http://localhost:8085/auth/user/signin", {
                    method:"POST", headers:{"content-type":"application/json"}, body:JSON.stringify({
                        email: formValues.email,
                        password: formValues.password,
                    })
                }).then((data)=>data.json()).then((data)=>{
                    console.log(data); 
                    dispatch(userLogin({
                        userName: data.user.userId,
                        userId: data.user.userId,
                        collections: data.collections,
                        history: data.history
                    }));
                    navigate("/u/profile");
                });
            }
        }
        else if(Object.keys(formErrors).length === 0 && isSubmit && !isUser){
            console.log(formValues);
            // fetch("http://localhost:8085/business/sign")
            // .then(data => data.json())
            // .then(data => {dispatch(userLogin(data)); navigate("/b/dash")});
            if(signUp){
                fetch("http://localhost:8085/auth/vendor/signup", {
                    method:"POST", headers:{'content-type': "application/json"}, body:JSON.stringify({
                        email: formValues.email,
                        password: formValues.password,
                        vendorName: formValues.username
                    })
                }).then((data)=>data.json()).then((data)=>{
                    if(data.error){
                        console.log(data);
                        alert(data.error)
                        return;
                    }
                    console.log(data)
                    dispatch(businessLogin({
                        id: data.vendor._id,
                        offers: data.offers,
                        services: data.services,
                        stats: {}
                    }));
                    navigate("/b/dash");
                });
            } else{
                fetch("http://localhost:8085/auth/vendor/signin", {
                    method:"POST", headers:{"content-type":"application/json"}, body:JSON.stringify({
                        email: formValues.email,
                        password: formValues.password,
                    })
                }).then((data)=>data.json()).then((data)=>{
                    console.log(data); 
                    dispatch(businessLogin({
                        id: data.vendor._id,
                        offers: data.offers,
                        services: data.services,
                        stats: {}
                    }));
                    navigate("/b/dash");
                });
            }
        }
    }, [formErrors]);
    const validate = (values) => {
        const errors = {};
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
        if (signUp) {
            if (!values.username) {
                errors.username = "Username is required!";
            }
        }
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
                <h1 className="primary-text">{signUp ? "Sign up" : "Login"}{isUser?"":" As Vendor"}</h1><br />
                <div></div>
                <div>
                    <table className="formWrap">

                        {signUp && (<><tr>
                            <td>
                                <label className="on-surface-text">Username</label></td>
                            <td>
                                <input
                                    type="text"
                                    name="username"
                                    placeholder="Username"
                                    value={formValues.username}
                                    onChange={handleChange}
                                /></td></tr>


                            <p>{formErrors.username}</p></>)}
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
                            <button type="button" onClick={() => { setSignUp(!signUp) }} className="self-center secondary-container on-secondary-container-text">{!signUp ? `New ${isUser?"User":"Vendor"}? Sign Up` : "Already have an account?"}</button>
                            <button onClick={()=>{setIsUser(!isUser)}} type="button" className="self-center secondary-container on-secondary-container-text">Are you a {isUser?"vendor":"user"}?</button></div>
                    </div> </div>
            </form>
        </div>
    );
}

export default SignUser;