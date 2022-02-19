const Post = async (url, data) => {
    let Token = localStorage.getItem("LoggedInUserTokenID");
    const res = await fetch(url, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${Token}`,
        },
        body: data,
    });
    const d = res.json();
    return d;
};

export default Post;
