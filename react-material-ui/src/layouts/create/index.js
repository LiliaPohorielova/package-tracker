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
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import {useForm} from "react-hook-form";
import Card from "@mui/material/Card";
import MDTypography from "../../components/MDTypography";
import DataTable from "../../examples/Tables/DataTable";
import Grid from "@mui/material/Grid";
import Footer from "../../examples/Footer";

// import {MaterialTable} from "material-table";

function Create() {
  const [parcel, setParcel] = useState([]);
  const { register, handleSubmit } = useForm();
  const onSubmit = (data) => {
    // alert(JSON.stringify(data, null, 4));
    axios.post('http://localhost:8080/api/v1/packages', data);
    //TODO: ADD NOTIFICATION POP UP
    // .then((response) => {
    //   setOpen(false); //for closing dialog
    // });
  };
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox pt={6} pb={3}>
        <Grid container spacing={6}>
      <Grid item xs={12}>
        <Card>
          <MDBox
              mx={2}
              mt={-3}
              py={3}
              px={2}
              variant="gradient"
              bgColor="info"
              borderRadius="lg"
              coloredShadow="info"
          >
            <MDTypography variant="h6" color="white">
              Add Package
            </MDTypography>
          </MDBox>
          <MDBox pt={3}>
            <MDBox pt={3} mx={2} py={3}>
              <form onSubmit={handleSubmit(onSubmit)}>
                <Stack m={2} spacing={3}>
                  <TextField
                      autoFocus
                      margin="dense"
                      id="title"
                      label="Title"
                      type="text"
                      fullWidth
                      variant="standard"
                      inputProps={register("title")}
                  />
                  <TextField
                      margin="dense"
                      label="Source"
                      type="text"
                      fullWidth
                      variant="standard"
                      inputProps={register("source")}
                  />
                  <TextField
                      margin="dense"
                      id="destination"
                      label="Destination"
                      type="text"
                      fullWidth
                      variant="standard"
                      inputProps={register("destination")}
                  />
                  <TextField
                      select
                      fullWidth
                      variant="standard"
                      label="Gender"
                      inputProps={register("gender")}
                  >
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
                {/*<Button onClick={handleClose}>Cancel</Button>*/}
                <Button type="submit">Submit</Button>
              </form>
            </MDBox>
          </MDBox>
        </Card>
      </Grid>

        </Grid>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Create;
