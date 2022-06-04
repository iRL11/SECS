import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getAuth, createUserWithEmailAndPassword, reload } from "firebase/auth";
const NewAccount = () => {
    const navigate = useNavigate()
    function signin() {
        const auth = getAuth();
        const email = document.getElementById("staticEmail2").value;
        const password = document.getElementById("inputPassword2").value;
        console.log(password)
        if (isValid(email, password)) {
            createUserWithEmailAndPassword(auth, email, password)
                .then((result) => {

                    alert("User Created Successfully");
                    reload();
                    navigate("/dashboard");
                })
                .catch((error) => {
                    const errorMessage = error.message;
                    alert(errorMessage);
                });
        }
    }

    const reload = () => {
        document.getElementById("staticEmail2").value = "";
        document.getElementById("staticName").value = "";
        document.getElementById("inputPassword2").value = "";
        document.getElementById("staticAge").value = "";
    }

    const ValidateEmail = mail => {
        console.log(mail)
        // eslint-disable-next-line no-useless-escape
        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
            return (true)
        }
        alert("You have entered an invalid email address!")
        return (false)

    }

    const ValidatePassword = password => {

        // if (/^(?=.*[0-9])(?=.*[!@#$%^&?}{)(*])[a-zA-Z0-9!@#$%^&?}{)(*]{6,16}$/.test(password))
        // {
        return (true)
        // }        
        // alert("You have entered an invalid password!")
        // return (false)

    }

    const isValid = (email, password) => {

        if (ValidateEmail(email) && ValidatePassword(password)) {
            return true
        }
        return false;
    }
    return (
        <div className="bg-grey-lighter  flex flex-col">
            <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
                <div className="bg-white px-6 py-1 rounded shadow-md text-black w-full">
                    <h1 className="mb-8 text-3xl text-center">Sign up</h1>
                    <input
                        type="text"
                        className="block border border-grey-light w-full p-3 rounded mb-4"
                        name="fullname"
                        id="staticName"
                        placeholder="Full Name" />

                    <input
                        type="Number"
                        className="block border border-grey-light w-full p-3 rounded mb-4"
                        name="Age"
                        id="staticAge"
                        placeholder="Age" />
                    <input
                        type="text"
                        className="block border border-grey-light w-full p-3 rounded mb-4"
                        name="email"
                        id="staticEmail2"
                        placeholder="Email" />

                    <input
                        type="password"
                        className="block border border-grey-light w-full p-3 rounded mb-4"
                        name="password"
                        id="inputPassword2"
                        placeholder="Password" />

                    <button
                        type="submit"
                        className="w-full text-center py-3 mb-4 rounded bg-yellow text-black hover:bg-green-dark focus:outline-none my-1"
                        onClick={signin} >Create Account</button>

                </div>

                <div className="text-grey-dark mt-6">
                    Already have an account?
                    <Link to="/"><label className="no-underline border-b border-blue text-blue" style={{ "cursor": "pointer" }}>
                        Log in
                    </label></Link>
                </div>
            </div>
        </div>
    );
};

export default NewAccount;