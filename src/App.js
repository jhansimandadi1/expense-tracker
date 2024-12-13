import React from 'react';
import {Route, Routes} from 'react-router-dom';
import AddExpense from './components/AddExpense';
import Dashboard from './components/Dashboard';
import {Provider} from 'react-redux';
import store from './store/store';
import './App.css';

const App = () => {
  return (
    <div className="App">
      <Provider store={store}>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/expense/:id" element={<AddExpense />} />
          <Route path="/expense" element={<AddExpense />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </Provider>
    </div>
  );
};

export default App;
