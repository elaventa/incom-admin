const normalPost = async (url, data) => {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    const d = res.json();
    return d
  };
  
  
  export default normalPost;