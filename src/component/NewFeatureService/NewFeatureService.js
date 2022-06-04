import { db } from "../../firebase.Config";
import { collection, getDocs, getDoc, addDoc, updateDoc, deleteDoc, doc, query, where, onSnapshot } from "firebase/firestore";

const expenseCollectionRef = collection(db, 'SavingsGold');

class NewFeatureService {
    addExpense = (expense) => {
        return addDoc(expenseCollectionRef, expense);
    };
    updateExpense = (id, updatedExpense) => {
        const expenseDoc = doc(db, "SavingsGold", id);
        return updateDoc(expenseDoc, updatedExpense);
    }
    deleteExpense = (id) => {

        return deleteDoc(doc(db, "SavingsGold", id))
    }
    filter = (val1, operator, val2) => {
        return query(collection(db, "SavingsGold"), where(val1, operator, val2))
    }
    getAllExpense = () => {
        return getDocs(expenseCollectionRef);
    }
    getExpense = (id) => {
        const expenseDoc = doc(db, "SavingsGold", id);
        return getDoc(expenseDoc);
    }
}
export default new NewFeatureService();