import { useFetch } from "../useFetch";
import Loading from "./Loading";
import Error from "./Error";
import Toggle from 'react-toggle'
import "react-toggle/style.css"
import "./Edit.css";

export default function Edit() {

    const { loading, data, error } = useFetch("http://localhost:8085/business/dash/data");
    if (loading) {
        return <Loading />
    }
    if (error) {
        console.log(error);
        return <Error />
    }

    const services = data.services;
    const offers = data.offers;
    return <div className="wrap">
        <div className="services">
            <p className="secondary-text headline-medium">Services &amp; Offers</p>
            {services.map((element, i) => {
                return <ListItem element={element} />
            })}
            {offers.map((offer, index) => {
                return index < 3 ? <div key={index} className="secondary-container offer">
                    <div>
                        <p className='on-secondary-container-text headline-small'>{offer.main}</p>
                        <p className='secondary-text'>
                            {offer.desc}
                        </p>
                    </div><div className="enable"><label className="switch">
                        <Toggle className="toggle" icons={false} defaultChecked={true} />
                        <span className="slider round"></span>
                    </label>
                    </div><span className="material-symbols-rounded primary-text">
                        Delete
                    </span>
                </div> : <></>;
            })}
        </div>
        <div className="editDetails">
            <form>
                <div className="form-row">
                    <div className="form-group col-md-6">
                        <label className="secondary-text" for="inputEmail4">Email</label>
                        <input type="email" className="form-control" id="inputEmail4" placeholder="Email"/>
                    </div>
                    <div className="form-group col-md-6">
                        <label className="secondary-text" for="inputPassword4">Password</label>
                        <input type="password" className="form-control" id="inputPassword4" placeholder="Password"/>
                    </div>
                </div>
                <div className="form-group">
                    <label className="secondary-text" for="inputAddress">Address</label>
                    <input type="text" className="form-control" id="inputAddress" placeholder="1234 Main St"/>
                </div>
                <div className="form-group">
                    <label className="secondary-text" for="inputAddress2">Address 2</label>
                    <input type="text" className="form-control" id="inputAddress2" placeholder="Apartment, studio, or floor"/>
                </div>
                <div className="form-row">
                    <div className="form-group col-md-6">
                        <label className="secondary-text" for="inputCity">City</label>
                        <input type="text" className="form-control" id="inputCity"/>
                    </div>
                    <div className="form-group col-md-4">
                        <label className="secondary-text" for="inputState">State</label>
                        <select id="inputState" className="form-control">
                            <option selected>Choose...</option>
                            <option>...</option>
                        </select>
                    </div>
                    <div className="form-group col-md-2">
                        <label className="secondary-text" for="inputZip">Zip</label>
                        <input type="text" className="form-control" id="inputZip"/>
                    </div>
                </div>
                <div className="form-group">
                    <div className="form-check">
                        <input className="form-check-input" type="checkbox" id="gridCheck"/>
                            <label className="secondary-text" for="gridCheck">
                                Check me out
                            </label>
                    </div>
                </div>
                <button type="submit" className="changebtn secondary-container rounded on-secondary-container-text">Change</button>
            </form>
        </div>
    </div>;
}

function ListItem({ element }) {

    return <div className='secondary-container listItem' >
        <img alt="business" className='bimgdash' src="https://www.posist.com/restaurant-times/wp-content/uploads/2023/07/9-Essential-Bakery-Business-Tips-That-Will-Make-Your-Bakery-a-Success.jpg"></img>
        <p className="secondary-text">{element.name}</p>
        <div className="enable"><label className="switch">
            <Toggle className="toggle" icons={false} defaultChecked={true} />
            <span className="slider round"></span>
        </label>
        </div><span className="material-symbols-rounded primary-text">
            Delete
        </span>
    </div>;
}