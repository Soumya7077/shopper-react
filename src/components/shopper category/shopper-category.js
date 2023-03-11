import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

export function ShopperCategory()
{
    const[products,setProducts]=useState([]);
    const params=useParams();
    const [cookie,setCookie,removeCookie]=useCookies();
    const navigate = useNavigate();

    useEffect(()=>{
        if (cookie["userid"]==undefined){
            navigate("/login")
        }
            axios({
                method: 'get',
                url :`http://fakestoreapi.com/products/category/${params.catname}`,
            })
            .then(response=>{
                setProducts(response.data);
            })        
    },[params.catname]);

    return(
        <div className="container-fluid">
            <h2>Shopper Category {params.catname}- {cookie["userid"]}</h2>
            <div className="d-flex flex-wrap">
                {
                    products.map(product=>
                        <div className="card m-2 p-2" style={{width:'200px'}}>
                            <img src={product.image} height="150" className="card-img-top" />
                            <div className="card-header" style={{height:'150px'}}>
                                <p>{product.title}</p>
                            </div>
                            <div className="card-footer">
                                <Link to={'/details/' + product.id} className="btn btn-primary w-100">Details</Link>
                            </div>
                        </div>
                        )
                }
            </div>
        </div>
    )
}