import { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { Button, FormControl, InputLabel } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import Navbar from "../Components/Navbar";
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));
const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export default function Application() {
  const [openLoan_Invoice_Image, setOpenLoan_Invoice_Image] = useState(false);
  const [openCustomer_Device_Image, setOpenCustomer_Device_Image] =
    useState(false);
  const [openSign, setOpenSign] = useState(false);
  const [selectedStatusId, setSelectedStatusId] = useState(null);
  const [status, setStatus] = useState("");
  const [application, setApplication] = useState([]);
  const [customer, setCustomer] = useState([]);
  const [deviceDetails, setDeviceDetails] = useState([]);
  const statusItems = [
    { id: 1, value: "Pending" },
    { id: 2, value: "Approve" },
    { id: 3, value: "Reject" },
  ];
  const [statuses, setStatuses] = useState({});

  const [isHovered, setIsHovered] = useState(false);
  const [searchTerm, setSearchTerm] = useState(""); // New state for search term
  const [filteredApplications, setFilteredApplications] = useState([]);

  useEffect(() => {
    var helper = new XMLHttpRequest();
    helper.onreadystatechange = () => {
      if (helper.readyState === 4 && helper.status === 200) {
        var result = JSON.parse(helper.responseText).data;
        // console.log(result[0].device);
        //console.log(result[0].customer);
        setApplication(result);
        setCustomer(result[0].customer);
        setDeviceDetails(result[0].device);
        console.log(result[0].customer);
      }
    };

    helper.open(
      "GET",
      "http://localhost:5000/api/loan_application/get_All_Loan_Applications"
    );
    helper.send();
  }, []);
  useEffect(() => {
    // console.log("app " + JSON.stringify(application));
    console.log("cud " + JSON.stringify(customer));
    console.log("dev " + JSON.stringify(deviceDetails));
  }, [application, status, selectedStatusId]);

  const handleOpenLoan_Invoice_Image = () => {
    setOpenLoan_Invoice_Image(true);
  };

  const handleCloseLoan_Invoice_Image = () => {
    setOpenLoan_Invoice_Image(false);
  };
  const handleOpenCustomer_Device_Image = () => {
    setOpenCustomer_Device_Image(true);
  };

  const handleCloseCustomer_Device_Image = () => {
    setOpenCustomer_Device_Image(false);
  };
  const handleOpenSign = () => {
    setOpenSign(true);
  };

  const handleCloseSign = () => {
    setOpenSign(false);
  };

  const handelapprove_application = (id) => {
    console.log("app" + id);

    var helper = new XMLHttpRequest();
    helper.onreadystatechange = () => {
      if (helper.readyState === 4 && helper.status === 200) {
        var result = JSON.parse(helper.responseText).data;
      }
    };

    helper.open(
      "PUT",
      "http://localhost:5000/api/loan_application/approve_application/" + id

      // http://localhost:5000/api/loan_application/approve_application?id=${Id}
    );

    helper.send();
  };
  const handelReject_apllication = (id) => {
    console.log("rej" + id);

    var helper = new XMLHttpRequest();
    helper.onreadystatechange = () => {
      if (helper.readyState === 4 && helper.status === 200) {
        var result = JSON.parse(helper.responseText).data;
      }
    };

    helper.open(
      "PUT",
      "http://localhost:5000/api/loan_application/reject_application/" + id

      // http://localhost:5000/api/loan_application/approve_application?id=${Id}
    );

    helper.send();
  };
  const secondLineStyle = {
    marginTop: "-1em", // Adjust the value to position the second line relative to the first line
  };
  const handleStatusChange = (event, Id) => {
    const selectedValue = event.target.value;
    setStatus("val is " + selectedValue);
    console.log(Id);
    setStatuses((prevStatuses) => ({
      ...prevStatuses,
      [Id]: selectedValue,
    }));

    const selectedItem = statusItems.find(
      (item) => item.value === selectedValue
    );
    console.log("tatus" + JSON.stringify(selectedItem.value));
    // console.log(`Selected value: ${selectedValue}, Loan Application ID: ${Id}`);
    console.log(selectedItem);
    if (selectedItem) {
      setSelectedStatusId(selectedItem.id);
      if (selectedItem.value === "Approve") {
        console.log("app");
        handelapprove_application(Id);
      } else if (selectedItem.value === "Reject") {
        console.log("rej");
        handelReject_apllication(Id);
      }
    }
  };
  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };
  useEffect(() => {
    const filtered = application.filter((app) => {
      const loanId = String(app.loan_application_Id).toLowerCase();
      return loanId.includes(searchTerm.toLowerCase());
    });
    setFilteredApplications(filtered);
  }, [application, searchTerm]);

  return (
    <div>
      <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
        <Navbar isHovered={isHovered} />
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          backgroundColor: "rgb (44, 44, 46)",
          padding: "1px",
        }}
      >
        <h1>Applications</h1>
        <TextField
          size="small"
          label="Search Application"
          id="outlined-start-adornment"
          sx={{
            borderRadius: "20px",
            m: 1,
            width: "25ch",
            background: "rgb (44, 44, 46)",
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Application ID</StyledTableCell>
              <StyledTableCell>Payment Mode</StyledTableCell>
              <StyledTableCell>
                <div>
                  <p style={secondLineStyle}>
                    Invoice / Loan <br />
                    Number
                  </p>
                </div>
              </StyledTableCell>
              <StyledTableCell>Device Details</StyledTableCell>
              <StyledTableCell>Customer Details</StyledTableCell>
              <StyledTableCell>
                <div>
                  <p style={secondLineStyle}>
                    Invoice / Loan <br />
                    Photo
                  </p>
                </div>
              </StyledTableCell>
              <StyledTableCell>
                <div>
                  <p style={secondLineStyle}>
                    Customer wih device
                    <br />
                    Photo
                  </p>
                </div>
              </StyledTableCell>
              <StyledTableCell>View sign</StyledTableCell>
              <StyledTableCell>Status</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredApplications.map((app, index) => (
              <StyledTableRow key={index}>
                <StyledTableCell component="th" scope="row">
                  {app.loan_application_Id}
                </StyledTableCell>
                <StyledTableCell>{app.payment_mode}</StyledTableCell>
                <StyledTableCell>
                  {app.invoice_No_or_loan_Id_No}
                </StyledTableCell>
                <StyledTableCell>
                  <FormControl fullWidth>
                    <InputLabel id="device-details">show details</InputLabel>
                    <Select label="Dropdown">
                      <Table>
                        <TableRow>
                          <TableCell>Device Name</TableCell>
                          <TableCell>{app.device.device_model_name}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>Device Brand</TableCell>
                          <TableCell>{app.device.device_model_name}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>Device IMEI No</TableCell>
                          <TableCell>{app.device.imei_no}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>Device price</TableCell>
                          <TableCell>
                            {app.device.device_price}&nbsp;(Rs)
                          </TableCell>
                        </TableRow>
                      </Table>
                    </Select>
                  </FormControl>
                </StyledTableCell>
                <StyledTableCell>
                  <FormControl fullWidth>
                    <InputLabel id="customer-details">show details</InputLabel>
                    <Select label="Dropdown">
                      <Table>
                        <TableRow>
                          <TableCell>Customer Id</TableCell>
                          <TableCell>{app.customer.customer_Id}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>Customer Name</TableCell>
                          <TableCell> {app.customer.fullName}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>Aadhar Number</TableCell>
                          <TableCell> {app.customer.aadhar_no}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>Contact Number</TableCell>
                          <TableCell> {app.customer.contact_no}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>Email Adrress</TableCell>
                          <TableCell> {app.customer.email_address}</TableCell>
                        </TableRow>
                      </Table>
                    </Select>
                  </FormControl>
                </StyledTableCell>
                <StyledTableCell>
                  <Button onClick={handleOpenLoan_Invoice_Image}>
                    View Image
                  </Button>
                  <Dialog
                    open={openLoan_Invoice_Image}
                    onClose={handleCloseLoan_Invoice_Image}
                  >
                    <DialogTitle>Loan_Invoice_Image</DialogTitle>
                    <DialogContent>
                      <DialogContentText>
                        <img
                          src={`data:image/jpeg;base64,${app.invoice_or_loan_image.data}`}
                          alt="Popup Image"
                          style={{ maxWidth: "100%" }}
                        />
                      </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                      <Button
                        onClick={handleCloseLoan_Invoice_Image}
                        color="primary"
                      >
                        Close
                      </Button>
                    </DialogActions>
                  </Dialog>
                </StyledTableCell>
                <StyledTableCell>
                  <Button onClick={handleOpenCustomer_Device_Image}>
                    View Image
                  </Button>
                  <Dialog
                    open={openCustomer_Device_Image}
                    onClose={handleCloseCustomer_Device_Image}
                  >
                    <DialogTitle>Customer_Device_Image</DialogTitle>
                    <DialogContent>
                      <DialogContentText>
                        <img
                          src={`data:image/jpeg;base64,${app.invoice_or_loan_image.data}`}
                          alt="Popup Image"
                          style={{ maxWidth: "100%" }}
                        />
                      </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                      <Button
                        onClick={handleCloseCustomer_Device_Image}
                        color="primary"
                      >
                        Close
                      </Button>
                    </DialogActions>
                  </Dialog>
                </StyledTableCell>
                <StyledTableCell>
                  <Button onClick={handleOpenSign}>View Sign</Button>
                  <Dialog open={openSign} onClose={handleCloseSign}>
                    <DialogTitle>Sign Image</DialogTitle>
                    <DialogContent>
                      <DialogContentText>
                        <img
                          src="https://picsum.photos/200"
                          alt="Popup Image"
                          style={{ maxWidth: "100%" }}
                        />
                      </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                      <Button onClick={handleCloseSign} color="primary">
                        Close
                      </Button>
                    </DialogActions>
                  </Dialog>
                </StyledTableCell>
                <StyledTableCell>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">
                      {app.status}
                    </InputLabel>

                    <Select
                      labelId={`demo-simple-select-label-${app.loan_application_Id}`}
                      id={`demo-simple-select-${app.loan_application_Id}`}
                      value={statuses[app.loan_application_Id] || ""}
                      onChange={(event) =>
                        handleStatusChange(event, app.loan_application_Id)
                      }
                    >
                      {statusItems.map((item) => (
                        <MenuItem key={item.id} value={item.value}>
                          {item.value}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
