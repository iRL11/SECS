import React, { useContext } from 'react';
import { userContext } from '../../../App'
import { Chart, ArcElement } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { useNavigate } from 'react-router-dom';
import { getAuth, signOut } from "firebase/auth";
import PreLabel from './../../Label/PreLabel/PreLabel';

Chart.register(ArcElement);

const PreGraph = () => {

    const navigate = useNavigate();

    const [, setUser, transaction, setTransaction] = useContext(userContext)
    let total_income = 0, total_savings = 0, total_expense = 0;
    for (var i = 0; i < transaction.length; i++) {
        if (transaction[i].category === 'Previous') {
            if (transaction[i].type === 'income') {
                total_income += parseInt(transaction[i].amount);
            }
            else if (transaction[i].type === 'expense') {
                total_expense += parseInt(transaction[i].amount);
            }
            else if (transaction[i].type === 'savings') {
                total_savings += parseInt(transaction[i].amount);
            }
        }
    }
    const config = {

        data: {
            datasets: [{
                data: [((total_income - (total_expense + total_savings)) * 100) / total_income, (total_savings * 100) / total_income, (total_expense * 100) / total_income],
                backgroundColor: [
                    'rgb(0,255,0)',
                    'rgb(0, 0, 255)',
                    'rgb(255, 0, 0)'
                ],
                hoverOffset: 4,
                borderRadius: 30,
                spacing: 10
            }]
        },
        options: {
            cutout: 115
        }
    }
    function logout() {
        const auth = getAuth();
        signOut(auth)
            .catch((error) => {
                // An error happened.
                console.log(error)
            });
        setUser([]);
        setTransaction([{ name: '', type: '', amount: 0, category: '' }])
        // localStorage.setItem("LoggedUser",JSON.stringify({email: '',name:''}))
        navigate("/")
    }
    return (
        <div className='flex justify-content max-w-xs mx-auto'>
            <div className='item'>
                <div className='chart relative'>
                    {/* {console.log({...config})} */}
                    <Doughnut {...config} />
                    <h3 className='mb-4 font-bold title'>Total
                        <span className='block text-3xl text-emerald-400'>${total_income}</span>
                    </h3>
                </div>
                <div className='flex flex-col py-10 gap-4'>
                    <PreLabel />
                </div>

            </div>
        </div>
    );
};

export default PreGraph;