import "./Payment.css"
export function Payment() {
    const it = {
        name: "Wedding Cake | 3 Floor | Bride and Groom",
        serviceName: "Little Finger Pastries",
        servicePrice: 1000,
        currency: "INR",
        serviceTime: "12/12/2020 10:00 AM",
        paymentMethod: "UPI",
        paymentId: "rohan.a21@sbi.upi123",
        description: "Order was delivered at 10:00 AM on 12/12/2020 to a Mr.Snow at St.Sistine's Chapel"
    };
    const paymentMethods = [
        {
            method: "Net Banking",
            charges_pcent: 2.5,
        },
        {
            method: "UPI",
            charges_pcent: 0
        },
        {
            method: "SBI Payment",
            charges_pcent: 1.25
        }
    ]
    return <div className="payment">
        {paymentMethods.map((item, index) => {
            return <div className="payment-method" key={index}>
                <p className="primary-text title-large pmeth">{item.method} <span className="material-symbols-rounded">send</span></p>
                <table>
                    <tr className="on-surface-text">
                        <td>
                            Charges
                        </td>
                    <td>{item.charges_pcent}%</td>
                    </tr>
                    <tr className="on-surface-text">
                        <td>
                            Total
                        </td>
                    <td>{it.servicePrice} + {it.servicePrice * item.charges_pcent /100} = {it.servicePrice + it.servicePrice * item.charges_pcent /100} {it.currency}</td>
                    </tr>
                </table>
                </div>
        })}
    </div>;
}