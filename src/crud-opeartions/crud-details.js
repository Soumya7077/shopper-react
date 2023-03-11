import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom"


export function CrudDetails()
{

    const params = useParams();
    const [products, setProducts] = useState([{ProductId:0, Name:'', Price:0, Stock:false}]);

    useEffect(()=>{
        axios({
            method:'get',
            url:`http://127.0.0.1:8080/details/${params.id}`
        })
        .then(response=>{
            setProducts(response.data);
        })
    },[]);

    return(
        <div className="container-fluid">
            <h2>Product Details</h2>
            <dl>
                <dt>Name</dt>
                <dd>{products[0].Name}</dd>
                <dt>Price</dt>
                <dd>{products[0].Price}</dd>
                <dt>Stock</dt>
                <dd>{(products[0].Stock == true)?"Available" : "Out of Stock"}</dd>
            </dl>
            <Link to="/products">back to products</Link>
        </div>
    )
}