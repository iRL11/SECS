import React, { createContext, useContext, useEffect, useState } from 'react';
import ExpenseService from '../expenseService/Expense.Service';
import 'boxicons'
import { userContext } from '../../App';
import { expensesContext } from '../ExpenseTracker/ExpenseTracker';

export const expenseContext = createContext();
const CurrentList = (props) => {
    const [trans, , ,] = useContext(expensesContext);
    const [user, , ,] = useContext(userContext);

    return (
        <div className='flex flex-col py-6 gap-3'>
            <h1 className='py-4 font-bold text-xl'>Transaction History</h1>
            {trans.map((item, index) => {
                return (<expenseContext.Provider value={[trans]}>
                    <Transaction item={item} key={index} getExpense={props.getExpense}></Transaction>
                </expenseContext.Provider>);
            })}
        </div>
    );
};

function Transaction(props) {
    console.log(props);
    const item = props.item;
    const getExpense = props.getExpense;
    const [trans] = useContext(expenseContext);
    const delete_item = async (id) => {
        try {
            await ExpenseService.deleteExpense(id);
            getExpense();
        }
        catch (e) {
            alert(e.message);
        }
    }

    if (item.type === "") return null;
    return (
        <div className='item flex justify-content-between bg-gray-50 py-2 rounded-r' style={{ borderRight: `8px solid ${item.type === 'income' ? "green" : item.type === 'savings' ? "blue" : "red"}` }}>
            <button className='px-3' onClick={() => delete_item(item.id)}><box-icon color={item.type === 'income' ? "green" : item.type === 'savings' ? "blue" : "red"} size="15" name="trash"></box-icon></button>
            <span className='w-24'>{item.date ?? ""}</span>
            <span className='w-24'>{item.name ?? ""}</span>
            <span className='w-24'>{item.type ?? ""}</span>
            <span className='w-24'>{item.amount ?? ""}</span>
        </div>
    )
}
export default CurrentList;