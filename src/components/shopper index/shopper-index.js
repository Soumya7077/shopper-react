import { BrowserRouter,Routes,Route,Link } from "react-router-dom";
import { ShopperHome } from "../shopper home/shopper-home";
import { ShopperCategory } from "../shopper category/shopper-category";
import { ShopperJewelery } from "../shopper category/shopper-jewelery";
import { ShopperDetails } from "../shopper details/shopper details";
import { ShopperRegister } from "../register shopper/shopper register";
import { UserLogin } from "../Login components/login-component";
import { LoginError } from "../shopper login error/login-error";
import { CrudIndex } from "../../crud-opeartions/crud-index";
import { CrudCreate } from "../../crud-opeartions/crud-create";
import { CrudDetails } from "../../crud-opeartions/crud-details";
import { CrudEdit } from "../../crud-opeartions/crud-edit";


export function ShopperIndex()
{
    return(
        <div className="container-fluid">
            <BrowserRouter>
            <header className="d-flex p-1 justify-content-between">
            <div>
                <h2>Shopper.</h2>
            </div>
            <nav className="d-flex">
                <div className="me-2"><Link to="register" className="btn">Register</Link></div>
                <div className="me-2"><Link to="home" className="btn">Home</Link></div>
                <div className="me-2"><Link to="products" className="btn">Products</Link></div>
                <div className="me-2"><Link to="category/men's clothing" className="btn">Men's Fashion</Link></div>
                <div className="me-2"><Link to="category/women's clothing" className="btn">Women's Fashion</Link></div>
                <div className="me-2"><Link to="category/jewelery" className="btn">Jewelery</Link></div>
                <div className="me-2"><Link to="category/electronics" className="btn">Electronics</Link></div>
            </nav>
            <div>
                <span className="bi bi-search me-3"></span>
                <Link to="register" className="bi bi-person me-3"></Link>
                <span className="bi bi-heart me-3"></span>
                <span className="bi bi-cart4 me-3"></span>
            </div>
            </header>
            <div className="mt-2 bg-dark text-white text-center p-1">
            ⚡️ HAPPY HOLIDAY DEALS ON EVERYTHING ⚡️
            </div>
            <Routes>
                <Route path="/" element={<ShopperHome />}></Route>
                <Route path="home" element={<ShopperHome />}></Route>
                <Route path="category/:catname" element={<ShopperCategory />}></Route>
                <Route path="details/:id" element={<ShopperDetails />}></Route>
                <Route path="register" element={<ShopperRegister />}></Route>
                <Route path="login" element={<UserLogin />}></Route>
                <Route path="invalid" element={<LoginError />}></Route>
                <Route path="products" element={<CrudIndex />}></Route>
                <Route path="newproduct" element={<CrudCreate />}></Route>
                <Route path="cruddetails/:id" element={<CrudDetails />}></Route>
                <Route path="crudedit/:id" element={<CrudEdit   />}></Route>
            </Routes>
            </BrowserRouter>
        </div>
    )
}