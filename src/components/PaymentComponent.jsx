import { React, useState, useEffect } from 'react'
import { Redirect, useHistory } from "react-router-dom";
import axios from 'axios'

function PaymentComponent() {
    const history = useHistory();

    let customers = [];
    let customersdata = {};
    let bankdata = {};
    let currencydata = {};
    let transfertypesdata = {};
    let messagedata = {};

    function generateCustomerDatalist(customerResponse) {
        let datalist = document.getElementById("customersList");

        for (const i of customerResponse) {
            console.log(i.customerid);
            let option = document.createElement("option");
            option.value = i.customerid;
            datalist.appendChild(option);

            customersdata[i.customerid] = {
                "accountholdername": i.accountholdername,
                "clearbalance": i.clearbalance,
                "customeraddress": i.customeraddress,
                "customercity": i.customercity,
                "customerid": i.customerid,
                "customertype": i.customertype,
                "overdraftflag": i.overdraftflag,
            }
        }
    }

    function fetchCustomer(e) {
        let customerid = e.target.value;
        console.log(customerid)
        console.log("End")
        if (customersdata.hasOwnProperty(customerid)) {
            console.log(customersdata[customerid].accountholdername)
            document.getElementById("accountHolderName").value = customersdata[customerid].accountholdername;
            document.getElementById("clearBalance").value = customersdata[customerid].clearbalance;
        }
        else {
            document.getElementById("accountHolderName").value = "";
            document.getElementById("clearBalance").value = "";
        }

    }

    function fetchBank(e) {
        let bic = e.target.value;
        console.log(bic);
        console.log(bankdata)

        if (bankdata.hasOwnProperty(bic)) {
            document.getElementById("institutionName").value = bankdata[bic];
        }
        else {
            document.getElementById("institutionName").value = "";
        }
    }

    function generateBankDatalist(bankResponse) {

        let datalist = document.getElementById("banksList")
        for (const i of bankResponse) {
            let option = document.createElement("option");
            option.value = i.bic;
            datalist.appendChild(option);

            bankdata[i.bic] = i.bankname;
        }
    }

    function generateCurrencyDatalist(currencyResponse) {
        console.log(currencyResponse)
        let selectElement = document.getElementById("CUR");
        for (const i of currencyResponse) {
            let option = document.createElement("option");
            option.innerHTML = i.currencyname;
            option.value = i.currencycode;
            if (i.currencycode === "INR") {
                option.setAttribute("selected", "true");
            }
            selectElement.appendChild(option);

            currencydata[i.currencycode] =
            {
                "currencyname": i.currencyname,
                "conversionrate": i.conversionrate
            }
        }
    }

    function generateTransferTypesDatalist(transferTypesResponse) {

        let selectElement = document.getElementById("transferType");
        for (const i of transferTypesResponse) {
            let option = document.createElement("option");
            option.value = i.transfertypecode;
            option.innerHTML = i.transfertypecode;
            selectElement.appendChild(option);

            transfertypesdata[i.transfertypecode] = i.transfertypedescription;
        }
        console.log(transfertypesdata)
    }

    function generateSenderBICInput(e) {
        if (e.target.value === "Bank Transfer") {
            let div = document.getElementById("senderbic");
            div.innerHTML = "";
            let label = document.createElement("label")
            label.setAttribute("for", "senderBIC");
            label.innerHTML = "Sender BIC"

            let input = document.createElement("input")
            input.setAttribute("type", "text");
            input.setAttribute("id", "senderBIC");
            input.setAttribute("name", "senderBIC");
            input.setAttribute("class", "form-control");
            input.setAttribute("value", "DBSSINBBIBD");
            input.setAttribute("disabled", "true");
            div.appendChild(label);
            div.appendChild(input);
        }
        else {
            let div = document.getElementById("senderbic");
            div.innerHTML = "";
        }
    }

    function generateTransferFee(e) {
        let amount = Number(e.target.value);
        console.log(typeof (amount));

        document.getElementById("transferFee").value = 0.025 * amount;
    }

    function generateMessageDatalist(messageResponse) {
        let dl = document.getElementById("messageCode");

        for (const i of messageResponse) {
            let option = document.createElement("option");
            option.value = i.messagecode;
            option.innerHTML = i.messagecode;
            dl.appendChild(option);

            messagedata[i.messagecode] = i.instruction;
        }

    }

    function handleSubmit(e) {
        e.preventDefault();

        console.log(e.target.elements.customerId.value)

        let customerid = e.target.elements.customerId.value;
        let accountholdername = e.target.elements.accountHolderName.value;
        let clearbalance = e.target.elements.clearBalance.value;
        let currencycode = e.target.elements.CUR.value;

        let receiverbic = e.target.elements.receiverBIC.value;
        let receiveraccountholdernumber = e.target.elements.accountHolderName.value;
        let receiveraccountholdername = e.target.elements.receiverAccountHolderName.value;
        let accountnumber = e.target.elements.accountNumber.value;

        let transfertypecode = e.target.elements.transferType.value;
        let messagecode = e.target.elements.messageCode.value;
        let currencyamount = e.target.elements.amount.value;
        let transferfees = e.target.elements.transferFee.value;
        let institutionname = e.target.elements.institutionName.value;
        let conversionrate = Number(currencydata[currencycode]["conversionrate"]);

        console.log(customerid)
        console.log(accountholdername)
        console.log(clearbalance)
        console.log(currencycode)
        console.log(receiverbic)
        console.log(receiveraccountholdernumber)
        console.log(receiveraccountholdername)
        console.log(accountnumber)
        console.log(transfertypecode)
        console.log(messagecode)
        console.log(currencyamount)
        console.log(Date(e.target.elements.transferdate.value))

        let transaction = {};
        transaction["customer"] = {
            "customerid": customerid,
            "accountholdername": customersdata[customerid].accountholdername,
            "overdraftflag": customersdata[customerid].overdraftflag,
            "clearbalance": customersdata[customerid].clearbalance,
            "customeraddress": customersdata[customerid].customeraddress,
            "customercity": customersdata[customerid].customercity,
            "customertype": customersdata[customerid].customertype
        };
        transaction["currency"] = {
            "currencycode": currencycode,
            "currencyname": currencydata[currencycode]["currencyname"],
            "conversionrate": Number(currencydata[currencycode]["conversionrate"])
        };


        transaction["transfertypes"] = {
            "transfertypecode": transfertypecode,
            "transfertypedescription": transfertypesdata[transfertypecode]
        };

        if (transfertypecode == "Bank Transfer") {
            transaction["bank1"] = {
                "bic": e.target.elements.senderBIC.value,
                "bankname": bankdata[e.target.elements.senderBIC.value]
            };
        }
        transaction["bank2"] = {
            "bic": receiverbic,
            "bankname": institutionname
        };
        transaction["receiveraccountholdernumber"] = receiveraccountholdernumber;
        transaction["receiveraccountholdername"] = receiveraccountholdername;

        transaction["message"] = {
            "messagecode": messagecode,
            "instruction": messagedata[messagecode]
        };
        transaction["currencyamount"] = Number(currencyamount);
        transaction["transferfees"] = Number(transferfees);
        transaction["inramount"] = Number(currencyamount) * conversionrate + Number(transferfees) * conversionrate;
        transaction["transferdate"] = new Date().toJSON().slice(0, 10);

        console.log(transaction)
        axios.post("http://localhost:8080/submit", transaction)
            .then((response) => {
                console.log("Hiii")
                console.log(response.data);
                history.push({
                    pathname: '/result',
                    state: response.data
                });

            })




    }

    useEffect(() => {

        document.getElementById("transferdate").value = new Date().toLocaleDateString();


        axios
            .get("http://localhost:8080/customer/all")
            .then(response => {
                console.log("Hey");
                customers = response.data;
                generateCustomerDatalist(customers);
            });

        axios.get("http://localhost:8080/bank/all")
            .then(response => {
                console.log(response);

                generateBankDatalist(response.data);
            });

        axios.get("http://localhost:8080/currency/all")
            .then(response => {
                console.log(response);

                generateCurrencyDatalist(response.data);
            });

        axios.get("http://localhost:8080/transfertypes/all")
            .then(response => {
                console.log(response);

                generateTransferTypesDatalist(response.data);
            });

        axios.get("http://localhost:8080/message/all")
            .then(response => {
                console.log(response);
                generateMessageDatalist(response.data);
            });

    }, [])


    return (
        <div className="payment-form">


            <form onSubmit={handleSubmit} id="transaction-form" >
                <div className="child">
                    <div className="card">
                        <div className="card-body">
                            <h3 className="card-title">Sender Details</h3>
                            <hr />

                            <label for="customerId">Customer ID</label>
                            <input type="text" className="form-control" id="customerId" name="customerId" list="customersList" onChange={fetchCustomer} required />
                            <datalist id="customersList" >

                            </datalist>

                            <div id="senderbic">

                            </div>

                            <label for="accountHolderName">Account Holder Name</label>
                            <input type="text" className="form-control" id="accountHolderName" name="accountHolderName" disabled={true} required />

                            <label for="clearBalance">Clear Balance</label>
                            <input type="number" className="form-control" id="clearBalance" name="clearBalance" disabled={true} required />

                            <label for="CUR">Currency</label>
                            <select className="form-control" id="CUR" name="CUR" required>
                            </select>

                        </div>
                    </div>

                    <div className="card">
                        <div className="card-body">
                            <h3 className="card-title">Receiver Details</h3>
                            <hr />

                            <label for="receiverBIC">BIC</label>
                            <input type="text" className="form-control" id="receiverBIC" name="receiverBIC" list="banksList" onChange={fetchBank} required />
                            <datalist id="banksList">

                            </datalist>

                            <label for="institutionName">Institution Name</label>
                            <input type="text" className="form-control" id="institutionName" name="institutionName" disabled={true} required />

                            <label for="receiverAccountHolderName">Account Holder Name</label>
                            <input type="text" className="form-control" id="receiverAccountHolderName" name="receiverAccountHolderName" required />

                            <label for="accountNumber">Account Number</label>
                            <input type="number" className="form-control" id="accountNumber" size="14" name="accountNumber" required />

                        </div>
                    </div>

                    <div className="card">
                        <div className="card-body">
                            <h3 className="card-title">Transaction Details</h3>
                            <hr />

                            <label for="transferType">Transfer Type</label>
                            <select className="form-control" id="transferType" name="transferType" onChange={generateSenderBICInput} required>
                                <option value="none" selected={true}>Select an Option</option>
                            </select>

                            <label for="messageCode">Message Code</label>
                            <select class="form-control" id="messageCode" name="messageCode" required list='messageCodeDatalist'>

                                <option value="none" selected={true}>Select an Option</option>

                            </select>

                            <label for="amount">Amount</label>
                            <input type="number" className="form-control" id="amount" name="amount" onChange={generateTransferFee} required />

                            <label for="transferFee">Transfer Fee</label>
                            <input type="number" className="form-control" id="transferFee" name="transferFee" disabled={true} required />
                        </div>
                    </div>
                </div>

                <div className="child">

                    <label for="transferdate">Transfer Date</label>
                    <input type="text" required className="form-control" name="transferdate" id="transferdate" disabled />

                    <input type="submit" id="submit" className="btn btn-primary" value="Submit" />
                </div>

            </form>
        </div>
    )
}

export default PaymentComponent
