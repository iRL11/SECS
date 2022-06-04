import { db } from "../../firebase.Config";
import { collection, getDocs, getDoc, addDoc, updateDoc, deleteDoc, doc, query, where, onSnapshot } from "firebase/firestore";

const expenseCollectionRef = collection(db, 'expense');

class ExpenseService {
    addExpense = (expense) => {
        return addDoc(expenseCollectionRef, expense);
    };
    updateExpense = (id, updatedExpense) => {
        const expenseDoc = doc(db, "expense", id);
        return updateDoc(expenseDoc, updatedExpense);
    }
    deleteExpense = (id) => {

        return deleteDoc(doc(db, "expense", id))
    }
    filter = (val1, operator, val2) => {
        return query(collection(db, "expense"), where(val1, operator, val2))
    }
    getAllExpense = () => {
        return getDocs(expenseCollectionRef);
    }
    getExpense = (id) => {
        const expenseDoc = doc(db, "expense", id);
        return getDoc(expenseDoc);
    }
}
export default new ExpenseService();