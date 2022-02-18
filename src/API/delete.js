const Delete = async (url, data) => {
    let Token = localStorage.getItem("LoggedInUserTokenID");
    const res = await fetch(url, {
      method: "POST",
      headers: {
        'Authorization': `Bearer ${Token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data),
    });
    const d = res.json();
    return d
  };
  
  
  export default Delete;