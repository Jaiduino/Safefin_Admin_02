import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useState, useEffect } from "react";
import Navbar from "../Components/Navbar";
import SearchIcon from "@mui/icons-material/Search";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import { Button, FormControl, InputLabel } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Retailer_info_Dialog from "../DialogBox/Retailer_Info_box";
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

export default function RetailersList() {
  const [isHovered, setIsHovered] = useState(false);
  const [searchTerm, setSearchTerm] = useState(""); // New state for search term
  const [filteredApplications, setFilteredApplications] = useState([]);
  const [retails, setRetailers] = useState([]);
  const [retailer_Details_dialogOpen, setRetailer_Details_DialogOpen] =
    useState(false);
  const [detail_Retailer, setDetail_Retailer] = useState({
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
  const [retailerApplications, setRetailersApplications] = useState([]);
  const navigate = useNavigate();
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
    var helper = new XMLHttpRequest();
    helper.onreadystatechange = () => {
      if (helper.readyState === 4 && helper.status === 200) {
        var result = JSON.parse(helper.responseText).data;

        console.log("list is" + result[2].application_list);
        setRetailers(result);
        const applicationLists = result.map(
          (retailer) => retailer.application_list
        );
        setRetailersApplications(applicationLists);
      }
    };

    helper.open("GET", "http://localhost:5000/api/retailer/get_All_Retailers");
    helper.send();
  }, []);
  useEffect(() => {
    const filtered = retails.filter((app) => {
      const loanId = String(app.retailer_Id).toLowerCase();
      return loanId.includes(searchTerm.toLowerCase());
    });
    setFilteredApplications(filtered);
  }, [retails, searchTerm]);
  //  console.log(retails);
  const handle_Retailer_info_Dialog_Open = () => {
    setRetailer_Details_DialogOpen(true);
  };

  const handle_Retailer_info_Close = () => {
    setRetailer_Details_DialogOpen(false);
  };

  const gotoDetails = (id) => {
    console.log("is presseds");
    console.log(id);
    // navigate(`/retailers_details/${id}`);
    var helper = new XMLHttpRequest();
    helper.onreadystatechange = () => {
      if (helper.readyState === 4 && helper.status === 200) {
        var result = JSON.parse(helper.responseText).data;
        console.log(result);
        setDetail_Retailer(result);
        handle_Retailer_info_Dialog_Open();
      }
    };
    //localhost:5000/api/loan_application/reject_application/" + id
    http: helper.open(
      "GET",
      "http://localhost:5000/api/retailer/get_Retailer_By_id/" + id
    );
    helper.send();
  };
  const showapplications = (id) => {
    navigate(`/retailers_applications/${id}`);
  };
  console.log(retailerApplications);
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
              <StyledTableCell>Retailer ID</StyledTableCell>
              <StyledTableCell>Owner Name</StyledTableCell>
              <StyledTableCell>Shop Name</StyledTableCell>
              <StyledTableCell>Contact No</StyledTableCell>
              <StyledTableCell>Email Address</StyledTableCell>
              <StyledTableCell>City</StyledTableCell>
              <StyledTableCell>More Details</StyledTableCell>
              <StyledTableCell>Applications</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredApplications.map((app) => (
              <StyledTableRow key={app.retailer_Id}>
                <StyledTableCell component="th" scope="row">
                  {app.retailer_Id}
                </StyledTableCell>
                <StyledTableCell>{app.owner_name}</StyledTableCell>
                <StyledTableCell>{app.shop_name}</StyledTableCell>
                <StyledTableCell>{app.owner_phone_no}</StyledTableCell>
                <StyledTableCell>{app.email_address}</StyledTableCell>
                <StyledTableCell>{app.address.city}</StyledTableCell>
                <StyledTableCell>
                  <Button onClick={() => gotoDetails(app.retailer_Id)}>
                    View Details
                  </Button>
                </StyledTableCell>
                <StyledTableCell>
                  <Button onClick={() => showapplications(app.retailer_Id)}>
                    View Applications
                  </Button>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Retailer_info_Dialog
        open={retailer_Details_dialogOpen}
        onClose={handle_Retailer_info_Close}
        responseText={detail_Retailer}
      ></Retailer_info_Dialog>
    </div>
  );
}
