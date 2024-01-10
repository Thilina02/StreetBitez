import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import 'font-awesome/css/font-awesome.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter,Routes, Route} from 'react-router-dom';
import NavBar from '../src/components/NavBar';
import { ToastContainer } from 'react-toastify'; // Import ToastContainer
import 'react-toastify/dist/ReactToastify.css';
import Home from '../src/pages/Home';
import Login from '../src/pages/Login';
import Register from '../src/pages/Register';
import axios from 'axios';
import { Toaster } from 'react-hot-toast'
import { UserContextProvider } from '../contex/userContex';
import SeesupportPage from './pages/seesupport';
import Dashbord from './pages/dashbord';
import Edit from './pages/edit';
import Profile from './pages/profile';
import Itemlist from '../src/pages/itemlist';
import AddNew from '../src/pages/addNew';
import Feedback from './pages/feedbacks';
import Admindashbord from './pages/admin-dashbord'
import CustomerAdminPage from './pages/customerAdmin'
import SupportMessage from './pages/support';
import InvList from './pages/invList'
import UserEdit from './pages/UserEdit';
import CustomerDetailsPage from './pages/CustomerDetailsPage';
import SeeFeedbacksPage from './pages/Seefeedbacks';
import InvEdit from '../src/pages/invEdit';
import Password from '../src/pages/password'
import 'bootstrap/dist/css/bootstrap.css'
import SalesFromStall from './pages/salesFromStall';

import "bootstrap/dist/css/bootstrap.min.css";
import AddNewEvent from './pages/addNewEvent';
import EventList from './pages/eventList';
import EventUpdate from '../src/pages/eventUpdate';

import EventSuccess from '../src/pages/eventSuccess';
import EventHome from './pages/eventHome';
import EventDetail from './pages/eventDetail';
import EventAbout from './pages/eventAbout';

import EventDetail2 from './pages/eventDetail2';
import EventDetail3 from './pages/eventDetail3';
import EventDetail4 from './pages/eventDetail4';
import EventListUser from './pages/eventListUser';
import AdminConfirm from './pages/admin-confirm';

import ItemDetails from '../src/pages/itemDetails';
import AddStock from '../src/pages/addStock';
import IssueEntry from './pages/issueEntry';
import IssuedDetails from './pages/IssuedDetails';
import ItemlistFur from '../src/pages/itemlistFur';
import ItemlistMac from '../src/pages/itemlistMac';
import AddNewFur from '../src/pages/addNewFur';
import AddNewMac from '../src/pages/addNewMac';
import Issued from './pages/Issued';
import SalesFromOrders from './pages/SalesFromOrders';
import ExternalIncomes from './pages/ExternalIncomes';






import "bootstrap/dist/css/bootstrap.min.css";
import CreateStallreq from './pages/CreateStallreq';
import StallAdminreq from './pages/StallAdminreq';
import StallCreate from './pages/StallCreate';
import PizzaMart from './pages/PizzaMart';
import SweetSerenity from './pages/SweetSerenity';
import Asiano from './pages/Asiano';
import SriLankanFoodStall from './pages/SriLankanFoodStall';

import Payment from './pages/payment'

import StallLogin from './pages/StallLogin'
import StallOwnerDashboard from './pages/StallOwnerDashboard';
import { StallContextProvider } from '../contex/stallContext';
import GetProduct from './pages/GetProduct';
import CreateStall from './pages/CreateStall';
import UpdateProduct from './pages/UpdateProduct';
import OurStallsHomePage from './pages/OurStallsHomePage';
import StallAdmin from './pages/StallAdmin';
import CreatedStallsAdminView from './pages/CreatedStallsAdminView';
import MarketingAndPromotionAdmin from './pages/MarketingAndPromotionAdmin';
import TicketForm from './pages/TicketForm';
import AdminTicketList from './pages/AdminTicketList';
import SeeMenuPage from './pages/SeeMenuPage';
import MonthlyIncomeReport from './pages/MonthlyIncomeReport';

import GetEmployee from './pages/GetEmployee';
import CreateEmployee from './pages/CreateEmployee';
import UpdateEmployee from './pages/UpdateEmployee';
import EmployeeDashboardHome from './pages/EmployeeDashboardHome';
import LoginEmployee from './pages/LoginEmployee';



import { EmployeeContextProvider } from '../contex/EmployeeContext';
import CreateEmployeeShift from './pages/CreateEmployeeShift';
import GetEmployeeShift from './pages/GetEmployeeShift';
import UpdateEmployeeShift from './pages/UpdateEmployeeShift';
import EmployeeDashboard from './pages/EmployeeDashboard';

import CreateEmployeeLeave from './pages/CreateEmployeeLeave';
import GetEmployeeLeaveA from './pages/GetEmployeeLeaveA';

import CreateEmployeeContact from './pages/CreateEmployeeContact';
import GetEmployeeContact from './pages/GetEmployeeContact';

import CreateEmployeeNews from './pages/CreateEmployeeNews';
import GetEmployeeNews from './pages/GetEmployeeNews';

import CreateEmployeeSalary from './pages/CreateEmployeeSalary';
import GetEmployeeSalary from './pages/GetEmployeeSalary';
import ReceiptForOrder from './pages/receiptForOrder';
import ReceiptForStall from './pages/receiptForStall';
import GetAllStallData from './pages/getAllStallData';
import GetAllOrderData from './pages/getAllOrderData';
import PaymentMethod from './pages/paymentMethod';
import Paidbycard from './pages/paidByCard';
import CashOnDeliver from './pages/cashOnDeliver';
import FinancePage from './pages/financePage';
import CardDetails from './pages/CreditCard';
import Expenses from './pages/expenses'
import Cart from './pages/CartItems'
import OrderAdminPage from './pages/orderAdmin'
import IncomePage from './pages/Income';
import AdminFinance from './pages/adminFinance';
import SuccessfullPayment from './pages/successfullPayments';
import ViewSuccessPayments from './pages/ViewSuccessPayments'

import PaymentSuccess from './pages/paymentSuccess';
import UpdateIncomePage from './pages/updateIncome';
import UpdateExpenses from './pages/updateExpenses';

import EmployeeProfileA from './pages/EmployeeProfileA'
import DriverRegister from '../src/pages/driverRegister';
import DriverLogin from '../src/pages/driverLogin';
import { DriverContextProvider } from '../contex/driverContex';
import DriverDashboard from '../src/pages/driverDashboard';
import DriverProfile from '../src/pages/driverProfile';
import UpdateDriverProfile from '../src/pages/driverUpdate';
import DriverFeedback from './pages/driverFeedback';
import DriverCompletedOrders from './pages/driverCompletedOrders'
import 'bootstrap/dist/css/bootstrap.min.css';
import DriverAdmin from '../src/pages/Driver-admin';
import DriverAdminHome from '../src/pages/driver-adminHome';
import ViewTotalSales from './pages/ViewtotalSales';




axios.defaults.baseURL = 'http://localhost:8000';
axios.defaults.withCredentials = true

function App() {
  return (
    <UserContextProvider>
     <StallContextProvider>
      <EmployeeContextProvider>
      
    
    <ToastContainer position="top-center" toastOptions={{ duration: 3000 }} />
    <Toaster position='top-center' toastOptions={{duration:3000}}/>
        
    <Routes>
      <Route path='/' element={<Home/>} />
      <Route path='/register' element={<Register/>} />
      <Route path='/login' element={<Login/>} />
      <Route path='/dashbord' element={<Dashbord/>} />
      <Route path='/edit/:userId' element={<Edit />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/itemlist" element={<Itemlist />} />
      <Route path="/addNew" element={<AddNew />} />
      <Route path="/invEdit/:itemId" element={<InvEdit />} />
      <Route path="/itemDetails/:itemcode" element={<ItemDetails />} />
      <Route path="/addStock/:itemcode" element={<AddStock />} />
      <Route path="/IssueEntry" element={<IssueEntry />} />
      <Route path="/IssuedDetails/:stoleid" element={<IssuedDetails />} />
      <Route path="/itemlistFur" element={<ItemlistFur />} />
      <Route path="/itemlistMac" element={<ItemlistMac />} />
      <Route path="/addNewFur" element={<AddNewFur />} />
      <Route path="/addNewMac" element={<AddNewMac />} />
      <Route path="/Issued" element={<Issued />} />
      <Route path='/profile' element={<Profile />} />
      <Route path='/feedbacks' element={<Feedback/>} />
      <Route path='/support' element={<SupportMessage/>}/>
      <Route path='/admin-dashbord' element={<Admindashbord/>}/>
      <Route path='/customerAdmin' element={<CustomerAdminPage/>}/>
      <Route path='/invList' element={<InvList/>}/>
      <Route path='/CustomerDetailsPage' element={<CustomerDetailsPage/>}/>
      <Route path='/Seefeedbacks' element={<SeeFeedbacksPage/>}/>
      <Route path='/seesupport' element={<SeesupportPage/>}/>
      <Route path='/password' element={<Password/>}/>
      <Route path="/UserEdit/:userId" element={<UserEdit />} />
      <Route path="/addNewEvent" element={<AddNewEvent />}/>
      <Route path="/eventList" element={<EventList />}/>
      <Route path='/StallAdminreq' element={<StallAdminreq />}></Route>
      <Route path='/stallreq' element={<CreateStallreq />}></Route>
      <Route path='/stallCreate' element={<StallCreate />}></Route>
      <Route path='/StallOwnerDashboard' element={<StallOwnerDashboard />}></Route>
      <Route path='/shop/1' element={<PizzaMart />} />
      <Route path='/shop/3' element={<SweetSerenity/>}></Route>
      <Route path='/shop/4' element={<Asiano/>}></Route>
      <Route path='/shop/2' element={<SriLankanFoodStall/>}></Route>
      <Route path='/createStall' element={<CreateStall/>}></Route>
      <Route path='/Stalllogin' element={<StallLogin/>}></Route>
      <Route path='/StallOwnerDashboard' element={<StallOwnerDashboard/>}></Route>       
      <Route path='/getProduct' element={<GetProduct/>}></Route>
      <Route path='/update/:id' element={<UpdateProduct/>}></Route>
      <Route path='/OurStallsHomePage' element={<OurStallsHomePage/>}></Route> 
      <Route path='/stallAdmin' element={<StallAdmin />}></Route>
      <Route path='/createdStalls' element={<CreatedStallsAdminView />}></Route>
      <Route path='/promotions' element={<MarketingAndPromotionAdmin />}></Route>
      <Route path='/createTicket' element={<TicketForm />}></Route>
      <Route path='/getTicket' element={<AdminTicketList />}></Route>
      <Route path='/menu' element={<SeeMenuPage />}></Route>
      <Route path='/generateMonthlyIncomeReport' element={<MonthlyIncomeReport />}></Route> 
      <Route path='/SalesFromOrders' element={<SalesFromOrders />}></Route>

      <Route path='/stallownerdash' element={<StallOwnerDashboard />}></Route>
      <Route path='/pizzaMart' element={<PizzaMart/>}></Route>
      <Route path='/sweetS' element={<SweetSerenity/>}></Route>
      <Route path='/asiano' element={<Asiano/>}></Route>
      <Route path='/slStall' element={<SriLankanFoodStall/>}></Route>
   
      <Route path='/Paidbycard' element={<Paidbycard/>}></Route>
      <Route path='/CashOnDeliver' element={<CashOnDeliver/>}></Route>
      <Route path='/GetAllOrderData/:id' element={<GetAllOrderData/>}></Route>
      <Route path='/PaymentMethod/:id' element={<PaymentMethod/>}></Route>
      <Route path='/ReceiptForOrder/:id' element={<ReceiptForOrder/>}></Route>
      <Route path='/ReceiptForStall/:id' element={<ReceiptForStall/>}></Route>
      <Route path='/GetAllStallData/:id' element={<GetAllStallData/>}></Route>
      <Route path='/FinancePage' element={<FinancePage/>}></Route>
      <Route path='/Expenses' element={<Expenses/>}></Route>
      <Route path='/IncomePage' element={<IncomePage/>}></Route>
      <Route path="/updateIncome/:Id" element={<UpdateIncomePage />} />
      <Route path="/updateExpense/:Id" element={<UpdateExpenses />} />
      <Route path="/CardDetails/:id" element={<CardDetails />} />
      <Route path="/AdminFinance" element={<AdminFinance />} />
      <Route path='/PaymentSuccess' element={<PaymentSuccess/>}></Route>
      <Route path='/SuccessfullPayment' element={<SuccessfullPayment/>}></Route>
      <Route path='/cart' element={<Cart/>}></Route>
      <Route path='/order-admin' element={<OrderAdminPage/>}></Route>
      <Route path='/payment' element={<Payment/>}></Route>
      <Route path='/ViewSuccessPayments' element={<ViewSuccessPayments/>}></Route>
      <Route path='/SalesFromStall' element={<SalesFromStall/>}></Route>
      <Route path='/ExternalIncomes' element={<ExternalIncomes/>}></Route>
      <Route path='/ViewTotalSales' element={<ViewTotalSales/>}></Route>
      <Route path="/eventListUser" element={<EventListUser />}/>
      <Route path="/eventSuccess" element={<EventSuccess />}/>
      <Route path="/eventHome" element={<EventHome />}/>
      <Route path="/eventDetail" element={<EventDetail />}/>
      <Route path="/eventAbout" element={<EventAbout />}/>
      <Route path="/eventDetail2" element={<EventDetail2 />}/>
      <Route path="/eventDetail3" element={<EventDetail3 />}/>
      <Route path="/eventDetail4" element={<EventDetail4 />}/>
      <Route path="/eventUpdate/:eventId" element={<EventUpdate />} />
      <Route path="/admin-confirm" element={<AdminConfirm />} />
      <Route path='/employeeDashboard' element={<EmployeeDashboard />} />
      <Route path='/getEmployee' element={<GetEmployee />} />
      <Route path='/createEmployee' element={<CreateEmployee />} />
      <Route path='/updateEmployee/:_id' element={<UpdateEmployee />} />
      <Route path='/LoginEmployee' element={<LoginEmployee/>}/>
      <Route path='/employeeDashboardHome' element={<EmployeeDashboardHome/>}/>
      <Route path='/getEmployeeShift' element={<GetEmployeeShift />} />
      <Route path='/createEmployeeShift' element={<CreateEmployeeShift />} />
      <Route path='/updateEmployeeShift/:_id' element={<UpdateEmployeeShift />} />
      <Route path='/createEmployeeLeave' element={<CreateEmployeeLeave />} />
      <Route path='/getEmployeeLeaveA' element={<GetEmployeeLeaveA />} />
      <Route path='/createEmployeeContact' element={<CreateEmployeeContact />} />
      <Route path='/getEmployeeContact' element={<GetEmployeeContact />} />
      <Route path='/createEmployeeNews' element={<CreateEmployeeNews />} />
      <Route path='/getEmployeeNews' element={<GetEmployeeNews />} />
      <Route path='/createEmployeeSalary' element={<CreateEmployeeSalary/>}/>
      <Route path='/getEmployeeSalary' element={<GetEmployeeSalary/>}/>
      <Route path='/employeeProfileA' element={<EmployeeProfileA/>}/>
                



    </Routes>
    </EmployeeContextProvider>
    </StallContextProvider>
   
      <DriverContextProvider>
        
        <Toaster position='top-center' toastOptions={{ duration: 3000 }} />
        <Routes>
          
          <Route path='/driver-register' element={<DriverRegister />} />
          <Route path='/driver-login' element={<DriverLogin />} />
          <Route path='/driver-dashboard' element={<DriverDashboard />} />
          <Route path='/driver-profile' element={<DriverProfile />} />
          <Route path='/driver-update/:id' element={<UpdateDriverProfile />} />
          <Route path='/driver-feedback' element={<DriverFeedback />} />
          <Route path='/driver-compOrds' element={<DriverCompletedOrders />} />
          <Route path='/driver-admin' element={<DriverAdmin />} />
          <Route path='/driver-adminHome' element={<DriverAdminHome/>} />


        </Routes>
      </DriverContextProvider>
    </UserContextProvider>

  )
}

export default App
