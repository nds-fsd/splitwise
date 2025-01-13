import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
// import User from './pages/user/user';
import UserExpenses from './pages/user/userExpenses/userExpenses';
import GroupExpenses from './pages/group/groupExpenses/groupExpenses';
import Layout from './components/Layout/Layout';
import { QueryClient, QueryClientProvider } from 'react-query';
import { useState } from 'react';

const queryClient = new QueryClient();

function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Layout forceUpdate={() => setForceUpdate(!forceUpdate)} />}>
                        <Route path="/user/expenses" element={<UserExpenses />} />
                        <Route path="/group/expenses" element={<GroupExpenses />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </QueryClientProvider>
    );
}

export default App;
