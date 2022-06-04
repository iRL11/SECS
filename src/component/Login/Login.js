import { FacebookAuthProvider, getAuth, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import React, { useContext } from 'react';
import { userContext } from '../../App';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
    const [user, setUser, transaction, setTransaction] = useContext(userContext)
    const navigate = useNavigate();

    function loginWithFb(event) {
        event.preventDefault()
        const auth = getAuth();
        const provider = new FacebookAuthProvider();
        signInWithPopup(auth, provider)
            .then(function (result) {
                setUser({ isSigned: true, email: result.user.email, name: result.user.displayName })
                navigate("/dashboard");
            })
            .catch((error) => {
                const errorMessage = error.message;
                console.log(errorMessage)
                navigate("/login");
            });
    }
    function loginwithGmail(event) {
        event.preventDefault();
        const provider = new GoogleAuthProvider();
        const auth = getAuth();
        signInWithPopup(auth, provider)
            .then(function (result) {
                setUser({ isSigned: true, email: result.user.email, name: result.user.displayName })
                navigate("/dashboard");
            })
            // .then(setUser({isSigned: true}))
            // .then(userCredential=>localStorage.setItem("LoggedUser",JSON.stringify({email: userCredential.user.email,name:userCredential.user.displayName})))
            .catch((error) => {
                const errorMessage = error.message;
                alert(errorMessage)
                navigate("/login");
            });

    }

    function loginWithEmail(event) {
        event.preventDefault()
        const auth = getAuth();
        const email = document.getElementById("staticEmail").value;
        const password = document.getElementById("inputPassword").value;
        if (isValid(email, password)) {
            signInWithEmailAndPassword(auth, email, password)
                .then(function (result) {
                    setUser({ isSigned: true, email: email, name: '' })

                    navigate("/dashboard");
                })
                // .then(setUser({isSigned:true}))
                // .then(userCredential=>localStorage.setItem("LoggedUser",JSON.stringify({email: userCredential.user.email,name:userCredential.user.displayName})))
                .catch((error) => {
                    const errorMessage = error.message;
                    console.log(errorMessage);
                    navigate("/");
                })
        }

    }

    const ValidateEmail = mail => {

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
    const adminPanel = () => {

        const email = document.getElementById("staticEmail").value;
        const password = document.getElementById("inputPassword").value;
        if (email === 'admin@gmail.com' && password === 'admin2222') {
            setUser({ isSigned: true, email: email, name: '' })
            navigate('/admin');
        }
        else {
            alert("Unauthorized Effort!!!")

        }
    }

    //return design 
    return (
        <div>
            <div className="container max-w-full mx-auto py-4 px-6">
                <h1 className="text-4xl py-8 mb-10 bg-slate-700 text-white rounded">Salary and Expense Consistency System</h1>
                <div className="font-sans">
                    <div className="max-w-sm mx-auto px-6">
                        <div className="relative flex flex-wrap">
                            <div className="w-full relative">
                                <form>
                                    <div className="mx-auto max-w-lg">
                                        <div>
                                            <input placeholder="Enter your email" id="staticEmail" type="email"
                                                className="text-md block px-3 py-2  rounded-lg w-full 
                                            bg-white border-2 border-gray-300 placeholder-gray-600 shadow-md focus:placeholder-gray-500 focus:bg-white focus:border-gray-600 focus:outline-none"/>
                                        </div>
                                        <div className="py-2" x-data="{ show: true }">
                                            <div className="relative">
                                                <input placeholder="Enter your password" type="password" className="text-md block px-3 py-2 rounded-lg w-full 
                                            bg-white border-2 border-gray-300 placeholder-gray-600 shadow-md
                                            focus:placeholder-gray-500
                                            focus:bg-white 
                                            focus:border-gray-600  
                                            focus:outline-none" id="inputPassword" />
                                            </div>
                                        </div>
                                        <button className="mt-3 text-lg font-semibold 
                                        bg-gray-800 w-full text-white rounded-lg
                                        px-6 py-3 block shadow-xl hover:text-white hover:bg-black" onClick={loginWithEmail}>
                                            Login
                                        </button>
                                        <div className='d-flex justify-content-between'>
                                            <Link to="/NewAccount"><button className="m-3 text-sm 
                                                bg-blue-800 w-50 text-white rounded-lg
                                                px-3 py-4 shadow-xl hover:text-white hover:bg-black">
                                                New User
                                            </button></Link>
                                        </div>
                                        <div className='d-flex justify-content-between'>
                                            <button className="m-3 text-sm 
                                                bg-blue-800 w-50 text-white rounded-lg
                                                px-3 py-4 shadow-xl hover:text-white hover:bg-black" onClick={adminPanel}>
                                                Login as Admin
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;