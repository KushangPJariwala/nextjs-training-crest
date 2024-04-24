import * as React from "react";
import {Stack,Box} from "@mui/material";
import styles from "./spinner.module.css"; 
import CircularProgress from "@mui/material/CircularProgress";

function GradientCircularProgress() {
  return (
    <React.Fragment >
      <svg width={0} height={0} >
        <defs>
          <linearGradient id="my_gradient" x1="0%" y1="50%" x2="0%" y2="100%">
            <stop offset="5%" stopColor="#e01cd5" />
            <stop offset="100%" stopColor="#1CB5E0" />
          </linearGradient>
        </defs>
      </svg>
      <CircularProgress
        sx={{ "svg circle": { stroke: "url(#my_gradient)" } }}
      />
    </React.Fragment>
  );
}

export default function Loader() {
  return (
    // <Box> 
    //   <Stack   ml='50%'>
    //     <GradientCircularProgress />
    //   </Stack>
    // </Box>
    <div className={styles["spinner-overlay"]}>
      <div className={styles.spinner}>
        {/* <GradientCircularProgress /> */}
      </div>
    </div>
  );
}
