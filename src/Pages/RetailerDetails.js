import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  Paper,
  Typography,
  List,
  ListItem,
  ListItemText,
  Divider,
  makeStyles,
} from "@mui/material";

function RetailerDetails() {
  const { id } = useParams();
  const [retailer, setretailer] = useState([]);

  console.log(id);
  useEffect(() => {
    var helper = new XMLHttpRequest();
    helper.onreadystatechange = () => {
      if (helper.readyState === 4 && helper.status === 200) {
        var result = JSON.parse(helper.responseText).data;
        console.log(result);
        setretailer(retailer);
      }
    };
    //localhost:5000/api/loan_application/reject_application/" + id
    http: helper.open(
      "GET",
      "http://localhost:5000/api/retailer/get_Retailer_By_id/" + id
    );
    helper.send();
  }, []);
  
  const paperStyle = {
    maxWidth: 400,
    margin: "auto",
    marginTop: 16,
    padding: 24,
  };

  const titleStyle = {
    marginBottom: 16,
  };

  return (
    <>
      <div>
        <Paper style={paperStyle} elevation={3}>
          <Typography variant="h5" style={titleStyle}>
            Retailer Details
          </Typography>
          <List>
            <ListItem>
              <ListItemText primary={`Retailer ID: ggg`} />
            </ListItem>
            <Divider />
            <ListItem>
              <ListItemText primary={`Owner Name: ggg`} />
            </ListItem>
            <Divider />
            <ListItem>
              <ListItemText primary={`Shop Name: ggg`} />
            </ListItem>
            <Divider />
            <ListItem>
              <ListItemText primary={`Contact No:gggg`} />
            </ListItem>
            <Divider />
            <ListItem>
              <ListItemText primary={`Email Address: ggg`} />
            </ListItem>
            <Divider />
            <ListItem>
              <ListItemText primary={`Address:ggggg`} />
            </ListItem>
          </List>
        </Paper>
      </div>
    </>
  );
}
export default RetailerDetails;
