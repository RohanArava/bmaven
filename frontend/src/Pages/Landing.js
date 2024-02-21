import "./Landing.css";
import img from "./Farmers market-amico.png";
import {useNavigate} from "react-router-dom";
export default function Landing() {
    const navigate = useNavigate();
    return <div className="landingWrap">
        <img className="img" src={String(img)} alt="farmers market" />
        <div>
            <p className="headline-large on-surface-text">
                Welcome To <span className="primary-text">BizMaven</span>
            </p>
            <p className="title-small on-secondary-container-text">
                Your <span className="primary-text">Personal</span> Market.<br></br>
                You can now do business with your <span className="primary-text">local vendors,</span> from the comfort of <span className="primary-text">your home</span>
                <button onClick={()=>{navigate("/u/sign")}} className="primary-container on-primary-container-text signbtn">
                    SignUp Now
                </button>
                <button onClick={()=>{navigate("/u/about")}}  className="primary-container on-primary-container-text lmbtn">
                    Learn More <span class="material-symbols-rounded chev">
                        chevron_right
                    </span>
                </button>
            </p>
        </div>
    </div>
}