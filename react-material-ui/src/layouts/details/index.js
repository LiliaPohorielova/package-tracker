import * as React from "react";
import TextField from "@mui/material/TextField";
import {Link, useNavigate, useParams} from "react-router-dom";
// @mui material components

// Material Dashboard 2 React components
import MDBox from "components/MDBox";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";

// Data
import MenuItem from "@mui/material/MenuItem";
import { Stack } from "@mui/material";
import {useEffect, useState} from "react";
import axios from "axios";
import projectsTableData from "../tables/data/projectsTableData";
import Button from "@mui/material/Button";
import MDButton from "../../components/MDButton";

// import {MaterialTable} from "material-table";

function Details() {
  const {id} = useParams();
  const [parcel, setParcel] = useState([]);

  useEffect(() => {
    async function fetchData() {
      // You can await here
      try {
        const response = await axios.get(
            "http://localhost:8080/api/v1/packages/" + id);
        setParcel(response.data);
      } catch (e) {
        console.log(e);
      }
    }

    // fetchData().then(()=>{
    //   setTableData(tableData);
    // });
    fetchData();

    // fetch()
  }, []); // Or [] if effect doesn't need props or state
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox pt={3} mx={2} py={3}>
        <Stack m={2} spacing={3}>
          <TextField
            autoFocus
            margin="dense"
            id="title"
            label="Title"
            type="text"
            fullWidth
            variant="standard"
            value={parcel.title}
          />
          <TextField
              margin="dense"
              label="Source"
              type="text"
              fullWidth
              variant="standard"
              value={parcel.source}
          />
          <TextField
            margin="dense"
            id="destination"
            label="Destination"
            type="text"
            fullWidth
            variant="standard"
            value={parcel.destination}
          />
          <TextField select fullWidth variant="standard" label="Gender">
            <MenuItem value="male">Male</MenuItem>
            <MenuItem value="female">Female</MenuItem>
            <MenuItem value="furry">Furry</MenuItem>
          </TextField>

          {/*<FormControlLabel*/}
          {/*  control={<Checkbox />}*/}
          {/*  label="Is developer?"*/}
          {/*  {...register("isDeveloper")}*/}
          {/*/>*/}
        </Stack>
        <MDButton
            component={Link}
            to={`/tables`}
            variant="outlined"
            size="small"
            color={'info'}
        >
          Back
        </MDButton>
      </MDBox>
    </DashboardLayout>
  );
}

export default Details;
