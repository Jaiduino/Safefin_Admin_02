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
import axios from "axios";
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

export default function Claim_Applications() {
  const [openLoan_Invoice_Image, setOpenLoan_Invoice_Image] = useState(false);
  const [openCustomer_Device_Image, setOpenCustomer_Device_Image] =
    useState(false);
  const [openSign, setOpenSign] = useState(false);
  const [selectedStatusId, setSelectedStatusId] = useState(null);
  const [status, setStatus] = useState("");
  const [claim_application, setClaim_Application] = useState([]);
  const [insurance_Application, setInsurance_Application] = useState([]);

  const [customer, setCustomer] = useState([]);
  const [deviceDetails, setDeviceDetails] = useState([]);
  const [retailer, setRetailer] = useState([]);
  const [sercice_Provider, setService_Provider] = useState([]);

  const statusItems = [
    { id: 1, value: "Pending" },
    { id: 2, value: "Approve" },
    { id: 3, value: "Reject" },
  ];
  const [statuses, setStatuses] = useState({});
  const [searchTerm, setSearchTerm] = useState("");
  const [isHovered, setIsHovered] = useState(false);
  useEffect(() => {
    var helper = new XMLHttpRequest();
    helper.onreadystatechange = () => {
      if (helper.readyState === 4 && helper.status === 200) {
        var result = JSON.parse(helper.responseText).data;
        console.log(result);
        console.log("device" + JSON.stringify(result[0].application.device));
        console.log("app" + JSON.stringify(result[0].application));
        console.log("cus" + JSON.stringify(result[0]?.application.customer));
        console.log("ser" + JSON.stringify(result[0]?.service_provider));
        setClaim_Application(result);
        setInsurance_Application(JSON.stringify(result[0]?.application));
        setDeviceDetails(JSON.stringify(result[0]?.application.device));
        setCustomer(JSON.stringify(result[0]?.application.customer));
        setRetailer(JSON.stringify(result[0]?.service_provider));
      }
    };
    console.log("isss" + deviceDetails);
    console.log("apis" + claim_application);
    console.log("cuss" + customer);
    console.log("serrr" + sercice_Provider);
    helper.open("GET", "http://localhost:5000/api/claim/get_all_applications");
    helper.send();
  }, []);

  useEffect(() => {
    // console.log("app " + JSON.stringify(application));
    console.log("cud " + JSON.stringify(customer));
    console.log("dev " + JSON.stringify(deviceDetails));
  }, [claim_application, status, selectedStatusId]);

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
        <h1>Claim Applications</h1>
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
        />
      </div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Claim Id</StyledTableCell>
              <StyledTableCell>Claim Date</StyledTableCell>
              <StyledTableCell>Application Id</StyledTableCell>
              <StyledTableCell>Customer Name</StyledTableCell>
              <StyledTableCell>Device Name</StyledTableCell>
              <StyledTableCell>Device Price</StyledTableCell>
              <StyledTableCell>Bill_or_Loan No</StyledTableCell>
              <StyledTableCell>Service Provider</StyledTableCell>

              <StyledTableCell>View sign</StyledTableCell>
              <StyledTableCell>Status</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {claim_application.map((app, index) => (
              <StyledTableRow key={index}>
                <StyledTableCell component="th" scope="row">
                  {app.claim_id}
                </StyledTableCell>
                <StyledTableCell>{app.claim_generated_date}</StyledTableCell>
                <StyledTableCell>
                  {app.application.loan_application_Id}
                </StyledTableCell>
                <StyledTableCell>
                  {app.application.customer.fullName}
                </StyledTableCell>
                <StyledTableCell>
                  {app.application.device.device_model_name}
                </StyledTableCell>
                <StyledTableCell>
                  {app.application.device.device_price}&nbsp;(Rs)
                </StyledTableCell>
                <StyledTableCell>{app.bill_or_loan_number}</StyledTableCell>
                <StyledTableCell>
                  {app.service_provider && app.service_provider.shop_name
                    ? app.service_provider.shop_name
                    : "N/A"}
                </StyledTableCell>

                <StyledTableCell>
                  <Button onClick={handleOpenSign}>View Sign</Button>
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
