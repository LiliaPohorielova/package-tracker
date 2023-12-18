import * as React from "react";
import { useState } from "react";
import TextField from "@mui/material/TextField";
// @mui material components
// Material Dashboard 2 React components
import MDBox from "components/MDBox";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";

// Data
import MenuItem from "@mui/material/MenuItem";
import { Stack } from "@mui/material";
import axios from "axios";
import Button from "@mui/material/Button";
import { useForm } from "react-hook-form";
import Card from "@mui/material/Card";
import MDTypography from "../../components/MDTypography";
import Grid from "@mui/material/Grid";
import Footer from "../../examples/Footer";
import image from "../../assets/images/create/package_create.png";
import MDSnackbar from "../../components/MDSnackbar";
import MDButton from "../../components/MDButton";
import {Link} from "react-router-dom";

// import {MaterialTable} from "material-table";

function Create() {
  const [parcel, setParcel] = useState([]);
  const { register, handleSubmit } = useForm();
  const [successSB, setSuccessSB] = useState(false);
  const [errorSB, setErrorSB] = useState(false);
  const openErrorSB = () => setErrorSB(true);
  const closeErrorSB = () => setErrorSB(false);
  const openSuccessSB = () => setSuccessSB(true);
  const closeSuccessSB = () => setSuccessSB(false);
  const renderSuccessSB = (
      <MDSnackbar
          color="success"
          icon="check"
          title="Package Tracker"
          content="New package was created successfully!"
          dateTime="just now"
          open={successSB}
          onClose={closeSuccessSB}
          close={closeSuccessSB}
          bgWhite
      />
  );
  const renderErrorSB = (
      <MDSnackbar
          color="error"
          icon="warning"
          title="Error"
          content="Oops... Something went wrong :("
          dateTime="just now"
          open={errorSB}
          onClose={closeErrorSB}
          close={closeErrorSB}
          bgWhite
      />
  );
  const onSubmit = (data) => {
    // alert(JSON.stringify(data, null, 4));
    axios.post("http://localhost:8080/api/v1/packages", data)
    .then(() => {
      openSuccessSB();
    })
    .catch(() => {
      openErrorSB();
    });
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
                  <Grid container spacing={2} alignItems={'center'}>
                    <Grid item xs={3}>
                      <img src={image} />
                    </Grid>
                    <Grid item xs={9}>
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
                        <Button type="submit">Submit</Button>
                        <MDButton
                            type="submit"
                            variant="outlined"
                            size="small"
                            color={'info'}
                        >
                          Submit
                        </MDButton>
                      </form>
                      {renderSuccessSB}
                      {renderErrorSB}
                    </Grid>
                  </Grid>
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
