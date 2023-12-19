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
import { FormControl, InputLabel, Select, Stack } from "@mui/material";
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
import Autocomplete from "@mui/material/Autocomplete";

// import {MaterialTable} from "material-table";

function Create() {
  const [parcel, setParcel] = useState([]);
  const [age, setAge] = React.useState('');

  const handleChange = (event) => {
    setAge(event.target.value);
  };
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
    axios
      .post("http://localhost:8080/api/v1/packages", data)
      .then(() => {
        openSuccessSB();
      })
      .catch(() => {
        openErrorSB();
      });
  };

  const [selectedRegion, setSelectedRegion] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedPostalBranches, setSelectedPostalBranches] = useState("");

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

  const handleRegionChange = (e) => {
    const selectedRegion = e.target.value;
    setSelectedRegion(selectedRegion);
    setSelectedCity("");
    setSelectedPostalBranches("");
  };

  const handleCityChange = (e) => {
    const selectedCity = e.target.value;
    setSelectedCity(selectedCity);
    setSelectedPostalBranches("");
  };

  const handlePostalBranchChange = (e) => {
    const selectedPostalBranches = e.target.value;
    setSelectedPostalBranches(selectedPostalBranches);
  };

  const top100Films = [
    { label: 'The Shawshank Redemption', year: 1994 },
    { label: 'The Godfather', year: 1972 },
    { label: 'The Godfather: Part II', year: 1974 },
    { label: 'The Dark Knight', year: 2008 },
    { label: '12 Angry Men', year: 1957 },
    { label: "Schindler's List", year: 1993 },
    { label: 'Pulp Fiction', year: 1994 }
      ]

  // Function to calculate distance between two points using Haversine formula
  function calculateDistance(lat1, lon1, lat2, lon2) {
    const earthRadius = 6371; // Earth's radius in kilometers

    // Convert latitude and longitude from degrees to radians
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);

    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * (Math.PI / 180)) *
        Math.cos(lat2 * (Math.PI / 180)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = earthRadius * c; // Distance in kilometers

    return distance;
  }

  // Example usage
  const city1 = {
    city: "Kyiv",
    lat: 50.45,
    lng: 30.5233,
  };

  const city2 = {
    city: "Lviv",
    lat: 49.8397,
    lng: 24.0297,
  };

  const distance = calculateDistance(city1.lat, city1.lng, city2.lat, city2.lng);

  console.log(
    `The distance between ${city1.city} and ${city2.city} is approximately ${distance.toFixed(
      2
    )} kilometers.`
  );

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
                      <img src={image} />
                    </Grid>
                    <Grid item xs={9}>
                      <form onSubmit={handleSubmit(onSubmit)}>
                        <Stack m={2} spacing={3}>
                          <Autocomplete
                              disablePortal
                              id="combo-box-demo"
                              options={top100Films}
                              renderInput={(params) => <TextField {...params} size="small" label="Movieg" />}
                          />
                          <TextField
                              size="small"
                            autoFocus
                            margin="dense"
                            id="title"
                            label="Title"
                            type="text"
                            fullWidth
                            inputProps={register("title")}
                          />
                          <TextField
                              size="small"
                            margin="dense"
                            label="Source"
                            type="text"
                            fullWidth
                            inputProps={register("source")}
                          />
                          <TextField
                              size="small"
                            margin="dense"
                            id="destination"
                            label="Destination"
                            type="text"
                            fullWidth
                            inputProps={register("destination")}
                          />
                          <TextField
                              size="small"
                              value={selectedRegion}
                              onChange={handleRegionChange}
                              select
                              label="Region"
                              fullWidth
                          >
                            <MenuItem value="">Select Region</MenuItem>
                            {regions.map((region, index) => (
                                <MenuItem key={index} value={region.name}>
                                  {region.name}
                                </MenuItem>
                            ))}
                          </TextField>
                          <TextField
                              size="small"
                              value={selectedCity}
                              onChange={handleCityChange}
                              select
                              label="City"
                              fullWidth
                          >
                            <MenuItem value="">Select City</MenuItem>
                            {selectedRegion && regions
                            .find((region) => region.name === selectedRegion)
                            .cities.map((city, index) => (
                                <MenuItem key={index} value={city}>
                                  {city}
                                </MenuItem>
                            ))}
                          </TextField>
                          <TextField
                              size="small"
                              value={selectedPostalBranches}
                              onChange={handlePostalBranchChange}
                              select
                              label="Postal Branch"
                              fullWidth
                          >
                            <MenuItem value="">Select Postal Branches Count</MenuItem>
                            {selectedCity && postalBranchesData[selectedCity].map((branches, index) => (
                                <MenuItem key={index} value={branches}>
                                  {branches}
                                </MenuItem>
                            ))}
                          </TextField>
                        </Stack>
                        <Button type="submit">Submit</Button>
                        <MDButton type="submit" variant="outlined" size="small" color={"info"}>
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
