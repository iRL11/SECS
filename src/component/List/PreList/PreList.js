import React, { useContext } from 'react';
import { userContext } from '../../../App';
import 'boxicons'

const PreList = () => {
    const [, , transaction,] = useContext(userContext)
    return (
        <div className='flex flex-col py-6 gap-3'>
            <h1 className='py-4 font-bold text-xl'>Previous History</h1>
            {transaction.map((item, index) => {
                if (item.category === 'Previous') {
                    return <Transaction item={item} index={index} key={index}></Transaction>
                }
                return <></>
            })}
        </div>
    );
};

function Transaction(props) {
    console.log(props)
    const item = props.item
    const index = props.index;
    const [, , transaction, setTransaction] = useContext(userContext)
    const delete_item = (type, name, amount, id) => {
        setTransaction(transaction.filter(product => product.id !== id))
    }
    if (item.type === "") return null;
    return (
        <div className='item flex justify-content-between bg-gray-50 py-2 rounded-r' style={{ borderRight: `8px solid ${item.type === 'income' ? "green" : item.type === 'savings' ? "blue" : "red"}` }}>
            <button className='px-3' onClick={() => delete_item(item.type, item.name, item.amount, item.id)}><box-icon color={item.type === 'income' ? "green" : item.type === 'savings' ? "blue" : "red"} size="15" name="trash"></box-icon></button>
            <span className='w-1/12'>{item.date ?? ""}</span>
            <span className='w-2/12'>{"P-" + index}</span>
            <span className='w-24'>{item.name ?? ""}</span>
            <span className='w-1/5'>{item.type ?? ""}</span>
            <span className='w-2/12'>{item.amount ?? ""}</span>
        </div>
    )
}
export default PreList;