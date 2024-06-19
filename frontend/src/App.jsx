import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Main from "./components/Main";
import Home from "./components/Home";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Dashboard from "./components/admin/Dashboard";
import AddProduct from "./components/admin/AddProduct";
import ProductList from "./components/admin/ProductList";
import EditProduct from "./components/admin/EditProduct";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Main />,
      children: [
        { 
          path: "", element: <Home /> 
        },
        {
          path:'admin/dashboard',element:
          <ProtectedRoutesForAdmin>
            <Dashboard/>
          </ProtectedRoutesForAdmin>
        },
        {
          path:'admin/addProduct',element:
          <ProtectedRoutesForAdmin>
            <AddProduct/>
          </ProtectedRoutesForAdmin>
        },
        {
          path:'admin/productList',element:
          <ProtectedRoutesForAdmin>
            <ProductList/>
          </ProtectedRoutesForAdmin>
        },
        {
          path:'admin/editProduct/:id',element:
          <ProtectedRoutesForAdmin>
            <EditProduct/>
          </ProtectedRoutesForAdmin>
        }
      ],
    },
    {
      path:"/login",
      element:<Login/>
    },
    {
      path:"/signup",
      element:<Signup/>
    },
  ]);

  return (
      <RouterProvider router={router}></RouterProvider>
  );
}

export default App;


// Protected Routes For Admin
export const ProtectedRoutesForAdmin = ({ children }) => {
  const admin = JSON.parse(localStorage.getItem("user"));
  // console.log(admin);
  if (admin?.email === "sonusharma30.09.2004@gmail.com") {
    return children;
  } else {
    return <Navigate to="/login" />;
  }
};