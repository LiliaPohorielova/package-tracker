import * as React from "react";
import { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import { Link, useParams } from "react-router-dom";
// @mui material components
// Material Dashboard 2 React components
import MDBox from "components/MDBox";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";

// Data
import axios from "axios";
import MDButton from "../../components/MDButton";
import MDTypography from "../../components/MDTypography";
import Footer from "../../examples/Footer";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import image from "../../assets/images/create/package_create.png";

// import {MaterialTable} from "material-table";

function Details() {
  const { id } = useParams();
  const [parcel, setParcel] = useState([]);

  useEffect(() => {
    async function fetchData() {
      // You can await here
      try {
        const response = await axios.get("http://localhost:8080/api/v1/packages/" + id);
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
                  Information
                </MDTypography>
              </MDBox>
              <MDBox pt={3}>
                <MDBox pt={3} mx={2} py={3}>
                  <Grid container spacing={2} alignItems={"center"}>
                    <Grid item xs={3}>
                      <img src={image} />
                    </Grid>
                    <Grid item xs={9}>
                      <Grid container spacing={2}>
                        <Grid item xs={12}>
                          <TextField
                            variant="standard"
                            disabled
                            autoFocus
                            id="title"
                            label="Title"
                            type="text"
                            fullWidth
                            value={parcel.title || "_"}
                          />
                        </Grid>
                        <Grid item xs={6}>
                          <TextField
                            variant="standard"
                            disabled
                            size="small"
                            label="Sender's Surname"
                            type="text"
                            fullWidth
                            required
                            value={parcel.senderSurname || "_"}
                          />
                        </Grid>
                        <Grid item xs={6}>
                          <TextField
                            variant="standard"
                            disabled
                            size="small"
                            id="destination"
                            label="Sender's Name"
                            type="text"
                            fullWidth
                            required
                            value={parcel.senderName || "_"}
                          />
                        </Grid>
                        <Grid item xs={6}>
                          <TextField
                            variant="standard"
                            disabled
                            required
                            size="small"
                            value={parcel.sourceRegion || "_"}
                            label="Region"
                            fullWidth
                          ></TextField>
                        </Grid>
                        <Grid item xs={6}>
                          <TextField
                            variant="standard"
                            disabled
                            required
                            size="small"
                            value={parcel.sourceCity || "_"}
                            label="City"
                            fullWidth
                          ></TextField>
                        </Grid>
                        <Grid item xs={12}>
                          <TextField
                            variant="standard"
                            disabled
                            required
                            size="small"
                            value={parcel.sourcePostalBranch || "_"}
                            label="Postal Branch"
                            fullWidth
                          ></TextField>
                        </Grid>
                        <Grid item xs={6}>
                          <TextField
                            variant="standard"
                            disabled
                            size="small"
                            label="Recipient's Surname"
                            type="text"
                            value={parcel.recipientSurname || "_"}
                            fullWidth
                            required
                          />
                        </Grid>
                        <Grid item xs={6}>
                          <TextField
                            variant="standard"
                            disabled
                            size="small"
                            id="destination"
                            label="Recipient's Name"
                            value={parcel.recipientName || "_"}
                            type="text"
                            fullWidth
                            required
                          />
                        </Grid>
                        <Grid item xs={6}>
                          <TextField
                            variant="standard"
                            disabled
                            required
                            size="small"
                            value={parcel.destinationRegion || "_"}
                            label="Region"
                            fullWidth
                          ></TextField>
                        </Grid>
                        <Grid item xs={6}>
                          <TextField
                            variant="standard"
                            disabled
                            required
                            size="small"
                            value={parcel.destinationCity || "_"}
                            label="City"
                            fullWidth
                          ></TextField>
                        </Grid>
                        <Grid item xs={12}>
                          <TextField
                            variant="standard"
                            disabled
                            required
                            size="small"
                            value={parcel.destinationPostalBranch || "_"}
                            label="Postal Branch"
                            fullWidth
                          ></TextField>
                        </Grid>
                        <Grid item xs={12}>
                        <MDButton
                          component={Link}
                          to={`/tables`}
                          variant="outlined"
                          size="small"
                          color={"info"}
                        >
                          Back
                        </MDButton>
                        </Grid>
                      </Grid>
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

export default Details;
