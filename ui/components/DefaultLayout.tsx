import React from "react";
import TopNavBar from "./TopNavBar";
import { Box } from "@mui/system";
import { Toolbar } from "@mui/material";
import PageHeader from "./PageHeader";

interface LayoutProps {
  title: string;
  children: React.ReactNode;
}

export function DefaultLayout(props: LayoutProps) {
  const { title, children } = props;

  // const { token } = useAppSelector((state: RootState) => state.authSlice);

  const notLoginContent = () => {
    // if (token) {
    return <>{children}</>;
    //   }
    //   return (
    //     <>
    //       <TopControlPanel
    //         title={`Not Login`}
    //         center={<Typography>Back to Discord to Login</Typography>}
    //         down={<></>}
    //       />
    //     </>
    //   );
  };

  return (
    <>
      <PageHeader title={title} />
      <Box
        sx={{
          display: "flex",
          height: "100vh"
        }}
      >
        <TopNavBar />
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <Toolbar />
          {notLoginContent()}
        </Box>
      </Box>
    </>
  );
}