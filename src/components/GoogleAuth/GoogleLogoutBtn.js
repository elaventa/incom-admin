import { useState } from "react";
import { GoogleLogout } from "react-google-login";
import postRequest from "../../API/postRequest"

const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID

const GoogleLogoutBtn = () => {

    const [isLoading, setisLoading] = useState(false)
    const [success, setsuccess] = useState(false)
    const [error, seterror] = useState(false)

    const onSuccess = () => {
        setisLoading(true)
        postRequest(`${process.env.REACT_APP_API_URI}/logout`, {}).then(res => {
            if(res.status === "ok"){
                localStorage.removeItem('LoggedInUserTokenID')
                window.location = '/'
                setsuccess(true)
                setisLoading(false)
            } else {
                console.log(res);
                setisLoading(false)
                seterror(true)
            }
        }).catch(err => {
            setisLoading(false)
            seterror(true)
            console.log(err);
        })
       
    }

    if(isLoading) {
        return <div className="small-loader"></div>
    }

    return (
        <div>
             {error ? <div style={{padding: "10px", fontSize: "1rem" }} className="error"> Something Went Wrong ... </div>: ""}
            <GoogleLogout 
                clientId={clientId}
                buttonText={"Logout"}
                onLogoutSuccess={onSuccess}
            />
        </div>
    )
}

export default GoogleLogoutBtn
