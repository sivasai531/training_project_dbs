import { React, useState, useEffect , Link} from 'react'
import PaymentComponent from './PaymentComponent';
import axios from 'axios';



export default function Dashboard() {



   const [employees, setEmployees] = useState([]);



   useEffect(() => {



       axios.get(`http://localhost:8080/dashboard`)
      .then(res => {
        console.log("transaction data")
        console.log(res);
        //axios.get(`http://localhost:8080/customer/${cusid}`).then(res1=>{console.log(res1)}
        setEmployees(res.data);
        // setAccholdername(res.data.accountholdername)
        // //setCurrency(res.data.currency)
        // setClearbal(res.data.clearbalance)
      })
      .catch(err => {
        console.log("hai");
        console.log(err);
        console.log("bye");
      })
  }, [])




    // const getAllEmployees = () => {
    //     TransferServices.g.then((response) => {
    //         setEmployees(response.data)
    //         console.log(response.data);
    //     }).catch(error => {
    //         console.log(error);
    //     })
    // }



   return (
        <div id="dashboard">
            <center>
                <div style={{width: "auto" }}>
                <table className="table table-bordered table-striped table-hover" >
                <thead>
                    <th>TRANSACTION ID</th>
                    <th>CUSTOMER ID</th>
                    <th>SENDER NAME</th>
                    <th>RECEIVER NAME</th>
                    <th>RECEIVER BIC</th>
                    <th>RECEIVER BANK</th>
                    <th>AMOUNT</th>
                    <th>CURRENCY</th>
                    <th>MESSAGE CODE</th>
                    <th>TRANSFER TYPE</th>
               </thead>
                <tbody>
                    {
                        employees.map(
                            employee =>
                                <tr key={employee.transactionid}>
                                    <td> {employee.transactionid} </td>
                                    <td>{employee.customer.customerid}</td>
                                    <td> {employee.customer.accountholdername} </td>
                                   <td>{employee.receiveraccountholdername}</td>
                                  <td>{employee.bank2.bic }</td> 
                                    <td>{employee.bank2.bankname}</td>
                                    <td>{employee.inramount}</td>
                                    <td>{employee.currency.currencycode}</td>
                                    <td>{employee.message.messagecode}</td>
                                    <td>{employee.transfertypes.transfertypecode}</td> 
                                </tr>
                        )
                    }
                </tbody>
            </table>
                </div>
            
            </center>
      
        </div>
    )
}