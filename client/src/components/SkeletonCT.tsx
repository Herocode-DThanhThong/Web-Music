import * as React from "react";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";
interface Props {
  width: number | string;
  height: number | string;
}
export default function SkeletonCT({ width, height }: Props) {
  return (
    <Stack spacing={1}>
      <Skeleton
        style={{ backgroundColor: "rgba(0, 0, 0, 0.25)" }}
        animation="wave"
        variant="rectangular"
        width={width}
        height={height}
      />
    </Stack>
  );
}
