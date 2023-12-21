import * as React from "react";
import { useEffect, useMemo, useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useForm } from "react-hook-form";
// @mui material components
import { Link, useNavigate } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import MDTypography from "components/MDTypography";
import MDBadge from "../../components/MDBadge";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import DataTable from "examples/Tables/DataTable";

// Data
import authorsTableData from "layouts/tables/data/authorsTableData";
import projectsTableData from "layouts/tables/data/projectsTableData";
import axios from "axios";
import { useMaterialUIController } from "../../context";
import Icon from "@mui/material/Icon";
import RefreshIcon from "@mui/icons-material/Refresh";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MDAvatar from "../../components/MDAvatar";
import MDProgress from "../../components/MDProgress";
import { Stack } from "@mui/material";
// import {MaterialTable} from "material-table";
import { DataGrid } from "@mui/x-data-grid";
import image from "../../assets/images/list/package_icon.png";
import MDSnackbar from "../../components/MDSnackbar";

function Tables() {
  const navigate = useNavigate();
  const columnsData = [
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "firstName",
      headerName: "First name",
      width: 150,
      editable: true,
    },
    {
      field: "lastName",
      headerName: "Last name",
      width: 150,
      editable: true,
      headerAlign: "right",
      align: "right",
    },
    {
      field: "age",
      headerName: "Age",
      type: "number",
      width: 110,
      editable: true,
    },
    {
      field: "fullName",
      headerName: "Full name",
      description: "This column has a value getter and is not sortable.",
      sortable: false,
      width: 160,
      valueGetter: (params) => `${params.row.firstName || ""} ${params.row.lastName || ""}`,
    },
  ];

  const rowsData = [
    { id: 1, lastName: "Snow", firstName: "Jon", age: 14 },
    { id: 2, lastName: "Lannister", firstName: "Cersei", age: 31 },
    { id: 3, lastName: "Lannister", firstName: "Jaime", age: 31 },
    { id: 4, lastName: "Stark", firstName: "Arya", age: 11 },
    { id: 5, lastName: "Targaryen", firstName: "Daenerys", age: null },
    { id: 6, lastName: "Melisandre", firstName: null, age: 150 },
    { id: 7, lastName: "Clifford", firstName: "Ferrara", age: 44 },
    { id: 8, lastName: "Frances", firstName: "Rossini", age: 36 },
    { id: 9, lastName: "Roxie", firstName: "Harvey", age: 65 },
  ];
  const [controller] = useMaterialUIController();
  const { darkMode } = controller;
  const { columns, rows } = authorsTableData();
  const [open, setOpen] = React.useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = React.useState(false);
  const [deleteModalId, setDeleteModalId] = useState(0);
  const [parcels, setParcels] = useState([]);
  // const { columns: pColumns, rows: pRows } = projectsTableData(parcels);
  const [pColumns, setPColumns] = useState([]);
  const [pRows, setPRows] = useState([]);

  const [tableData, setTableData] = useState({ columns: [], rows: [] });
  const [error, setError] = useState(null);
  const [menu, setMenu] = useState(null);
  const openMenu = ({ currentTarget }) => setMenu(currentTarget);
  const closeMenu = () => setMenu(null);

  const Project = ({ image, name }) => (
    <MDBox display="flex" alignItems="center" lineHeight={1}>
      <MDAvatar src={image} name={name} size="sm" variant="rounded" />
      <MDTypography display="block" variant="button" fontWeight="medium" ml={1} lineHeight={1}>
        {name}
      </MDTypography>
    </MDBox>
  );

  const Progress = ({ color, value }) => (
    <MDBox display="flex" alignItems="center">
      <MDTypography variant="caption" color="text" fontWeight="medium">
        {value}%
      </MDTypography>
      <MDBox ml={0.5} width="9rem">
        <MDProgress variant="gradient" color={color} value={value} />
      </MDBox>
    </MDBox>
  );

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get("http://localhost:8080/api/v1/packages");
        setParcels(response.data);
        const tableData = projectsTableData(response.data, darkMode, menu, openMenu, closeMenu);
        setTableData(tableData);
      } catch (e) {
        openErrorSB();
      }
    }
    fetchData();
  }, []);

  const handleRefreshButton = () => {
    async function fetchData() {
      try {
        const response = await axios.get("http://localhost:8080/api/v1/packages");
        setParcels(response.data);
        const tableData = projectsTableData(response.data, darkMode, menu, openMenu, closeMenu);
        setTableData(tableData);
      } catch (e) {
        openErrorSB();
      }
    }
    fetchData();
  };

  const [anchorEl, setAnchorEl] = React.useState(null);
  const openMenuTest = Boolean(anchorEl);
  const handleClickMenuTest = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseMenuTest = () => {
    setAnchorEl(null);
  };

  const columnsTest2 = useMemo(
    () => [
      {
        accessorKey: "id", //access nested data with dot notation
        header: "ID",
        size: 150,
      },
      {
        accessorKey: "title",
        header: "Title",
        size: 150,
      },
    ],
    []
  );
  const columnsTest = [
    {
      field: "id",
      headerName: "ID",
      width: 20,
    },
    {
      field: "image",
      headerName: "Image",
      width: 90,
      renderCell: () => {
        return <img src={image} />;
      },
    },
    {
      field: "title",
      headerName: "Title",
      width: 200,
    },
    {
      field: "sourceCity",
      headerName: "Source",
      width: 200,
    },
    {
      field: "destinationCity",
      headerName: "Destination",
      width: 200,
    },
    {
      field: "status",
      headerName: "Status",
      width: 200,
      renderCell: (params) => {
        const currentRow = params.row.status === "IN_TRANSIT" ? "IN TRANSIT" : params.row.status;
        let color = "light";
        switch (currentRow) {
          case "CREATED":
            color = "light";
            break;
          case "IN TRANSIT":
            color = "info";
            break;
          case "DELIVERED":
            color = "success";
            break;
          case "CANCELED":
            color = "error";
            break;
        }
        return (
          <MDBox ml={-1}>
            <MDBadge badgeContent={currentRow} color={color} variant="gradient" size="sm" />
          </MDBox>
        );
      },
    },
    {
      field: "progress",
      headerName: "Progress",
      width: 200,
      renderCell: (params) => {
        const currentRow = params.row.progress;
        return <Progress color={currentRow === 100 ? "success" : "info"} value={currentRow} />;
      },
    },
    {
      field: "action",
      headerName: "Action",
      width: 180,
      sortable: false,
      disableClickEventBubbling: true,
      headerAlign: "center",
      align: "center",

      renderCell: (params) => {
        const onClick = (e) => {
          const currentRow = params.row;
          return alert(JSON.stringify(currentRow, null, 4));
        };

        return (
          <Stack direction="row" spacing={2}>
            {/*<Link to={`${params.row.id}`}*/}
            {/*      className="btn btn-outline-primary">Read</Link>*/}
            <MDButton
              component={Link}
              to={`/package/${params.row.id}/details`}
              variant="outlined"
              size="small"
              color={"info"}
            >
              View
            </MDButton>
            <MDButton
              onClick={() => handleOpenDeleteDialog(params.row.id)}
              variant="outlined"
              size="small"
              color={"error"}
            >
              Cancel
            </MDButton>
            {/*<Button variant="outlined" color="error" size="small" onClick={onClick}>*/}
            {/*  Delete*/}
            {/*</Button>*/}
          </Stack>
        );
      },
    },
  ];
  // const columnsTest = [
  //   { Header: "parcel", accessor: "project", width: "30%", align: "left" },
  //   { Header: "budget", accessor: "budget", align: "left" },
  //   { Header: "status", accessor: "status", align: "center" },
  //   { Header: "completion", accessor: "completion", align: "center" },
  //   { Header: "action", accessor: "action", align: "center" },
  // ];
  const handleClose = () => {
    setOpen(false);
  };
  const handleOpenDeleteDialog = (id) => {
    setDeleteModalId(id);
    setOpenDeleteDialog(true);
  };
  const [successSB, setSuccessSB] = useState(false);
  const [errorSB, setErrorSB] = useState(false);
  const openErrorSB = () => setErrorSB(true);
  const closeErrorSB = () => setErrorSB(false);
  const openSuccessSB = () => setSuccessSB(true);
  const closeSuccessSB = () => setSuccessSB(false);
  const renderSuccessSB = (
    <MDSnackbar
      color="warning"
      icon="warning"
      title="Package Tracker"
      content="Package was canceled successfully!"
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
  const onSubmitDeletePackage = (id) => {
    axios
      .delete(`http://localhost:8080/api/v1/packages/${id}`)
      .then((response) => {
        setOpenDeleteDialog(false); //for closing dialog
        setParcels(response.data);
        openSuccessSB();
      })
      .catch(() => {
        openErrorSB();
      });
  };
  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false);
  };

  const { register, handleSubmit } = useForm();
  const onSubmit = (data) => {
    // alert(JSON.stringify(data, null, 4));
    axios.post("http://localhost:8080/api/v1/packages", data).then((response) => {
      setOpen(false); //for closing dialog
    });
  };

  const rowsTest = parcels.map((project, index) => ({
    project: (
      <Project
        key={index}
        // image={darkMode ? project.image : project.imageDark}
        name={project.title}
      />
    ),
    budget: (
      <MDTypography component="a" href="#" variant="button" color="text" fontWeight="medium">
        {`$${project.budget}`}
      </MDTypography>
    ),
    status: (
      <MDBox ml={-1}>
        <MDBadge badgeContent={project.status} color="info" variant="gradient" size="sm" />
      </MDBox>
    ),
    completion: <Progress color="info" value={project.completion} />,
    action: (
      <MDTypography component="a" href="#" color="text">
        <Icon
          sx={{ cursor: "pointer", fontWeight: "bold" }}
          fontSize="small"
          onClick={() => {
            openMenu(project.id);
          }}
        >
          more_vert
        </Icon>
        <Menu id="simple-menu1" anchorEl={menu} open={Boolean(menu)} onClose={closeMenu}>
          <MenuItem onClick={closeMenu}>
            <MDButton variant="text" color={darkMode ? "white" : "dark"}>
              <Icon>visibility</Icon>&nbsp;view
            </MDButton>
          </MenuItem>
          <MenuItem onClick={closeMenu}>
            <MDButton variant="text" color={darkMode ? "white" : "dark"}>
              <Icon>edit</Icon>&nbsp;edit
            </MDButton>
          </MenuItem>
          <MenuItem onClick={closeMenu}>
            <MDButton variant="text" color="error">
              <Icon>delete</Icon>&nbsp;delete
            </MDButton>
          </MenuItem>
        </Menu>
        {/* TODO REPLACE WITH {renderMenu(project.id)} !!!!!*/}
      </MDTypography>
    ),
  }));

  // async function fetchData() {
  //   await axios
  //     .get("http://localhost:8080/api/v1/packages")
  //     .then((response) => {
  //       projectsTableData(response.data);
  //       setUsers(response.data);
  //     })
  //     .then(() => {
  //       // After updating parcels, send it to projectsTableData
  //       const { columns, rows } = projectsTableData(user);
  //       setPColumns(columns);
  //       setPRows(rows);
  //     })
  //     .catch((error) => {
  //       setError(error.message);
  //       console.error("There was an error!", error);
  //     });
  // }

  //TODO: WORK VERSION
  // useEffect(() => {
  //   axios
  //     .get("http://localhost:8080/api/v1/packages")
  //     .then((response) => {
  //       setUsers(response.data);
  //       return {}
  //     })
  //   .then()
  //     .catch((error) => {
  //       setError(error.message);
  //       console.error("There was an error!", error);
  //     });
  // }, []);
  //
  // useEffect(() => {
  //   // GET request using axios inside useEffect React hook
  //   // fetchData().then(() => console.log(parcels));
  //   console.log(parcels);
  //   // empty dependency array means this effect will only run once (like componentDidMount in classes)
  // }, [parcels]);

  //TODO: СДЕЛАТЬ ТАК ЧТОБЫ ДАННЫЕ ОТОБРАЗИЛИСЬ В ТАБЛИЧКЕ
  // useEffect(() => {
  //   const { columns, rows } = projectsTableData(parcels);
  //   setPColumns(columns);
  //   setPRows(rows);
  //   // empty dependency array means this effect will only run once (like componentDidMount in classes)
  // }, [columns, rows]);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox pt={6} pb={3}>
        <Grid container spacing={6}>
          {/*table - 1*/}
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
                <Grid container spacing={2} alignItems="center">
                  <Grid item xs={10}>
                    <MDTypography variant="h6" color="white">
                      Parcels Table
                    </MDTypography>
                  </Grid>
                  <Grid item xs={2} alignContent="left">
                    <MDBox mx={5}>
                      <MDButton variant="outlined" color="white" onClick={handleRefreshButton}>
                        <RefreshIcon />
                        &nbsp;&nbsp;&nbsp;Refresh
                      </MDButton>
                    </MDBox>
                  </Grid>
                </Grid>
              </MDBox>
              <MDBox pt={3} mx={2} py={3}>
                <DataGrid
                  rows={parcels}
                  columns={columnsTest}
                  initialState={{
                    pagination: {
                      paginationModel: { page: 0, pageSize: 7 },
                    },
                  }}
                  disableRowSelectionOnClick
                  disableColumnSelector
                  sx={{
                    "&.MuiDataGrid-root .MuiDataGrid-columnHeader:focus, &.MuiDataGrid-root .MuiDataGrid-cell:focus-within":
                      {
                        outline: "none !important",
                      },
                    border: "none",
                  }}
                  pageSizeOptions={[5, 7, 10]}
                />
              </MDBox>
            </Card>
          </Grid>
          <Dialog
            open={openDeleteDialog}
            onClose={handleCloseDeleteDialog}
            aria-labelledby={`alert-dialog-title`}
            aria-describedby={`alert-dialog-description`}
          >
            <DialogTitle color={"error"} id={`alert-dialog-title`}>
              {"Cancel Parcel Confirmation"}
            </DialogTitle>
            <DialogContent>
              <DialogContentText id={`alert-dialog-description`}>
                Are you sure you really want to cancel the parcel with id {deleteModalId}?
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <MDButton
                onClick={handleCloseDeleteDialog}
                variant="outlined"
                size="small"
                color={"info"}
              >
                Close
              </MDButton>
              <MDButton
                onClick={() => onSubmitDeletePackage(deleteModalId)}
                variant="outlined"
                size="small"
                color={"error"}
              >
                Confirm
              </MDButton>
            </DialogActions>
          </Dialog>
          {renderSuccessSB}
          {renderErrorSB}
        </Grid>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Tables;
