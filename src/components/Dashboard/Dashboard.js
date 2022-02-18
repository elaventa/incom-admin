import "./Dashboard.scss";
import React from "react";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import GoogleLogoutBtn from "../GoogleAuth/GoogleLogoutBtn";
import AddUser from "../AddUser/AddUser";
import { useState } from "react";
import { useEffect } from "react";
import AddBasket from "../Basket/AddBasket";

const Dashboard = () => {
    const [isSuperAdmin, setisSuperAdmin] = useState(false)

    useEffect(() => {
        const check = async () => {
            let Token = localStorage.getItem("LoggedInUserTokenID");

            const response = await fetch(`${process.env.REACT_APP_API_URI}/get-admin`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${Token}`,
                },
            })

            await response.json()

            
                .then((res) => {
                    if (res.status === "ok") {
                        if(res.admin.isSuperAdmin){
                          setisSuperAdmin(true)
                        }
                        console.log(res);
                    } else {
                        console.log(res);
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
        };

        check()
    }, []);

    const routes = [
        {
            path: "/dashboard/add-users",
            main: () => <AddUser />,
        },
        {
            path: "/dashboard/add-basket",
            main: () => <AddBasket />,
        },
    ];
    return (
        <div>
            <Router>
                <div className="dashboard-container">
                    <div className="sidebar">
                        {isSuperAdmin ? <div className="nav">
                            <Link to="/dashboard/add-users">
                                <div className="nav-item">Add Users</div>
                            </Link>
                          
                        </div> : ""}
                        
                        <div className="nav">
                            <Link to="/dashboard/add-basket">
                                <div className="nav-item">Add Basket </div>
                            </Link>

                        </div>

                        


                        <div className="nav logout">
                            <GoogleLogoutBtn />
                        </div>
                    </div>

                    <div className="dashboard-content">
                        <Switch>
                            {routes.map((route, index) => (
                                <Route
                                    key={index}
                                    path={route.path}
                                    exact={route.exact}
                                    children={route.main}
                                />
                            ))}
                        </Switch>
                    </div>
                </div>
            </Router>
        </div>
    );
};

export default Dashboard;
