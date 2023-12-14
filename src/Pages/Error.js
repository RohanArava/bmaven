import error from "./404 error lost in space-rafiki.png";
export default function Error({message="Something went Wrong!"}){
    return (
        <div style={{display:"grid", height:"100vh", width:"100vw", alignItems:"center", justifyContent:"center"}}>
            <img src={String(error)} style={{height:"75vh", width:"50vw"}} alt="error"></img>
        <div style={{display:"flex", alignItems:"center", justifyContent:"center"}} className="primary-text headline-small">{message}</div>
        </div>
    );
}