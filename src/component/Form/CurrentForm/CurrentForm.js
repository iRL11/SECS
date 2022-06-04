import React, { useContext } from 'react';
import { userContext } from '../../../App';
import { useForm } from 'react-hook-form';
import CurrentList from './../../List/CurrentList/CurrentList';
import { type } from '@testing-library/user-event/dist/type';

const CurrentForm = (props) => {
    const { register, handleSubmit, resetField } = useForm();
    const [, , transaction, setTransaction] = useContext(userContext)

    function reload() {
        document.getElementById("name").value = "";
        document.getElementById("date").value = "";
        document.getElementById("type").value = "income"
        document.getElementById("amount").value = "";
    }
    function onSubmit(data) {
        data.category = 'Current'
        console.log(transaction.length);
        data.id = 'C-' + transaction.length;
        const trans = [...transaction]
        const income = trans.filter(item => item.type === 'income' && item.category === 'Current')
        const expense = trans.filter(item => item.type === 'expense' && item.category === 'Current')
        const savings = trans.filter(item => item.type === 'savings' && item.category === 'Current')
        console.log(income, expense, savings)
        let total_income = 0, total_expense = 0, total_savings = 0;
        income.map(item => total_income = parseInt(item.amount) + total_income);
        expense.map(item => total_expense = parseInt(item.amount) + total_expense);
        savings.map(item => total_savings = parseInt(item.amount) + total_savings);
        console.log(total_income, total_expense, total_savings, data.amount);
        total_expense += total_savings;
        total_expense += parseInt(data.amount);
        console.log(total_income, total_expense);
        if (data.type === 'expense' || data.type === 'savings') {
            if (total_income - total_expense > 0) {
                trans.push(data)
                setTransaction(trans)
                alert('Transaction Completed')
                reload()
            }
            else {
                alert('Expense amount can not be execced the income amount...please insert more income type transaction')
            }
        }
        else {
            trans.push(data)
            setTransaction(trans)
            alert('Transaction Completed')
            reload()
        }
    }
    return (
        <div className='form max-w-sm mx-auto w-96'>
            <h1 className='font-bold pb-4 text-xl'>
                Current Transaction
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
                        <input type="text" {...register('date')} placeholder="Month Name 2022 or Fiscal Year (e.g: Jan or 2022)" className='form-input' id="date" />
                    </div>
                    <div className='input-group'>
                        <input type="number" {...register('amount')} placeholder="Amount" className='form-input' id="amount" />
                    </div>
                    <div className="submit-btn">
                        <button className="border py-2 text-white bg-indigo-500 w-full">Make Transaction</button>
                    </div>
                </div>
            </form>
            <CurrentList />
        </div>
    );
};

export default CurrentForm;