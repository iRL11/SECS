import React, { useContext } from 'react';
import { userContext } from '../../../App';
const PreLabel = () => {
    const [, , transaction,] = useContext(userContext)
    let total_income = 0;
    let total_savings = 0;
    let total_expense = 0;
    for (var i = 0; i < transaction.length; i++) {
        if (transaction[i].category === 'Previous') {
            if (transaction[i].type === 'income') {
                total_income += parseInt(transaction[i].amount);
            }
            else if (transaction[i].type === 'savings') {
                total_savings += parseInt(transaction[i].amount);
            }
            else if (transaction[i].type === 'expense') {
                total_expense += parseInt(transaction[i].amount);
            }
        }
    }
    return (
        <div>
            <LabelComponent
                total_amount={total_income - (total_savings + total_expense)}
                total={total_income}
                type="income"
            >
            </LabelComponent>
            <br />
            <LabelComponent
                total={total_income}
                type="savings"
                total_amount={total_savings}>
            </LabelComponent>
            <br />
            <LabelComponent
                total={total_income}
                type="expense"
                total_amount={total_expense} >
            </LabelComponent>
        </div>
    );
};
function LabelComponent(props) {

    if (props.type === "") return <></>
    return (
        <div className="labels flex justify-between">
            <div className='flex gap-2'>
                <div className='w-2 h-2 rounded py-3' style={{ background: props.type === "income" ? "lime" : props.type === "savings" ? "blue" : 'red' }}>
                </div>
                <h3 className='text-md'>{props.type === "income" ? "Cash In Hand" : props.type}</h3>
            </div>
            <h3 className='font-bold'>{(props.total_amount != '' ? ((props.total_amount * 100) / props.total) : 0).toFixed(2)}%</h3>
        </div>
    )
}
export default PreLabel;