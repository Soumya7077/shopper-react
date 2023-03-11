import axios from "axios";
import { Formik,Form,Field,ErrorMessage } from "formik";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

export function CrudCreate()
{
    const navigate=useNavigate();
    const [products,setProducts] = useState([]);
    const [error,setEror] = useState('');
    const [style,setStyle] = useState({color:''});

    useEffect(()=>{
        axios({
            method:'get',
            url:'http://127.0.0.1:8080/products'
        })
        .then(res=>{
            setProducts(res.data);
        })
    },[]);

    function VerifyProductId(e){
        var id=parseInt(e.target.value);
        for (var product of products ){
            if(product.ProductId==id){
                setEror('Product Id is not available - Try Another');
                setStyle({color:'red'});
                break;
            }else{
                setEror('Product Id Available');
                setStyle({color:'green'});
            }
        }
    }

    return(
        <div className="container-fluid">
            <h2>Add New Product</h2>
            <Formik
                initialValues={{
                    ProductId:0,
                    Name:'',
                    Price:0,
                    Stock:false
                }}
                validationSchema={
                    yup.object({
                        ProductId:yup.number().required("Product Id Required"),
                        Name:yup.string().required("Product Name Required"),
                        Price:yup.number().required("Product Price Required")
                    })
                }

                onSubmit={
                    (values)=>{
                        axios({
                            method:'post',
                            url:'http://127.0.0.1:8080/addproducts',
                            data:values
                        }).then(()=>{
                            alert("Product Registred");
                            navigate("/products");
                        })
                    }
                }
            >
                <Form>
                    <dl>
                        <dt>Product Id</dt>
                        <dd><Field name="ProductId" onKeyUp={VerifyProductId} type="number"></Field></dd>
                        <dd style={style}>{error}</dd>
                        <dt>Product Name</dt>
                        <dd><Field name="Name" type="text"></Field></dd>
                        <dt>Price</dt>
                        <dd><Field name="Price" type="number"></Field></dd>
                        <dt>Stock</dt>
                        <dd className="form-switch"><Field className="form-check-input" name="Stock" type="checkbox"></Field>Available</dd>
                    </dl>
                    <button className="btn btn-primary">Add Product</button>
                    <Link className="ms-2" to="/products">View Products</Link>
                </Form>
            </Formik>
        </div>
    )
}