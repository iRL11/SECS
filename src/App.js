import { createContext, useState } from 'react';
import './App.css';

import Login from './component/Login/Login';
import { initializeApp } from "firebase/app";
import firebaseConfig from './firebase.Config';
import NewAccount from './component/NewUser/NewAccount';
import Dashboard from './component/Dashboard/Dashboard';
import {Route,Routes} from 'react-router-dom';
import PrivateRoute from './component/RequiredAuth/PrivateRoute';
import ExpenseTracker from './component/ExpenseTracker/ExpenseTracker';
import AdminPanel from './component/admin/AdminPanel';
import GoldPrice from './component/GoldPrice/GoldPrice';
import NewFeature from './component/NewFeature/NewFeature';
import AdminGoldMonth from './component/AdminGoldMonth/AdminGoldMonth';

export const userContext = createContext();
function App() {
  const [user, setUser] = useState([])
  const [transaction,setTransaction] = useState([{name:'',type:'',amount:0, date:'',category:''}])
  initializeApp(firebaseConfig);
  return (
    <div className="App">
      <div className="container mx-auto max-w-6xl text-center drop-shadow-lg text-gray-800">
        <userContext.Provider value={[user,setUser,transaction,setTransaction]}>
            <Routes>
                <Route path="/" element={<Login/>}/>
                <Route path="/NewAccount" element={<NewAccount/>} />
                <Route path="/dashboard" element={
                <PrivateRoute><Dashboard></Dashboard></PrivateRoute>}/>
                <Route path="/ExpenseTracker" element={<ExpenseTracker></ExpenseTracker>}/>
                <Route path="/admin" element={<AdminPanel/>}/>
                <Route path="/goldPrice" element={<GoldPrice/>}/>
                <Route path="/newFeature" element={<NewFeature/>}/>
                <Route path="/adminGoldMonth" element={<AdminGoldMonth/>}/>
            </Routes>

          </userContext.Provider>
      </div>
    </div>
  );
}

export default App;
