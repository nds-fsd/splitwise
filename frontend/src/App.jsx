import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Layout from "./components/Layout/Layout";
import Groups from "./pages/groups/groups";
import GroupExpenses from "./pages/groups/expense/expense";
import UserExpenses from "./pages/user/userExpenses/userExpenses";
import NoMatch from "./pages/noMatch/noMatch"
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

function App() {

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout forceUpdate={() => setForceUpdate(!forceUpdate)} />}>
            <Route path="/user/expenses" element={<UserExpenses />} />
            <Route path="/groups" element={<Groups />} />
            <Route path="/groups/:groupId/expenses" element={<GroupExpenses />} />
            <Route path='*' element={<NoMatch />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
