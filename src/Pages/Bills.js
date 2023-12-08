import "./Bills.css"
import {useNavigate} from "react-router-dom";
export default function Bills() {
    const bills = [
        {},
        {},
        {},
        {},
        {},
        {},
    ]
    return <div className="billWrap">
        <div className=" selection">
        <span className="headline-medium primary-text">Bills </span></div>
        <div className="wrap2">
        <div className="bills">
        {bills.map((item, index) => {
            return <BillItem key={index}>{item}</BillItem>
        })}</div>
    </div></div>
}

function BillItem({ item }) {
    const navigate = useNavigate();
    const it = {
        name: "Wedding Cake | 3 Floor | Bride and Groom",
        serviceName: "Little Finger Pastries",
        servicePrice: "Rs. 1000",
        serviceTime: "12/12/2020 10:00 AM",
        paymentMethod: "UPI",
        paymentId: "rohan.a21@sbi.upi123",
        description: "Order was delivered at 10:00 AM on 12/12/2020 to a Mr.Snow at St.Sistine's Chapel"
    };
    return <div className="secondary-container billItem">
        <p className="headline-small primary-text">{it.serviceName}</p>
        <table>
            <tr className="title-medium on-surface-text">
                <td>
                    Item/Service:
                </td>
                <td>
                    {it.name}
                </td>
            </tr>
            <tr className="title-medium on-surface-text">
                <td>
                    Price:
                </td>
                <td>
                    {it.servicePrice}
                </td>
            </tr>
            <tr className="title-medium on-surface-text">
                <td>
                    Time:
                </td>
                <td>
                    {it.serviceTime}
                </td>
            </tr>

        </table>
        <div className="bill-bottom">
            <button onClick={()=>{navigate("/u/payment")}}className="tertiary-container on-tertiary-container-text">Pay</button>
        </div>
    </div>
}