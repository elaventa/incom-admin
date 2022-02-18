import { useState } from "react";
import { GoogleLogin } from "react-google-login";
import normalPost from "../../API/normalPost";

const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID


const GoogleLoginBtn = () => {
    const [error, seterror] = useState(false)
    const [authError, setauthError] = useState(false)
    const [isLoading, setisLoading] = useState(false)

    const onSuccess = (res) => {
        setisLoading(true)
        normalPost(`${process.env.REACT_APP_API_URI}/login-google`, {token: res.tokenId}).then(r => {
            
            console.log(r);
            if(r.status === "ok"){
                localStorage.setItem("LoggedInUserTokenID", r.token);
                window.location = '/dashboard/new-basket'
            } else if (r.status === 'error'){
                setisLoading(false)
                setauthError(true)

            }
        }).catch(err => {
            setisLoading(false)
            seterror(true)
            console.log(err);
        })
    };

    const onFailure = (res) => {
        console.log("login failed ", res);
        setauthError(true)
    };

    if(isLoading){
        return (
            <div className="loader"></div>
        )
    }

    return (
        <div className="login-container">
            {authError ? <div style={{padding: "20px", fontSize: "1.3rem" , color: "red"}} className="error"> You are not autherized </div>: ""}
            {error ? <div style={{padding: "20px", fontSize: "1.3rem" , color: "red"}} className="error"> Something Went Wrong ... </div>: ""}
            <GoogleLogin
                clientId={clientId}
                buttonText="Login with Google"
                onSuccess={onSuccess}
                onFailure={onFailure}
                cookiePolicy={'single_host_origin'}
                style={{ color: "black" }}
            />
        </div>
    );
};

export default GoogleLoginBtn;
