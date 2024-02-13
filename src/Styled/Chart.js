
import { styled } from "@mui/system";
import Plot from "react-plotly.js";

export const BarChart = styled(Plot)(({ theme }) => ({
    height: 500,
    width: 500,
    boxShadow: '1px 1px 5px 1px #ccc',
}));