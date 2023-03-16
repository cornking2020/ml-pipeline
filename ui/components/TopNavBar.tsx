import * as React from "react";
import MuiAppBar from "@mui/material/AppBar";
import { styled } from "@mui/material/styles";
import MuiToolbar from "@mui/material/Toolbar";
import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import { useAppDispatch } from "../store/hooks";
import { Button } from "@mui/material";
import { useRouter } from "next/router";
import { MessageDisplay, PageRoute } from "../store/Enums";

const Toolbar = styled(MuiToolbar)(({ theme }) => ({
  height: 64,
  [theme.breakpoints.up("sm")]: {
    height: 70
  }
}));

const rightLink = {
  fontSize: 16,
  color: "common.white",
  ml: 3
};

function TopNavBar() {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const handleRemoveToken = React.useCallback(() => {
    // dispatch(setToken(null));
    router.push(PageRoute.LOGIN).then();
  }, []);

  return (
    <>
      <MuiAppBar elevation={0} position="fixed">
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <Link
            variant="h6"
            underline="none"
            color="inherit"
            sx={{ fontSize: 24 }}
            onClick={() => router.push("/")}
          >
            {MessageDisplay.APP_NAME}
          </Link>
          <Box
            sx={{
              flex: 1,
              display: "flex",
              justifyContent: "flex-end"
            }}
          >
            <Button
              variant={`contained`}
              color={`secondary`}
              onClick={() => router.push("/")}
              sx={rightLink}
            >
              {"Home"}
            </Button>

            <Button
              variant={`contained`}
              color={`secondary`}
              onClick={handleRemoveToken}
              sx={rightLink}
            >
              {"Logout"}
            </Button>
          </Box>
        </Toolbar>
      </MuiAppBar>
    </>
  );
}

export default TopNavBar;