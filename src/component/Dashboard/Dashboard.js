import React, { useContext, useState } from 'react';
import PreGraph from '../Graph/preGraph/PreGraph';
import PreForm from './../Form/PrevForm/PreForm';
import CurrentForm from './../Form/CurrentForm/CurrentForm';
import CurrentGraph from '../Graph/CurrentGraph/CurrentGraph';
import { userContext } from '../../App';
import NavBar from './../NavBar/NavBar';

const Dashboard = () => {
    const [, , transaction, setTransaction] = useContext(userContext)
    const [preTotal, setPreTotal] = useState(0);
    const [currentTotal, setCurrentTotal] = useState(0);
    const [currentSalary, setCurrentSalary] = useState(0);

    const makeComparison = () => {
        let preTotal = 0, currentTotal = 0, currentSalary = 0;
        for (var i = 0; i < transaction.length; i++) {
            if (transaction[i].category === 'Previous' && (transaction[i].type === 'Savings' || transaction[i].type === 'expense')) {
                preTotal += parseInt(transaction[i].amount)
            }
            else if (transaction[i].category === 'Current' && (transaction[i].type === 'Savings' || transaction[i].type === 'expense')) {
                currentTotal += parseInt(transaction[i].amount)
            }
            else if (transaction[i].category === 'Current' && (transaction[i].name === 'Salary' || transaction[i].name === 'salary')) {
                currentSalary = transaction[i].amount;
            }
        }
        console.log(preTotal, currentTotal, currentSalary);
        setPreTotal(preTotal);
        setCurrentTotal(currentTotal);
        setCurrentSalary(currentSalary);
    }

    return (
        <div>
            <NavBar />
            <br />
            <div className='grid md:grid-cols-2 gap-4'>

                <PreForm />
                <CurrentForm />
                <PreGraph />
                <CurrentGraph />

            </div>
            <button className="border py-2 text-white bg-red-500 w-full" onClick={makeComparison}>Make Comparison</button>
            <Difference preTotal={preTotal} currentSalary={currentSalary} currentTotal={currentTotal} />
        </div>
    );
};
const Difference = (props) => {
    // console.log(props.preTotal,props.currentSalary,props.currentTotal)
    const preTotal = parseInt(props.preTotal);
    const currentSalary = parseInt(props.currentSalary);
    const currentTotal = parseInt(props.currentTotal);

    return (
        <div>
            <div className='item flex justify-content-between m-6 bg-gray-50 py-2 rounded-r'>
                <span className='w-48'>Previous Expense</span>
                <span className='w-96'>{preTotal}</span>
            </div>
            <div className='item flex justify-content-between m-6 bg-gray-50 py-2 rounded-r'>
                <span className='w-48'>Current Expense</span>
                <span className='w-96'>{currentTotal}</span>
            </div>
            <div className='item flex justify-content-between m-6 bg-gray-50 py-2 rounded-r'>
                <span className='w-48'>Difference Between Previous and Current Expense</span>
                <span className='w-96'>{currentTotal - preTotal}</span>
            </div>
            <div className='item flex justify-content-between m-6 bg-gray-50 py-2 rounded-r' style={{ background: `${(currentTotal - preTotal) * 100 / currentSalary > 0 ? "red" : (currentTotal - preTotal) * 100 / currentSalary < 0 ? "green" : "blue"}`, color: 'white' }}>
                <span className='w-48'>Salary Changed Ratio</span>
                {/* {console.log(currentTotal,preTotal,currentSalary)} */}
                <span className='w-96'>{(((currentTotal - preTotal) * 100) / currentSalary) > 0 ? (((currentTotal - preTotal) * 100) / currentSalary).toFixed(2) + '% Decreased' : (((currentTotal - preTotal) * 100) / currentSalary) < 0 ? (((preTotal - currentTotal) * 100) / currentSalary).toFixed(2) + '% Increased' : '0%'}</span>
            </div>
        </div>
    );
}

export default Dashboard;