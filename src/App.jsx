import styled from "@emotion/styled";
import React, { useEffect, useState } from "react";
import TextInput from "./Components/TextInput";
import SliderInput from "./Components/SliderInput";
import { Box, FormLabel } from "@mui/material";
import Tenure from "./Components/Tenure";
import { formatNumber } from "./Utils/NumberFormat";

const Form = styled(Box)`
  width: 80%;
  margin: auto;
  padding: 20px 0;
  display: flex;
  flex-direction: column;
  gap: 30px;

  @media (max-width: 890px) {
    width: 100%;
  }
`;

const Label = styled(FormLabel)`
  margin-bottom: 14px;
  font-weight: 400;
  font-size: 20px;
  color: #001c30;
`;

const App = () => {
  const [cost, setCost] = useState(0);
  const [rate, setRate] = useState(10);
  const [fee, setFee] = useState(1);
  const [downPayment, setDownPayment] = useState(0);
  const [emi, setEmi] = useState(0);
  const [tenure, setTenure] = useState(12);

  const calculateEmi = (downPayment) => {
    /* The formula to calculate EMI is P x R x (1+R)^N / [(1+R)^N-1] – where, “P” is the principal loan amount, “N” in tenure in months, and “R” is the prevailing interest rate. */

    if (!cost) return;

    const loanAmount = cost - downPayment;
    const rateOfInterest = rate / 100;
    const n = tenure / 12; // for year

    const __emi =
      (loanAmount * rateOfInterest * 1 + rateOfInterest ** n) /
      (1 + rateOfInterest ** n - 1);

    return (__emi / 12).toFixed(0);
  };

  const calculateDp = (emi) => {
    if (!cost) return;

    const downPaymentPercent = 100 - (emi / calculateEmi(0)) * 100;
    return Number((downPaymentPercent / 100) * cost).toFixed(0);
  };

  const totalDownPayment =
    downPayment + (cost - downPayment) * (fee / 100).toFixed(0);

  const totalEmi = (emi * tenure).toFixed(0); // 0 means no point

  const handleEmi = (e) => {
    /* Update emi for down payment */
    if (!cost) return;

    const dp = Number(e.target.value);
    setDownPayment(dp.toFixed(0));

    /* Calculate Emi */
    const __emi = calculateEmi(dp);
    setEmi(__emi);
  };

  const handleDownPayment = (e) => {
    /* Update downpayment for emi */
    if (!cost) return;

    const emi = Number(e.target.value);
    setEmi(emi.toFixed(0));

    /* Calculate DP */
    const dp = calculateDp(emi);
    setDownPayment(dp);
  };

  useEffect(() => {
    if (cost == 0) {
      setDownPayment(0);
      setEmi(0);
    }

    const __emi = calculateEmi(downPayment);
    setEmi(__emi);
  }, [tenure, cost]);

  return (
    <div className="App">
      <h1 className="title">EMI Calculator</h1>

      <Form>
        <TextInput
          title={"Total Cost of Asset"}
          state={cost}
          setState={setCost}
        />
        <TextInput
          title={"Interest Rate (in %)"}
          state={rate}
          setState={setRate}
        />
        <TextInput
          title={"Processing Fee (in %)"}
          state={fee}
          setState={setFee}
        />

        <SliderInput
          title={"Down Payment"}
          underTitle={`Total Down Payment - Rs. ${formatNumber(
            totalDownPayment
          )}`}
          state={downPayment}
          labelMin={"0%"}
          labelMax={"100%"}
          min={0}
          max={cost}
          onChange={handleEmi}
        />

        <SliderInput
          title={"Loan Per Month"}
          underTitle={`Total Loan Amount - Rs. ${formatNumber(totalEmi)}`}
          state={emi}
          onChange={handleDownPayment}
          min={calculateEmi(cost)}
          max={calculateEmi(0)}
          labelMin={calculateEmi(cost)}
          labelMax={calculateEmi(0)}
          type={"emi"}
        />

        <Tenure tenure={tenure} setTenure={setTenure} />
      </Form>
    </div>
  );
};

export default App;
