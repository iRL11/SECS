import React, { createContext, useContext, useEffect, useState } from 'react';
import 'boxicons'
import GoldPriceService from '../GoldPriceService/GoldPriceService';
import { useNavigate } from 'react-router-dom';
import { userContext } from './../../App';
import { adminContext } from './../admin/AdminPanel';


export const expenseContext = createContext();
const AdminList = (props) => {
    const [trans] = useContext(adminContext)
    const [user, setUser] = useContext(userContext);
    const navigate = useNavigate()

    const logout = () => {
        setUser({ isSigned: false, email: '', name: '' })
        navigate('/')
    }
    return (
        <div className='flex flex-col py-6 gap-3'>
            <h1 className='py-4 font-bold text-xl'>Gold Price History</h1>
            {trans.map((item, index) => {
                return (<expenseContext.Provider value={[trans]}>
                    <Transaction item={item} key={index} getExpense={props.getExpense}></Transaction>
                </expenseContext.Provider>);
            })}
            <button className="border py-2 text-white bg-red-500 w-full" onClick={logout}>Logout</button>
        </div>
    );
};

function Transaction(props) {
    const [trans] = useContext(expenseContext);
    const item = props.item;
    const getExpense = props.getExpense
    const delete_item = async (id) => {
        console.log(id);
        try {
            await GoldPriceService.deleteExpense(id);
            getExpense();
        }
        catch (e) {
            console.log(e);
        }
    }
    return (
        <div className='item flex justify-content-between bg-gray-50 py-2 rounded-r'>
            <button className='px-3' onClick={() => delete_item(item.id)}><box-icon size="15" name="trash"></box-icon></button>
            <span className='w-1/2'>{item.year ?? ""}</span>
            <span className='w-1/2'>{item.price ?? ""}</span>
        </div>
    )
}
export default AdminList;