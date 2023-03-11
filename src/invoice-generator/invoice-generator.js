import { Formik,Form,Field,ErrorMessage,useFormik } from "formik";
import React,{ useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import jsPDF, { GState } from "jspdf";
import * as yup from "yup";
import { BrowserRouter,Route,Routes, Link } from "react-router-dom";


export function InvoiceGenerator()
{

    
    const date= new Date();
    const [invoiceNumber,setInvoiceNumber]=useState(0);
    const [cashierName, setCashierName] = useState('');
    const [customerName,setCustomerName] = useState('');
    const [itemName,setItemName] = useState('');
    const [qty,setQty] = useState(0);
    const [price,setPrice] = useState(0);
    const [tax,setTax] = useState(0.0);
    const [discount, setDiscount]=useState(0.0);
    const [addItems,setAddItems] = useState([{Name:'',Quantity:0,Price:0}]);
    const [style,setStyle] =useState({display:"block"});

    function HandleInvoiceChnage(e){
        setInvoiceNumber(e.target.value);
    }
    function HandleCahsierNameChange(e){
        setCashierName(e.target.value);
    }
    function HandleCustomerNameChange(e){
        setCustomerName(e.target.value);
    }
    function HandleItemChange(e){
        setItemName(e.target.value);
    }
    function HandleQtyChange(e){

        setQty(e.target.value);
    }
    function HandlePriceChange(e){
        setPrice(e.target.value);
    }
    function HandleTaxChange(e){
        setTax(e.target.value);
    }
    function HandleDiscountChange(e){
        setDiscount(e.target.value);
    }

    function CancelClick(e){
        e.preventDefault();
        setStyle({display:"none"});
    }
    function DownloadClick(e){
        e.preventDefault();
        setStyle({display:"none"});
        var doc = new jsPDF({orientation:"l",unit:"pt",format:"a3"});
        doc.setDrawColor('black');
        doc.html(document.querySelector("#bill"),{
        callback: function(pdf){ 
                pdf.save("Invoice.pdf");
            }
        })
        
    }

    const HandleRemoveField = (index)=>{
        const list = [...addItems];
        list.splice(index,1)
        setAddItems(list);
    }

    function AddClick(e){
        var s =e.preventDefault();
        const abc = [...addItems,[]]
        setAddItems(abc)
   
    }
    function GenerateClick(e){
        e.preventDefault();
    }

    const subtotal  = price * qty; 
    const taxRate = (tax * subtotal) / 100;
    const discountRate = (discount * subtotal) / 100;
    const total = subtotal - discountRate + taxRate;


   
    
    return(
        <div className="container-fluid">
        <Formik
            initialValues={{
                InvoiceNumber:0,
                CashierName:"",
                Customer:"",
                ItemName:"",
                Qty:0,
                Price:0,
                Tax :0,
                Discount:0
            }}

            onSubmit = {
                (values) =>{
                    axios({
                        method: "post",
                        url: "http://127.0.0.1:5000/storeinvoice",
                        data: values
                    })
                    .then(()=>{
                        alert("Stored Successfully..");
                        
                    })
                }
             }
          
        
        >
            <div>
            <Form>
                <h1 className="bg-dark text-white text-center mt-2">Shopping Invoice Generator</h1>
                <div className="d-flex justify-content-between">
                    <div className="ms-3"><b>Current Date:</b> <span>{date.toLocaleDateString()}</span></div>
                    <div className="me-3"><b>Invoice Number: </b><Field type="number" name="InvoiceNumber" onChange={HandleInvoiceChnage} value={invoiceNumber} /></div>
                </div><hr/>
                <h3 className="text-center mb-4">Invoice</h3>
                <div className="d-flex justify-content-between">
                    <div><b>Cashier:</b></div>
                    <Field type="text" name="CashierName" placeholder="Cashier Name" onChange={HandleCahsierNameChange} value={cashierName} className="ms-3 w-50" />
                    <div className="ms-2"><b>Customer:</b></div>
                    <Field type="text" name="Customer" placeholder="Customer Name" onChange={HandleCustomerNameChange} value={customerName} className="ms-3 w-50" />
                </div>
                <div className="d-flex justify-content-between" style={{marginTop:"40px"}}>
                    <div style={{marginRight:"380px"}}><b>ITEM</b></div>
                    <div><b>Quantity</b></div>
                    <div><b>Price</b></div>
                    <div><b>Action</b></div>
                </div><hr/>
                {
                    addItems.map((item,index)=>{
                        return(
                            <>
                                <div>
                                    <Field required type="text" value={itemName} placeholder="Item Name" id="item" onChange={HandleItemChange} name="ItemName"  className="w-50" />
                                    <Field type="number" className="ms-3" value={qty} name="Qty" id="qty" onChange={HandleQtyChange} placeholder="Quantity" />
                                    <Field type="number" step="0.01" name="Price" value={price} id="price" className="ms-4 w-25" onChange={HandlePriceChange} placeholder="Price" />
                                    <button className="bi bi-trash btn btn-danger m-3" onClick={HandleRemoveField} style={{marginLeft:"35px"}}></button>
                                </div>
                            </>
                        )
                    })
                }
                
                <button className="btn btn-primary mt-2" onClick={AddClick}>Add Item<span className="bi bi-plus-square-fill ms-2"></span></button><hr/>
                <div className="row mt-4">
                        <div className="col-3">
                            <div className="mb-2"><b>Subtotal:</b><span className="ms-2">{subtotal}</span></div>                                
                            <div className="mb-2"><b>Discount:</b><span className="ms-2">{discountRate}</span></div>                                
                            <div className="mb-2"><b>Tax:</b><span className="ms-2">{taxRate}</span></div>
                            <hr/>
                            <div><b>Total:</b><span className="ms-2">{total}</span></div>
                            
                        </div>
                        <div className="col-9" style={{paddingLeft:"550px"}}>
                            <div><b>Tax Rate:</b></div>
                            <div><Field  className="me-1" type="text" value={tax} name="Tax" onChange={HandleTaxChange} />%</div>
                            <div><b>Discount Rate:</b></div>
                            <div><Field  className="me-1" type="text" value={discount} name="Discount" onChange={HandleDiscountChange} />%</div>
                            <button className="btn btn-info mt-2 me-2" >Save</button>
                            <button className="btn btn-primary mt-2" data-bs-target="#bill" data-bs-toggle="modal" >Generate Invoice</button>
                            <div className="modal fade" align="center" id="bill">
                                <div className="modal-dialog">
                                    <div className="modal-content">
                                        <div className="modal-header">
                                            <h2 className="text-primary me-4">Your Bill Summary</h2>
                                            <label>Date:{date.toLocaleDateString()}</label>
                                            <button className="btn-close" data-bs-dismiss="modal" ></button>
                                        </div>
                                        <div className="modal-body text-dark">
                                            <dl className="row">
                                                <dt className="col-4">Invoice Number :</dt>
                                                <dd className="col-8">{invoiceNumber}</dd>
                                                <dt className="col-4">Cashier Name :</dt>
                                                <dd className="col-8">{cashierName}</dd>
                                                <dt className="col-4">Customer Name :</dt>
                                                <dd className="col-8">{customerName}</dd>
                                                <dt className="col-4">Item Name :</dt>
                                                <dd className="col-8">{itemName}</dd><hr/>
                                                <dt className="col-4">Quantity :</dt>
                                                <dd className="col-8">{qty}</dd>
                                                <dt className="col-4">Price :</dt>
                                                <dd className="col-8">{price}</dd>
                                                <dt className="col-4">Tax :</dt>
                                                <dd className="col-8">{tax/100}</dd>
                                                <dt className="col-4">Discount :</dt>
                                                <dd className="col-8">{discount/100}</dd>
                                                <dt className="col-4">Subtotal :</dt>
                                                <dd className="col-8">{subtotal}</dd>
                                                <hr/>
                                                <dt className="col-4">Total :</dt>
                                                <dd className="col-8">{total}</dd>
                                            </dl>
                                        </div>
                                        <div className="modal-footer">
                                            <div className="me-4">Local Time: {date.toLocaleTimeString()}</div>
                                            <button className="btn btn-dark ms-4" onClick={DownloadClick} style={style} >Download</button>
                                            <button className="btn btn-primary" onClick={CancelClick} style={style} data-bs-dismiss="modal" >Cancel</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
            </Form>

            </div>
        </Formik>
    </div>
)
}