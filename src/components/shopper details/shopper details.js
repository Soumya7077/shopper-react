import { Link, useParams } from "react-router-dom";
import { useState,useEffect } from "react";
import axios from "axios";

export function ShopperDetails()
{
    const[products,setProducts]=useState({id:0,title:'',price:0, rating:{rate:0, count:0}});
    const params=useParams();

    useEffect(()=>{
        axios({
            method:'get',
            url:`http://fakestoreapi.com/products/${params.id}`
        }).then(response=>{
            setProducts(response.data);
        })
    },[]);

    return(
        <div className="container-fluid">
            <h2>Details</h2>
            <div className="row">
                <div className="col-3">
                    <img src={products.image} width="200" height="200" />
                </div>
                <div className="col-9">
                    <dl>
                        <dt>Title</dt>
                        <dd>{products.title}</dd>
                        <dt>Price</dt>
                        <dd>{products.price}</dd>
                        <dt>Rating</dt>
                        <dd><span className="bi bi-star-fill text-success"></span>{products.rating.rate} [{products.rating.count}]</dd>
                    </dl>
                    <div>
                        <Link to={'/category/' +products.category}>Back to {products.category}</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}