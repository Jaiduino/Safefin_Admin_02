import React, { useState } from "react";
import {
  TextField,
  Button,
  Card,
  CardContent,
  Typography,
  Grid,
} from "@mui/material";
import Navbar from "../Components/Navbar";
import Retailer_info_Dialog from "../DialogBox/Retailer_Info_box";

function Save_retailer() {
  const [isHovered, setIsHovered] = useState(false);
  const [retailsData, setRetailerData] = useState({
    owner_name: "",
    shop_name: "",
    email_address: "",
    owner_phone_no: "",
    shop_gst_no: "",
    password: "",
    address: {
      full_address: "",
      city: "",
      pincode: "",
      state: "",
      country: "",
    },
  });
  const [dialogOpen, setDialogOpen] = useState(false);
  const [responseDialogText, setResponseDialogText] = useState({
    retailer_Id: "",
    owner_name: "",
    shop_name: "",
    email_address: "",
    owner_phone_no: "",
    shop_gst_no: "",
    password: "",
    address: {
      full_address: "",
      city: "",
      pincode: "",
      state: "",
      country: "",
    },
  });
  const handle_Retailer_info_Dialog_Open = () => {
    setDialogOpen(true);
  };

  const handle_Retailer_info_Close = () => {
    setDialogOpen(false);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(true);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(retailsData.owner_name);
    console.log(retailsData);

    var helper = new XMLHttpRequest();
    helper.onreadystatechange = () => {
      if (helper.readyState === 4 && helper.status === 200) {
        var result = JSON.parse(helper.responseText);
        console.log(result);
        console.log(helper.status);
        setResponseDialogText(result.data);
        handle_Retailer_info_Dialog_Open();
        console.log(responseDialogText);
      }
    };

    helper.open(
      "POST",
      "http://localhost:5000/api/retailer/save_retailer_info"
    );
    helper.setRequestHeader("Content-Type", "application/json");
    helper.send(JSON.stringify(retailsData));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // Check if the field is nested
    if (name.includes(".")) {
      const [parentKey, childKey] = name.split(".");
      setRetailerData((prevData) => ({
        ...prevData,
        [parentKey]: {
          ...prevData[parentKey],
          [childKey]: value,
        },
      }));
    } else {
      // Non-nested fields
      if (
        name === "full_address" ||
        name === "city" ||
        name === "pincode" ||
        name === "state" ||
        name === "country"
      ) {
        setRetailerData((prevData) => ({
          ...prevData,
          address: {
            ...prevData.address,
            [name]: value,
          },
        }));
      } else {
        setRetailerData((prevData) => ({
          ...prevData,
          [name]: value,
        }));
      }
    }
  };

  return (
    <div>
      <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
        <Navbar isHovered={isHovered} />
      </div>
      <Card sx={{ maxWidth: 600, margin: "auto", marginTop: 10 }}>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            Enter Retailer Details
          </Typography>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Owner Name"
                  variant="outlined"
                  required
                  name="owner_name"
                  value={retailsData.owner_name}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Owner Contact No"
                  variant="outlined"
                  name="owner_phone_no"
                  required
                  value={retailsData.owner_phone_no}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Shop Name"
                  variant="outlined"
                  name="shop_name"
                  required
                  value={retailsData.shop_name}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Shop GST No"
                  variant="outlined"
                  name="shop_gst_no"
                  required
                  value={retailsData.shop_gst_no}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Email Address"
                  variant="outlined"
                  type="email"
                  name="email_address"
                  required
                  value={retailsData.email_address}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Password"
                  variant="outlined"
                  type="password"
                  name="password"
                  required
                  value={retailsData.password}
                  onChange={handleInputChange}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Shop Full Address"
                  variant="outlined"
                  name="full_address"
                  required
                  value={retailsData.address.full_address}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="City"
                  variant="outlined"
                  name="city"
                  required
                  value={retailsData.address.city}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="pincode"
                  variant="outlined"
                  name="pincode"
                  required
                  value={retailsData.address.pincode}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="State"
                  variant="outlined"
                  name="state"
                  required
                  value={retailsData.address.state}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Country"
                  variant="outlined"
                  name="country"
                  required
                  value={retailsData.address.country}
                  onChange={handleInputChange}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              sx={{ marginTop: 2 }}
            >
              Register
            </Button>
          </form>
        </CardContent>
      </Card>
      <Retailer_info_Dialog
        open={dialogOpen}
        onClose={handle_Retailer_info_Close}
        responseText={responseDialogText}
      ></Retailer_info_Dialog>
    </div>
  );
}

export default Save_retailer;
