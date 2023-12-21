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
import axios from "axios";
import Button from "@mui/material/Button";
import { useForm } from "react-hook-form";
import Card from "@mui/material/Card";
import MDTypography from "../../components/MDTypography";
import Grid from "@mui/material/Grid";
import Footer from "../../examples/Footer";
import image from "../../assets/images/create/package_create.png";
import MDSnackbar from "../../components/MDSnackbar";

// import {MaterialTable} from "material-table";

function Create() {
  const [parcel, setParcel] = useState([]);
  const [age, setAge] = React.useState("");

  const handleChange = (event) => {
    setAge(event.target.value);
  };
  const {
    register,
    handleSubmit,
    reset,
    formState,
    formState: { isSubmitSuccessful },
  } = useForm();
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

  const [selectedSourceRegion, setSelectedSourceRegion] = useState("");
  const [selectedSourceCity, setSelectedSourceCity] = useState("");
  const [selectedSourcePostalBranch, setSelectedSourcePostalBranch] = useState("");

  const [selectedDestinationRegion, setSelectedDestinationRegion] = useState("");
  const [selectedDestinationCity, setSelectedDestinationCity] = useState("");
  const [selectedDestinationPostalBranch, setSelectedDestinationPostalBranch] = useState("");

  const regions = [
    { name: "Kyiv", cities: ["Kyiv City"] },
    { name: "Lviv", cities: ["Lviv City", "Stryi"] },
    { name: "Kharkiv", cities: ["Kharkiv City", "Sumy"] },
    // Add more regions with cities
  ];

  const postalBranchesData = {
    "Kyiv City": ["5", "10", "15"],
    "Lviv City": ["3", "7", "9"],
    Stryi: ["2", "4", "6"],
    "Kharkiv City": ["4", "8", "12"],
    Sumy: ["6", "11", "14"],
    // Add postal branch counts for other cities
  };

  const onSubmit = (data, e) => {
    // alert(JSON.stringify(data, null, 4));
    axios
      .post("http://localhost:8080/api/v1/packages", data)
      .then(() => {
        //TODO: CHANGE TO NORMAL RESET
        openSuccessSB();
        e.preventDefault();
        e.target.reset();
        setSelectedSourceRegion("");
        setSelectedSourceCity("");
        setSelectedSourcePostalBranch("");
        setSelectedDestinationRegion("");
        setSelectedDestinationCity("");
        setSelectedDestinationPostalBranch("");
      })
      .catch(() => {
        openErrorSB();
      });
  };

  const handleSourceRegionChange = (e) => {
    const selectedRegion = e.target.value;
    setSelectedSourceRegion(selectedRegion);
    setSelectedSourceCity("");
    setSelectedSourcePostalBranch("");
  };

  const handleSourceCityChange = (e) => {
    const selectedCity = e.target.value;
    setSelectedSourceCity(selectedCity);
    setSelectedSourcePostalBranch("");
  };

  const handleSourcePostalBranchChange = (e) => {
    const selectedPostalBranches = e.target.value;
    setSelectedSourcePostalBranch(selectedPostalBranches);
  };

  const handleDestinationRegionChange = (e) => {
    const selectedRegion = e.target.value;
    setSelectedDestinationRegion(selectedRegion);
    setSelectedDestinationCity("");
    setSelectedDestinationPostalBranch("");
  };

  const handleDestinationCityChange = (e) => {
    const selectedCity = e.target.value;
    setSelectedDestinationCity(selectedCity);
    setSelectedDestinationPostalBranch("");
  };

  const handleDestinationPostalBranchChange = (e) => {
    const selectedPostalBranches = e.target.value;
    setSelectedDestinationPostalBranch(selectedPostalBranches);
  };

  const top100Films = [
    { label: "The Shawshank Redemption", year: 1994 },
    { label: "The Godfather", year: 1972 },
    { label: "The Godfather: Part II", year: 1974 },
    { label: "The Dark Knight", year: 2008 },
    { label: "12 Angry Men", year: 1957 },
    { label: "Schindler's List", year: 1993 },
    { label: "Pulp Fiction", year: 1994 },
  ];

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
                  <Grid container spacing={2} alignItems={"center"}>
                    <Grid item xs={3}>
                      <MDBox px={5}>
                        <img src={image} />
                      </MDBox>
                    </Grid>
                    <Grid item xs={9}>
                      <form onSubmit={handleSubmit(onSubmit)}>
                        <Grid container spacing={2}>
                          <Grid item xs={12}>
                            <TextField
                              size="small"
                              autoFocus
                              id="title"
                              label="Title"
                              type="text"
                              fullWidth
                              inputProps={register("title")}
                              required
                            />
                          </Grid>
                          <Grid item xs={6}>
                            <MDBox pt={3}>
                              <TextField
                                size="small"
                                label="Sender's Surname"
                                type="text"
                                fullWidth
                                required
                                inputProps={register("senderSurname")}
                              />
                            </MDBox>
                          </Grid>
                          <Grid item xs={6}>
                            <MDBox pt={3}>
                              <TextField
                                size="small"
                                label="Sender's Name"
                                type="text"
                                fullWidth
                                required
                                inputProps={register("senderName")}
                              />
                            </MDBox>
                          </Grid>
                          {/*<Grid item xs={6}>*/}
                          {/*  <TextField*/}
                          {/*    size="small"*/}
                          {/*    label="Sender's Phone number"*/}
                          {/*    type="text"*/}
                          {/*    fullWidth*/}
                          {/*    required*/}
                          {/*    inputProps={register("senderPhoneNumber")}*/}
                          {/*  />*/}
                          {/*</Grid>*/}
                          {/*<Grid item xs={6}>*/}
                          {/*  <TextField*/}
                          {/*    size="small"*/}
                          {/*    label="Sender's Email"*/}
                          {/*    type="text"*/}
                          {/*    fullWidth*/}
                          {/*    required*/}
                          {/*    inputProps={register("senderEmail")}*/}
                          {/*  />*/}
                          {/*</Grid>*/}
                          <Grid item xs={6}>
                            <TextField
                              required
                              size="small"
                              value={selectedSourceRegion}
                              onChange={handleSourceRegionChange}
                              select
                              label="Region"
                              fullWidth
                              inputProps={register("sourceRegion")}
                            >
                              <MenuItem value="">Select Region</MenuItem>
                              {regions.map((region, index) => (
                                <MenuItem key={index} value={region.name}>
                                  {region.name}
                                </MenuItem>
                              ))}
                            </TextField>
                          </Grid>
                          <Grid item xs={6}>
                            <TextField
                              required
                              size="small"
                              value={selectedSourceCity}
                              onChange={handleSourceCityChange}
                              select
                              label="City"
                              fullWidth
                              inputProps={register("sourceCity")}
                            >
                              <MenuItem value="">Select City</MenuItem>
                              {selectedSourceRegion &&
                                regions
                                  .find((region) => region.name === selectedSourceRegion)
                                  .cities.map((city, index) => (
                                    <MenuItem key={index} value={city}>
                                      {city}
                                    </MenuItem>
                                  ))}
                            </TextField>
                          </Grid>
                          <Grid item xs={12}>
                            <TextField
                              required
                              size="small"
                              value={selectedSourcePostalBranch}
                              onChange={handleSourcePostalBranchChange}
                              select
                              label="Postal Branch"
                              fullWidth
                              inputProps={register("sourcePostalBranch")}
                            >
                              <MenuItem value="">Select Postal Branch</MenuItem>
                              {selectedSourceCity &&
                                postalBranchesData[selectedSourceCity].map((branches, index) => (
                                  <MenuItem key={index} value={branches}>
                                    {branches}
                                  </MenuItem>
                                ))}
                            </TextField>
                          </Grid>
                          <Grid item xs={6}>
                            <MDBox pt={3}>
                              <TextField
                                size="small"
                                label="Recipient's Surname"
                                type="text"
                                fullWidth
                                required
                                inputProps={register("recipientSurname")}
                              />
                            </MDBox>
                          </Grid>
                          <Grid item xs={6}>
                            <MDBox pt={3}>
                              <TextField
                                size="small"
                                id="destination"
                                label="Recipient's Name"
                                type="text"
                                fullWidth
                                required
                                inputProps={register("recipientName")}
                              />
                            </MDBox>
                          </Grid>
                          {/*<Grid item xs={6}>*/}
                          {/*  <TextField*/}
                          {/*    size="small"*/}
                          {/*    label="Recipient's Phone number"*/}
                          {/*    type="text"*/}
                          {/*    fullWidth*/}
                          {/*    required*/}
                          {/*    inputProps={register("recipientPhoneNumber")}*/}
                          {/*  />*/}
                          {/*</Grid>*/}
                          {/*<Grid item xs={6}>*/}
                          {/*  <TextField*/}
                          {/*    size="small"*/}
                          {/*    label="Recipient's Email"*/}
                          {/*    type="text"*/}
                          {/*    fullWidth*/}
                          {/*    required*/}
                          {/*    inputProps={register("recipientEmail")}*/}
                          {/*  />*/}
                          {/*</Grid>*/}
                          <Grid item xs={6}>
                            <TextField
                              required
                              size="small"
                              value={selectedDestinationRegion}
                              onChange={handleDestinationRegionChange}
                              select
                              label="Region"
                              fullWidth
                              inputProps={register("destinationRegion")}
                            >
                              <MenuItem value="">Select Region</MenuItem>
                              {regions.map((region, index) => (
                                <MenuItem key={index} value={region.name}>
                                  {region.name}
                                </MenuItem>
                              ))}
                            </TextField>
                          </Grid>
                          <Grid item xs={6}>
                            <TextField
                              required
                              size="small"
                              value={selectedDestinationCity}
                              onChange={handleDestinationCityChange}
                              select
                              label="City"
                              fullWidth
                              inputProps={register("destinationCity")}
                            >
                              <MenuItem value="">Select City</MenuItem>
                              {selectedDestinationRegion &&
                                regions
                                  .find((region) => region.name === selectedDestinationRegion)
                                  .cities.map((city, index) => (
                                    <MenuItem key={index} value={city}>
                                      {city}
                                    </MenuItem>
                                  ))}
                            </TextField>
                          </Grid>
                          <Grid item xs={12}>
                            <TextField
                              required
                              size="small"
                              value={selectedDestinationPostalBranch}
                              onChange={handleDestinationPostalBranchChange}
                              select
                              label="Postal Branch"
                              fullWidth
                              inputProps={register("destinationPostalBranch")}
                            >
                              <MenuItem value="">Select Postal Branch</MenuItem>
                              {selectedDestinationCity &&
                                postalBranchesData[selectedDestinationCity].map(
                                  (branches, index) => (
                                    <MenuItem key={index} value={branches}>
                                      {branches}
                                    </MenuItem>
                                  )
                                )}
                            </TextField>
                          </Grid>
                          {/*<Grid item xs={12}>*/}
                          {/*  <Autocomplete*/}
                          {/*    disablePortal*/}
                          {/*    id="combo-box-demo"*/}
                          {/*    options={top100Films}*/}
                          {/*    renderInput={(params) => (*/}
                          {/*      <TextField {...params} size="small" label="Movie" fullWidth />*/}
                          {/*    )}*/}
                          {/*  />*/}
                          {/*</Grid>*/}
                          <MDBox pt={3}>
                            <Button type="submit">Submit</Button>
                          </MDBox>
                        </Grid>
                        {/*<FormControlLabel*/}
                        {/*  control={<Checkbox />}*/}
                        {/*  label="I want to recieve notifications about this package"*/}
                        {/*  {...register("isDeveloper")}*/}
                        {/*/>*/}
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
