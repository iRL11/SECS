import React, { createContext, useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import CurrentList from '../CurrentList/CurrentList';
import ExpenseService from '../expenseService/Expense.Service';
import NavBar from '../NavBar/NavBar';
import TransactionGraph from '../TransactionGraph/TransactionGraph';
import { userContext } from './../../App';

export const expensesContext = createContext();
const ExpenseTracker = () => {
    const { register, handleSubmit, resetField } = useForm();
    const [trans, setTrans] = useState([]);
    const [user, , ,] = useContext(userContext);
    useEffect(() => {
        getExpense();
    }, [])
    const getExpense = async () => {
        const data = await ExpenseService.getAllExpense();
        const filterData = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
        setTrans(filterData.filter(item => item.email === user.email))
    }
    async function onSubmit(data) {

        //const newData=[trans,{...data,email:user.email}]
        data = { ...data, email: user.email }
        console.log(data);
        //setTrans(newData)
        getExpense();
        try {
            await ExpenseService.addExpense(data);
            alert("saved successfully")
        }
        catch (e) {
            alert(e.message);
        }
    }
    return (
        <div>
            <NavBar></NavBar>
            <br />
            <div className='form max-w-sm mx-auto w-96'>

                <h1 className='font-bold pb-4 text-xl'>
                    Expense Tracker
                </h1>
                <form id="form" onSubmit={handleSubmit(onSubmit)}>
                    <div className='grid gap-4'>
                        <div className='input-group'>
                            <input type="text" {...register('name')} placeholder="salary, House Rent" className='form-input' id="name" />
                        </div>
                        <select className='form-input' {...register('type')} id="type">
                            <option value="income" defaultValue>Income</option>
                            <option value="expense" defaultValue>Expense</option>
                            <option value="savings" defaultValue>Savings</option>
                        </select>
                        <div className='input-group'>
                            <input type="text" {...register('date')} placeholder="DD/MM/YYYY" className='form-input' id="date" />
                        </div>
                        <div className='input-group'>
                            <input type="number" {...register('amount')} placeholder="Amount" className='form-input' id="amount" />
                        </div>
                        <div className="submit-btn">
                            <button className="border py-2 text-white bg-indigo-500 w-full">Make Transaction</button>
                        </div>
                    </div>
                </form>
                <expensesContext.Provider value={[trans]}>
                    <CurrentList getExpense={getExpense} />
                    <TransactionGraph />
                </expensesContext.Provider>

            </div>
        </div>
    );
};

export default ExpenseTracker;