import { loadBundle } from 'firebase/firestore';
import React, { createContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import AdminList from '../AdminList/AdminList';
import AdminMonthlyList from '../AdminMonthlyList/AdminMonthlyList';
import AdminNavBar from '../AdminNavBar/AdminNavBar';
import GoldPriceMonthlyService from '../GoldPriceMonthly/GoldPriceMonthlyService';

export const goldMonthlyContext = createContext();
const AdminGoldMonth = () => {
    const { register, handleSubmit, resetField } = useForm();
    const [goldPriceInfo, setGoldPriceInfo] = useState([]);
    const [trans, setTrans] = useState([]);
    useEffect(() => {
        getExpense();
    })
    const load = () => {
        document.getElementById("month").value = ""
        document.getElementById("price").value = "0"
    }
    const getExpense = async () => {
        const data = await GoldPriceMonthlyService.getAllExpense();
        setTrans(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
    }
    async function onSubmit(data) {
        //console.log(data)
        setGoldPriceInfo(data)
        try {
            await GoldPriceMonthlyService.addExpense(data);
            getExpense();
            alert("saved successfully")
            load();
        }
        catch (e) {
            alert(e.message);
        }
    }
    return (
        <div>
            <AdminNavBar />
            <br />
            <div className='form max-w-sm mx-auto w-96'>

                <h1 className='font-bold pb-4 text-xl'>
                    Gold Price in Monthly
                </h1>

                <form id="form" onSubmit={handleSubmit(onSubmit)}>
                    <div className='grid gap-4'>
                        <select className='form-input' {...register('month')} id="month">
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
                            <input type="text" {...register('price')} placeholder="Gold Price" className='form-input' id="price" />
                        </div>
                        <div className="submit-btn">
                            <button className="border py-2 text-white bg-indigo-500 w-full">save</button>
                        </div>
                    </div>
                </form>
                <goldMonthlyContext.Provider value={[trans]}>
                    <AdminMonthlyList getExpense={getExpense} />
                </goldMonthlyContext.Provider>
            </div>
        </div>
    );
};

export default AdminGoldMonth;