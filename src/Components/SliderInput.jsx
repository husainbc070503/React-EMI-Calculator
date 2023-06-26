import React from "react";
import styled from "@emotion/styled";
import { FormControl, FormLabel, Typography } from "@mui/material";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import { formatNumber } from "../Utils/NumberFormat";

const Label = styled(FormLabel)`
  margin-bottom: 14px;
  font-weight: 400;
  font-size: 20px;
  color: #001c30;
`;

const Text = styled(Typography)`
  font-size: 18px;
  color: #aaa;
  line-height: 2.4rem;
`;

const SliderInput = ({
  title,
  state,
  onChange,
  underTitle,
  min,
  max,
  labelMin,
  labelMax,
  type,
}) => {
  return (
    <FormControl fullWidth>
      <Label>{title}</Label>
      <Text>{underTitle}</Text>
      <input
        type="range"
        name="range"
        className="input-range"
        min={min}
        max={max}
        value={state}
        onChange={onChange}
      />
      <div className="labels">
        <div>
          {type == "emi" ? (
            <>
              <CurrencyRupeeIcon sx={{ fontSize: "16px" }} />
              <span>{labelMin > 0 ? formatNumber(labelMin) : 0}</span>
            </>
          ) : (
            <span>{labelMin}</span>
          )}
        </div>

        <span className="cost">
          <CurrencyRupeeIcon sx={{ fontSize: "16px" }} />
          {state > 0 ? formatNumber(state) : 0}
        </span>

        <div>
          {type == "emi" ? (
            <>
              <CurrencyRupeeIcon sx={{ fontSize: "16px" }} />
              <span>{labelMax > 0 ? formatNumber(labelMax) : 0}</span>
            </>
          ) : (
            <span>{labelMax}</span>
          )}
        </div>
      </div>
    </FormControl>
  );
};

export default SliderInput;
