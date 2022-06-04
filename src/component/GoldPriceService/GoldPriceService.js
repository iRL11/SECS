import { db } from "../../firebase.Config";
import { collection, getDocs, getDoc, addDoc, updateDoc, deleteDoc, doc, query, where, onSnapshot } from "firebase/firestore";

const expenseCollectionRef = collection(db, 'goldPrice');

class GoldPriceService {
    addExpense = (expense) => {
        return addDoc(expenseCollectionRef, expense);
    };
    updateExpense = (id, updatedExpense) => {
        const expenseDoc = doc(db, "goldPrice", id);
        return updateDoc(expenseDoc, updatedExpense);
    }
    deleteExpense = (id) => {
        return deleteDoc(doc(db, "goldPrice", id))
    }
    filter = (val1, operator, val2) => {
        return query(collection(db, "goldPrice"), where(val1, operator, val2))
    }
    getAllExpense = () => {

        return getDocs(expenseCollectionRef);
    }
    getExpense = (id) => {
        const expenseDoc = doc(db, "goldPrice", id);
        return getDoc(expenseDoc);
    }
}
export default new GoldPriceService();