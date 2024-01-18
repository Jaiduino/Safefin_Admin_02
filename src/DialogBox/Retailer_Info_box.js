// ResponseDialog.js
import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from "@mui/material";

import {
  Paper,
  Typography,
  List,
  ListItem,
  ListItemText,
  Divider,
  makeStyles,
} from "@mui/material";

function Retailer_info_Dialog({ open, onClose, responseText }) {
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
    <Dialog open={open} onClose={onClose}>
      <DialogTitle style={{ textAlign: "center" }}>
        Retailer Information
      </DialogTitle>
      <DialogContent style={{ maxHeight: "400px", maxWidth: "800px" }}>
        <Paper style={paperStyle} elevation={3}>
          <List>
            <ListItem>
              <ListItemText
                primary={
                  <Typography variant="body1">
                    <span
                      style={{ fontWeight: "bold" }}
                    >{`Retailer ID :`}</span>
                    {responseText.retailer_Id}
                  </Typography>
                }
              />
            </ListItem>
            <Divider />
            <ListItem>
              <ListItemText
                primary={
                  <Typography variant="body1">
                    <span style={{ fontWeight: "bold" }}>{`Password : `}</span>
                    {responseText.password}
                  </Typography>
                }
              />
            </ListItem>
            <Divider />
            <ListItem>
              <ListItemText
                primary={
                  <Typography variant="body1">
                    <span style={{ fontWeight: "bold" }}>{`Shop Name : `}</span>
                    {responseText.shop_name}
                  </Typography>
                }
              />
            </ListItem>
            <Divider />
            <ListItem>
              <ListItemText
                primary={
                  <Typography variant="body1">
                    <span
                      style={{ fontWeight: "bold" }}
                    >{`Owner Name : `}</span>
                    {responseText.owner_name}
                  </Typography>
                }
              />
            </ListItem>
            <Divider />
            <ListItem>
              <ListItemText
                primary={
                  <Typography variant="body1">
                    <span
                      style={{ fontWeight: "bold" }}
                    >{`Shop GST No : `}</span>
                    {responseText.shop_gst_no}
                  </Typography>
                }
              />
            </ListItem>
            <Divider />
            <ListItem>
              <ListItemText
                primary={
                  <Typography variant="body1">
                    <span
                      style={{ fontWeight: "bold" }}
                    >{`Contact No : `}</span>
                    {responseText.owner_phone_no}
                  </Typography>
                }
              />
            </ListItem>
            <Divider />
            <ListItem>
              <ListItemText
                primary={
                  <Typography variant="body1">
                    <span
                      style={{ fontWeight: "bold" }}
                    >{`Email Address: `}</span>
                    {responseText.email_address}
                  </Typography>
                }
              />
            </ListItem>
            <Divider />
            <ListItem>
              <ListItemText
                primary={
                  <>
                    <Typography variant="body1" style={{ fontWeight: "bold" }}>
                      Address:
                    </Typography>
                    <Typography variant="body1">
                      {`${responseText.address.full_address},`}
                    </Typography>
                    <Typography variant="body">
                      {` ${responseText.address.city}, ${responseText.address.pincode},`}
                    </Typography>
                    <Typography variant="body7">
                      {`${responseText.address.state}`}
                    </Typography>
                  </>
                }
              />
            </ListItem>
          </List>
        </Paper>
      </DialogContent>
      <DialogActions style={{ justifyContent: "center" }}>
        <Button onClick={onClose} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default Retailer_info_Dialog;
