import { useLocation } from "react-router-dom";
import { React, useState, useEffect } from 'react'
import jsPDF from 'jspdf';

function ResultComponent() {
  let [cardtitle, setcardtitle] = useState("");
  let [cardtext, setcardtext] = useState("");
  let [cardimage, setcardimage] = useState("");

  let location = useLocation();

  function generatePDF() {
    const doc = new jsPDF();
    
    doc.addImage(document.getElementById("card-img"), 70, 10, 70, 70);

 

    if (location.state["transactionIsValid"] === false) {
      let reason;
      if (location.state["presentInSDNList"]) {
        reason = "Receiver name in SDN List";
        doc.text("Reason: " + reason, 20, 110);
      }
      else if (location.state["transferIsValid"] === false) {
        reason = "Wrong transfer type";
        doc.text("Reason: " + reason, 20, 110);
      }
      else {
        reason = "Insufficient balance";
        doc.text("Reason: " + reason, 20, 110);
      }
    }

    let balance = location.state["Updated balance"].toString()
    doc.text("Updated Balance: " + balance + " INR", 20, 100);
    doc.text("Sender name: " + location.state["Sender name"], 20, 120);
    doc.text("Receiver name: " + location.state["Receiver name"], 20, 130);
    doc.text("Receiver A/C Number: " + location.state["Receiver AC"].toString(), 20, 140);
    doc.text("Receiver BIC: " + location.state["Receiver BIC"], 20, 150);
    doc.text("Receiver bank name: " + location.state["Receiver bank name"], 20, 160);

    doc.text("Message: " + location.state["Message"], 20, 170);


    doc.save("Receipt.pdf")
  }


  useEffect(() => {
    function generateCard() {
      if (location.state["transactionIsValid"]) {
        setcardtitle(<h5 className="card-title">Status – Approved</h5>);
        setcardimage(<img className="card-img" id="card-img" src={require("./approved.jpg")} alt="Approved Image" />);
        setcardtext(
          <div className="card-text">
            <b>Updated Balance –</b> ₹{location.state["Updated balance"]}
            <br />
            <b>Message –</b> {location.state["Message"]}
          </div>
        )
      }

      else {
        setcardtitle(<h5 class="card-title">Status – Rejected</h5>)
        setcardimage(<img className="card-img" id="card-img" src={require("./rejected.jpg")} alt="Rejected Image" />)
        if (location.state["presentInSDNList"]) {
          setcardtext(
            <div className="card-text">
              <b>Reason –</b> Sanction Screening
              <br />
              <b>Updated Balance –</b> ₹{location.state["Updated balance"]}
            </div>
          )
        }
        else if (location.state["transferIsValid"] === false) {
          setcardtext(<div className="card-text">
            <b>Reason –</b> Wrong Transfer Type
            <br />
            <b>Updated Balance –</b> ₹{location.state["Updated balance"]}
          </div>
          )
        }
        else {
          setcardtext(
            <div className="card-text">
              <b>Reason –</b> Insufficient Balance
              <br />
              <b>Updated Balance –</b> ₹{location.state["Updated balance"]}
            </div>
          )
        }
      }
    }

    generateCard();

  }, [])


  return (
    <div className="result-card" id="result-card">
      <div className="card" style={{ "width": "25rem" }}>
        {cardimage}

        <div className="card-body">
          {cardtitle}
          {cardtext}
          <br />
          <a href="/" class="btn btn-primary">Home</a>&nbsp;&nbsp;&nbsp;
          <button onClick={generatePDF} class="btn btn-success">Download Receipt</button>
        </div>
      </div>
    </div>
  )
}

export default ResultComponent