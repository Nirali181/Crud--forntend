import './App.css';
import AddUser from './pages/AddUser';
import EditUser from './pages/EditUser';
import Header from './pages/Header';
import UsersList from './pages/UsersList';
import {Routes,Route} from "react-router-dom"
import ViewUser from './pages/ViewUser';
function App() {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<UsersList />} />
        <Route path="/adduser" element={<AddUser />} />
        <Route path="/edituser/:id" element={<EditUser />} />
        <Route path="/viewuser/:id" element={<ViewUser />} />
      </Routes>
      
    </div>
  );
}

export default App;
