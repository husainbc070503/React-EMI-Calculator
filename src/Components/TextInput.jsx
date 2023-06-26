import React from "react";
import styled from "@emotion/styled";
import { FormControl, FormLabel, TextField } from "@mui/material";

const Label = styled(FormLabel)`
  margin-bottom: 14px;
  font-weight: 400;
  font-size: 20px;
  color: #001c30;
`;

const TextInput = ({ title, state, setState }) => {
  return (
    <FormControl fullWidth>
      <Label>{title}</Label>
      <TextField
        type="number"
        placeholder={title}
        value={state}
        onChange={(e) => setState(e.target.value)}
      />
    </FormControl>
  );
};

export default TextInput;
