import styled from "@emotion/styled";
import { Box, Button, FormControl, FormLabel } from "@mui/material";
import React from "react";

const Label = styled(FormLabel)`
  margin-bottom: 14px;
  font-weight: 400;
  font-size: 20px;
  color: #001c30;
`;

const Tenure = ({ tenure, setTenure }) => {
  const tenureData = [12, 24, 36, 48, 60];

  return (
    <Box>
      <FormControl fullWidth>
        <Label>Tenure</Label>
        <div className="tenure__buttons">
          {tenureData.map((t) => {
            return (
              <Button
                key={t}
                className={`Button btn ${t === tenure && "active"} `}
                variant="contained"
                onClick={() => setTenure(t)}
              >
                {t}
              </Button>
            );
          })}
        </div>
      </FormControl>
    </Box>
  );
};

export default Tenure;
