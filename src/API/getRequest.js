
const getRequest = async (url, data) => {
    let Token = localStorage.getItem("LoggedInUserTokenID");
    const res = await fetch(url, {
      method: "GET",
      headers: {
        'Authorization': `Bearer ${Token}`
      },
      body: JSON.stringify(data),
    });
    const d = res.json();
    return d
  };
  
  
  export default getRequest;