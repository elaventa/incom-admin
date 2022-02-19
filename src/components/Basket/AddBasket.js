import "./basket.scss";
import axios from "axios";
import React from "react";
import { useState } from "react";
import { FaTrash } from "react-icons/fa";
import Post from "../../API/Post";
import normalPost from "../../API/normalPost";
import postRequest from "../../API/postRequest";

const AddBasket = () => {
    const [name, setname] = useState("");
    const [description, setdescription] = useState("");
    const [searchValue, setsearchValue] = useState("");
    const [coins, setcoins] = useState([]);
    const [results, setresults] = useState([]);

    const [error, seterror] = useState(false)
    const [success, setsuccess] = useState(false)
    const [isLoading, setisLoading] = useState(false)
    const [isResultLoading, setisResultLoading] = useState(false)


    const search = async (e) => {
        setisResultLoading(true)
        let url = `https://api.coingecko.com/api/v3/search?query=${searchValue}`;
        const res = await axios.get(url);
        setisResultLoading(false)
        setresults(res.data.coins);
    };

    const addCoin = (coin) => {
        setcoins([
            ...coins,
            { img: coin.thumb, name: coin.name, value: "", more: coin },
        ]);
    };

    const deleteCoin = (coin) => {
        console.log(coin);
        let filteredCoins = coins.filter((_c) => _c.more.id !== coin.more.id);
        console.log(filteredCoins);
        setcoins(filteredCoins);
    };

    const getItemIndex = (arr, id) => {
        return arr.findIndex((e) => e.more.id === id);
    };

    const handlePercentage = (coin, e) => {
        const coinIndex = getItemIndex(coins, coin.more.id);
        console.log(coinIndex);
        let _c = [...coins];
        _c[coinIndex].value = e.target.value;
        setcoins(_c);
        console.log(_c);
    };


    const submitForm = (e) => {
        setisLoading(true)
        e.preventDefault();
    
        let formData = {
            title: name,
            description,
            coins: JSON.stringify(coins)
        }
       
        postRequest(`${process.env.REACT_APP_API_URI}/bucket`, formData)
            .then((res) => {
                if (res.status === "ok") {
                    console.log(res);
                    setsuccess(true)
                    setname('')
                    setdescription('')
                    setcoins([])
                    setresults([])
                    setsearchValue('')
                } else {
                    setisLoading(false);
                    seterror(true);
                    console.log(res);
                }
            })
            .catch((err) => {
                seterror(true)
                console.log(err);
            }).finally(e => {
                setisLoading(false)
                setTimeout(() => {
                    seterror(false)
                    setsuccess(false)
                }, 3000);
            })
    }

    if(isLoading) {
        return <div className="loader">Loding...</div>
    }

    return (
        <div>
            <h1>Add Basket</h1>
            
            {success && <div className="success">Basket Added Successfully</div> }
            {error && <div className="error">Something went wrong, please try again</div> }
            <form className="form" onSubmit={submitForm}>
                <div className="formControl">
                    <label htmlFor="name">Name of the basket</label>
                    <input
                        type="text"
                        placeholder="Name of the basket"
                        required
                        id="name"
                        value={name}
                        onChange={(e) => setname(e.target.value)}
                    />
                </div>
                <div className="formControl">
                    <label htmlFor="description">Description</label>
                    <textarea
                        required
                        name="description"
                        id="description"
                        cols="30"
                        rows="10"
                        value={description}
                        onChange={(e) => setdescription(e.target.value)}
                    ></textarea>
                </div>

                <div className="searchbar">
                    <input
                        type="search"
                        value={searchValue}
                        onChange={(e) => setsearchValue(e.target.value)}
                        placeholder="search coins"
                    />
                    <div className="searchBtn" onClick={search}>
                        Search
                    </div>
                </div>
                {isResultLoading && <div className="loader">Loading...</div> }
                {results.length > 0 && (
                    <div className="searchResults">
                        {results.map((coin) => (
                            <div
                                onClick={(e) => addCoin(coin)}
                                key={coin.id}
                                className="result"
                            >
                                <img src={coin.thumb} alt={coin.name} />
                                <p className="name">{coin.name}</p>
                            </div>
                        ))}
                    </div>
                )}

                {coins.length > 0 && (
                    <div className="coinsSelected">
                        {coins.map((coin, i) => (
                            <div key={coin.more.id} className="coin">
                                <div className="coindet">
                                    <img src={coin.img} alt="" />
                                    <div className="coinname">{coin.name}</div>
                                </div>

                                <div>
                                    <input
                                        required
                                        className="percent"
                                        type="text"
                                        placeholder="%"
                                        onChange={(e) =>
                                            handlePercentage(coin, e)
                                        }
                                    />
                                    <FaTrash
                                        onClick={(e) => deleteCoin(coin)}
                                        color="red"
                                        style={{ cursor: "pointer" }}
                                    />
                                </div>
                            </div>
                        ))}
                        <input type="submit" value={'Upload Basket'} className="submitbtn" />
                    </div>
                )}
            </form>
        </div>
    );
};

export default AddBasket;
