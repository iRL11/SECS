import { async } from '@firebase/util';
import { data } from 'autoprefixer';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { userContext } from '../../App';
import ExpenseService from '../expenseService/Expense.Service';
import GoldPriceMonthlyService from '../GoldPriceMonthly/GoldPriceMonthlyService';
import NavBar from '../NavBar/NavBar';
import NewFeatureList from '../NewFeatureList/NewFeatureList';
import NewFeatureService from '../NewFeatureService/NewFeatureService';
export const goldSavings = createContext();
const NewFeature = () => {
    const { register, handleSubmit, resetField } = useForm();
    const [savings, setSavings] = useState(0);
    const [user, , ,] = useContext(userContext);
    const [goldPrice, setGoldPrice] = useState([])
    const [trans, setTrans] = useState([]);
    let months = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'];
    useEffect(() => {
        getExpense();
        getGoldSavings();
    }, [])
    const getGoldSavings = async () => {

        const data = await NewFeatureService.getAllExpense();
        const filterData = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
        // const filteredData = filterData.filter(item => item.email === user.email);

        setTrans(filterData.filter(item => item.email === user.email))
    }
    const getExpense = async () => {
        const data = await GoldPriceMonthlyService.getAllExpense();
        setGoldPrice(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    }
    async function onSubmit(data) {
        const { Month } = data;
        // console.log(Month, goldPrice);
        const gp = goldPrice.find(item => item.month.toLowerCase() === Month.toLowerCase())
        // console.log(savings,gp);
        data = { ...data, email: user.email, SavingMoney: savings, GoldPrice: gp.price, SavingsGold: savings / gp.price }
        try {
            await NewFeatureService.addExpense(data);
            // setTrans({...trans,data});
            alert("saved successfully")
        }
        catch (e) {
            alert(e.message);
        }
        getGoldSavings();
    }
    const generateSavings = () => {
        const salary = parseInt(document.getElementById("salary").value);
        const expense = parseInt(document.getElementById("expense").value);
        console.log(salary, expense)
        if (salary - expense > 0) {
            setSavings(salary - expense)
        }
        else {
            setSavings(0);
        }

    }
    return (
        <div>
            <NavBar />
            <br />
            <div className='form max-w-sm mx-auto w-96'>
                <h1 className='font-bold pb-4 text-xl'>
                    New Feature
                </h1>
                <form id="form" onSubmit={handleSubmit(onSubmit)}>
                    <div className='grid gap-4'>
                        <div className='input-group'>
                            <input type="number" onMouseOut={generateSavings} {...register('Salary')} placeholder="salary" className='form-input' id="salary" />
                        </div>
                        <select className='form-input' {...register('Month')} id="month">
                            <option value="Jan" defaultValue>Jan</option>
                            <option value="Feb" defaultValue>Feb</option>
                            <option value="Mar" defaultValue>Mar</option>
                            <option value="Apr" defaultValue>Apr</option>
                            <option value="May" defaultValue>May</option>
                            <option value="Jun" defaultValue>Jun</option>
                            <option value="Jul" defaultValue>Jul</option>
                            <option value="Aug" defaultValue>Aug</option>
                            <option value="Sep" defaultValue>Sep</option>
                            <option value="Oct" defaultValue>Oct</option>
                            <option value="Nov" defaultValue>Nov</option>
                            <option value="Dec" defaultValue>Dec</option>
                        </select>
                        <div className='input-group'>
                            <input type="number" onMouseOut={generateSavings} {...register('Cost')} placeholder="expense" className='form-input' id="expense" />
                        </div>
                        <div className='input-group'>
                            <label className='text-lg' {...register('SavingMoney')}>Savings: {savings}</label>
                        </div>

                        <div className="submit-btn">
                            <button className="border py-2 text-white bg-indigo-500 w-full">Make Transaction</button>
                        </div>
                    </div>
                </form>
            </div>
            <goldSavings.Provider value={[trans]}>
                <NewFeatureList getGoldSavings={getGoldSavings} />
            </goldSavings.Provider>
        </div>
    );
};

export default NewFeature;