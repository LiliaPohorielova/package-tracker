/* eslint-disable react/prop-types */
/* eslint-disable react/function-component-definition */

// @mui material components
import Icon from "@mui/material/Icon";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDAvatar from "components/MDAvatar";
import MDProgress from "components/MDProgress";

// Images
import parcelIcon from "assets/images/parcel-icon.png";
import parcelIconDark from "assets/images/parcel-icon-dark.png";
import logoGithub from "assets/images/small-logos/github.svg";
import logoAtlassian from "assets/images/small-logos/logo-atlassian.svg";
import logoSlack from "assets/images/small-logos/logo-slack.svg";
import logoSpotify from "assets/images/small-logos/logo-spotify.svg";
import logoInvesion from "assets/images/small-logos/logo-invision.svg";
import * as React from "react";
import { useState } from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MDButton from "../../../components/MDButton";
import { useMaterialUIController } from "../../../context";
import MDBadge from "../../../components/MDBadge";

export default function data(projects, darkMode, menu, openMenu, closeMenu) {

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
  const renderMenu = (
      <Menu
          id="simple-menufsdfsf"
          anchorEl={menu}
          open={Boolean(menu)}
          onClose={closeMenu}
      >
        <MenuItem onClick={closeMenu}>
          <MDButton variant="text" color="error">
            <Icon>delete</Icon>&nbsp;delete
          </MDButton>
        </MenuItem>
        <MenuItem onClick={closeMenu}>
          <MDButton variant="text" color={darkMode ? "white" : "dark"}>
            <Icon>edit</Icon>&nbsp;edit
          </MDButton>
        </MenuItem>
        <MenuItem onClick={closeMenu}>
          <MDButton variant="text" color={darkMode ? "white" : "dark"}>
            <Icon>visibility</Icon>&nbsp;view
          </MDButton>
        </MenuItem>
      </Menu>
  );

  return {
    columns: [
      { Header: "parcel", accessor: "project", width: "30%", align: "left" },
      { Header: "budget", accessor: "budget", align: "left" },
      { Header: "status", accessor: "status", align: "center" },
      { Header: "completion", accessor: "completion", align: "center" },
      { Header: "action", accessor: "action", align: "center" },
    ],

    rows: projects.map((project, index) => ({
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
                onClick={() => {console.log(project.id); openMenu(project.id)}}
            >
              more_vert
            </Icon>
            {renderMenu}
            {/* TODO REPLACE WITH {renderMenu(project.id)} !!!!!*/}
          </MDTypography>
      ),
    }))
    // rows: [
    //   {
    //     project: <Project image={darkMode ? parcelIcon : parcelIconDark} name="Asana" />,
    //     budget: (
    //       <MDTypography component="a" href="#" variant="button" color="text" fontWeight="medium">
    //         $2,500
    //       </MDTypography>
    //     ),
    //     status: (
    //       <MDBox ml={-1}>
    //         <MDBadge badgeContent="in progress" color="info" variant="gradient" size="sm" />
    //       </MDBox>
    //     ),
    //     completion: <Progress color="info" value={60} />,
    //     action: (
    //       <MDTypography component="a" href="#" color="text">
    //         <Icon
    //           sx={{ cursor: "pointer", fontWeight: "bold" }}
    //           fontSize="small"
    //           onClick={openMenu}
    //         >
    //           more_vert
    //         </Icon>
    //         {renderMenu}
    //       </MDTypography>
    //     ),
    //   },
    //   {
    //     project: <Project image={logoGithub} name="Github" />,
    //     budget: (
    //       <MDTypography component="a" href="#" variant="button" color="text" fontWeight="medium">
    //         $5,000
    //       </MDTypography>
    //     ),
    //     status: (
    //       <MDBox ml={-1}>
    //         <MDBadge badgeContent="delivered" color="success" variant="gradient" size="sm" />
    //       </MDBox>
    //     ),
    //     completion: <Progress color="success" value={100} />,
    //     action: (
    //       <MDTypography component="a" href="#" color="text">
    //         <Icon
    //           sx={{ cursor: "pointer", fontWeight: "bold" }}
    //           fontSize="small"
    //           onClick={openMenu}
    //         >
    //           more_vert
    //         </Icon>
    //         {renderMenu}
    //       </MDTypography>
    //     ),
    //   },
    //   {
    //     project: <Project image={logoAtlassian} name="Atlassian" />,
    //     budget: (
    //       <MDTypography component="a" href="#" variant="button" color="text" fontWeight="medium">
    //         $3,400
    //       </MDTypography>
    //     ),
    //     status: (
    //       <MDBox ml={-1}>
    //         <MDBadge badgeContent="canceled" color="error" variant="gradient" size="sm" />
    //       </MDBox>
    //     ),
    //     completion: <Progress color="error" value={30} />,
    //     action: (
    //       <MDTypography component="a" href="#" color="text">
    //         <Icon>more_vert</Icon>
    //       </MDTypography>
    //     ),
    //   },
    //   {
    //     project: <Project image={logoSlack} name="Slack" />,
    //     budget: (
    //       <MDTypography component="a" href="#" variant="button" color="text" fontWeight="medium">
    //         $1,000
    //       </MDTypography>
    //     ),
    //     status: (
    //       <MDBox ml={-1}>
    //         <MDBadge badgeContent="created" color="secondary" variant="gradient" size="sm" />
    //       </MDBox>
    //     ),
    //     completion: <Progress color="error" value={0} />,
    //     action: (
    //       <MDTypography component="a" href="#" color="text">
    //         <Icon>more_vert</Icon>
    //       </MDTypography>
    //     ),
    //   },
    //   {
    //     project: <Project image={logoSpotify} name="Spotify" />,
    //     budget: (
    //       <MDTypography component="a" href="#" variant="button" color="text" fontWeight="medium">
    //         $14,000
    //       </MDTypography>
    //     ),
    //     status: (
    //       <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
    //         working
    //       </MDTypography>
    //     ),
    //     completion: <Progress color="info" value={80} />,
    //     action: (
    //       <MDTypography component="a" href="#" color="text">
    //         <Icon>more_vert</Icon>
    //       </MDTypography>
    //     ),
    //   },
    //   {
    //     project: <Project image={logoInvesion} name="Invesion" />,
    //     budget: (
    //       <MDTypography component="a" href="#" variant="button" color="text" fontWeight="medium">
    //         $2,300
    //       </MDTypography>
    //     ),
    //     status: (
    //       <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
    //         done
    //       </MDTypography>
    //     ),
    //     completion: <Progress color="success" value={100} />,
    //     action: (
    //       <MDTypography component="a" href="#" color="text">
    //         <Icon>more_vert</Icon>
    //       </MDTypography>
    //     ),
    //   },
    // ],
  };
}
