const deleteReq = async (url) => {
    let Token = localStorage.getItem("LoggedInUserTokenID");
    const res = await fetch(url, {
      method: "DELETE",
      headers: {
        'Authorization': `Bearer ${Token}`,
      },
    });
    const d = res.json();
    return d
  };
  
  
  export default deleteReq;