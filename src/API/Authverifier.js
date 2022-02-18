const Authverifier = async () => {
    let isAdmin = false;
    let Token = localStorage.getItem("LoggedInUserTokenID");
  
    await fetch(`${process.env.REACT_APP_API_URI}/verify-admin`, {
      method: "GET",
      headers: {
        'Authorization': `Bearer ${Token}`,
      },
    })
      .then((res) => {
        return res.json()
      })
      .then((json) => {
        console.log(json);
        if (json.status === 'error') {
          isAdmin = false;
          
        } else if(json.status === 'ok'){
          isAdmin = true;
          console.log(json);
        }
      })
      .catch((err) => {
        console.log(err);
        console.log(1);
      });
  
  
    return { isAdmin };
  };
  
  export default Authverifier;