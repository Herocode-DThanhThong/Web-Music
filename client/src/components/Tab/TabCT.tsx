import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { DataCategoryMV } from "../../utils/dataCategoryMV";
interface Props {
  categories: DataCategoryMV[];
  idTypeMV: string;
  setIDTypeMV: React.Dispatch<React.SetStateAction<string>>;
}
export default function TabCT({ categories, idTypeMV, setIDTypeMV }: Props) {
  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setIDTypeMV(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Tabs
        style={{
          color: "#fff",
        }}
        value={idTypeMV}
        onChange={handleChange}
        textColor="inherit"
        indicatorColor="primary"
        aria-label="secondary tabs example"
      >
        {categories.map((ct: DataCategoryMV, i: number) => (
          <Tab value={ct.id} label={ct.title} key={ct.id} />
        ))}
      </Tabs>
    </Box>
  );
}
