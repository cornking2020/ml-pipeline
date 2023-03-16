import { Box, Grid, Typography } from "@mui/material";
import React from "react";

interface TopControlPanelProps {
  title: string;
  center: React.ReactNode;
  down: React.ReactNode;
}

export function TopControlPanel(props: TopControlPanelProps) {
  const { title, center, down } = props;
  return (
    <Grid item md={12}>
      <Box
        sx={{
          boxShadow: 1,
          borderRadius: 1,
          p: 2,
          minWidth: 300
        }}
      >
        <Typography
          variant={`h3`}
          id={`title-typography`}
          sx={{ my: 1 }}
        >
          {title}
        </Typography>
        <Box
          component="form"
          sx={{
            "& .MuiAutocomplete-root": {
              display: "inline-flex"
            },
            "& .MuiTextField-root": { m: 1, width: "50ch" }
          }}
          noValidate
          autoComplete="off"
        >
          {center}
        </Box>
        <Box sx={{ my: 1 }}>{down}</Box>
      </Box>
    </Grid>
  );
}