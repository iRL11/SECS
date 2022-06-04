import React, { createContext, useContext, useEffect, useState } from 'react';
import GoldPriceService from '../GoldPriceService/GoldPriceService';
import NavBar from './../NavBar/NavBar';


export const goldContext = createContext();
const GoldPrice = () => {
    const [trans, setTrans] = useState([])
    const [goldRate, setGoldRate] = useState([]);
    const [salaryAVG, setSalaryAVG] = useState(0);

    useEffect(() => {
        getExpense();
    }, [])

    const getExpense = async () => {
        const data = await GoldPriceService.getAllExpense();
        setTrans(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
    }
    const generate = () => {
        var joiningYear = parseInt(document.getElementById('joining_year').value)
        var startingSalary = parseInt(document.getElementById('salary').value);
        var percentage = parseInt(document.getElementById('salary_percentage').value) * 1.05;
        console.log(trans)
        for (var i = joiningYear, j = 0; i <= (new Date().getFullYear()); i++, j++) {
            var k = trans.filter(item => item.year == i);
            var p = parseInt(k[0].price);
            var g = {
                year: i,
                price: p,
                salary: parseInt((startingSalary * Math.pow(1.05, j)).toFixed(2)),
                goldPrice: parseFloat(((startingSalary * Math.pow(1.05, j)) / p).toFixed(2))
            }
            const preGold = goldRate;
            preGold.push(g);
            setGoldRate(preGold);
        }

    }
    const getAVG = () => {

        var joiningYear = parseInt(document.getElementById('joining_year').value)
        var gr = goldRate.filter(item => item.year == (new Date().getFullYear()))
        gr = parseInt(gr[0].price);
        var gm = goldRate.filter(item => item.year == joiningYear)
        gm = parseFloat(gm[0].goldPrice.toFixed(2));
        console.log(gr, gm);
        setSalaryAVG((gr * gm).toFixed(2))
    }
    return (
        <div>
            <NavBar />
            <br />
            <div className='form max-w-sm mx-auto w-96'>
                <div className='grid gap-4'>
                    <div className='input-group'>
                        <input type="text" placeholder="Starting Salary Amount" className='form-input' id="salary" />
                    </div>
                    <div className='input-group'>
                        <input type="text" placeholder="Salary Increment Percentage" className='form-input' id="salary_percentage" />
                    </div>
                    <div className='input-group'>
                        <input type="text" placeholder="Joining year" className='form-input' id="joining_year" />
                    </div>
                    <div className="submit-btn">
                        <button className="border py-2 text-white bg-indigo-500 w-full" onClick={() => { generate(); getAVG() }}>Generate</button>
                    </div>
                    <div className='item flex justify-content-between bg-gray-50 py-2 rounded-r' >
                        <span className='w-3/12'>Year</span>
                        <span className='w-3/12'>Salary</span>
                        <span className='w-6/12'>Gold (in gram)</span>
                    </div>

                    {goldRate.map((item, index) => {
                        return (<goldContext.Provider value={[goldRate, setGoldRate]}>
                            <GoldList item={item} key={index}></GoldList>
                        </goldContext.Provider>);
                    })}
                </div>

            </div>
            <br />
            <div>
                <p style={{ "color": "indianred", "fontSize": "20px" }}>If the salary was paid with gold without increasing the salary every year, the current salary would be <span style={{ "color": "red" }}>{salaryAVG}</span></p>
            </div>
        </div>
    );
};
function GoldList({ item }) {
    const [goldRate, setGoldRate] = useContext(goldContext);
    // console.log(item);
    return (
        <div className='item flex justify-content-between bg-gray-50 py-2 rounded-r' >
            <span className='w-3/12'>{item.year}</span>
            <span className='w-3/12'>{item.salary}</span>
            <span className='w-6/12'>{item.goldPrice}</span>
        </div>
    );
};

export default GoldPrice;

