import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import postRequest from "../../API/postRequest";
import Error from "../Error/Error";
import "./AddUser.css";

import { FaTrash } from "react-icons/fa";

const AddUser = () => {
    const [email, setemail] = useState("");
    const [admins, setadmins] = useState("");
    const [success, setsuccess] = useState("");
    const [error, seterror] = useState(false);
    const [AdminListLoading, setAdminListLoading] = useState(true);

    useEffect(() => {
        const getAllAdmins = async () => {
            console.log("requesting to get all admins");
            let Token = localStorage.getItem("LoggedInUserTokenID");

            const response = await fetch(`${process.env.REACT_APP_API_URI}/get-all-admins`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${Token}`,
                },
            });

            await response
                .json()

                .then((res) => {
                    if (res.status === "ok") {
                        setAdminListLoading(false);
                        setadmins(res.data.reverse());
                        console.log(res);
                    } else {
                        console.log(res);
                    }
                })
                .catch((err) => {
                    setAdminListLoading(false);
                    console.log(err);
                });
        };

        getAllAdmins();
    }, [success]);

    const deleteAdmin = (id) => {
        setAdminListLoading(true);
        postRequest(`${process.env.REACT_APP_API_URI}/delete-admin`, { id: id })
            .then((res) => {
                if (res.status === "ok") {
                    console.log(res);
                    seterror(false);
                    setsuccess(`true, ${id}`);
                } else {
                    console.log(res);
                    setsuccess(`false, ${id}`);
                    seterror(true);
                    setAdminListLoading(false);
                }
            })
            .catch((err) => {
                console.log(err);
                setsuccess(`false, ${id}`);
                seterror(true);
                setAdminListLoading(false);
            });
    };

    const adduser = (e) => {
        e.preventDefault();
        setAdminListLoading(true);
        postRequest(`${process.env.REACT_APP_API_URI}/register`, { email: email, isSuperAdmin: e.target.isSuperAdmin.value })
            .then((res) => {
                if (res.status === "ok") {
                    setemail("");
                    seterror(false);
                    setsuccess(`true, ${email}`);
                    console.log(res);
                } else {
                    console.log(res);
                    setAdminListLoading(false);
                    setsuccess(`false, ${email}`);
                    seterror(true);
                }
            })
            .catch((err) => {
                setAdminListLoading(false);
                setsuccess(`false, ${email}`);
                seterror(true);
                console.log(err);
            });
    };



    return (
        <div>
            {error ? <Error error={error} /> : ""}
            <form className="adduser" onSubmit={(e) => adduser(e)}>
                <input
                    type="email"
                    placeholder="email"
                    value={email}
                    onChange={(e) => setemail(e.target.value)}
                />
                <input className="btn" type="submit" value="Add" />
                <input type="radio" name="isSuperAdmin" value="true" id="isSuperAdmin" />
                <label htmlFor="isSuperAdmin">SuperAdmin</label>
                <input type="radio" name="isSuperAdmin" value="false" id="justAdmin" checked />
                <label htmlFor="isSuperAdmin">Just Admin</label>
                
            </form>

            <div className="adminList">
                <h1>Admin List</h1>
                {AdminListLoading ? (
                    <div className="loader"></div>
                ) : (
                    <ul>
                        {admins.length > 0
                            ? admins.map((admin) => (
                                  <div className={`${admin.isSuperAdmin} each-admin-container`}>
                                      <li>{admin.email}</li>{" "}
                                      <FaTrash
                                          className="delete"
                                          onClick={(e) =>
                                              deleteAdmin(admin._id)
                                          }
                                      />
                                  </div>
                              ))
                            : ""}
                    </ul>
                )}
            </div>
        </div>
    );
};

export default AddUser;
