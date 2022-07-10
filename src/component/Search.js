import React, { useEffect, useState } from "react";

import {
  Autocomplete,
  Button,
  CardActions,
  TextField,
  CardMedia,
  CardContent,
  Typography,
  Card,
} from "@mui/material";
import "./search.css";

function Search() {
  useEffect(() => {
    fetchData();
  }, []);

  const [userData, setUserData] = useState([]);
  const [selectedData, setSelectedData] = useState();
  const [filterData, setFilterData] = useState([]);

  const fetchData = () => {
    fetch("https://reqres.in/api/users")
      .then((response) => response.json())
      .then((json) => setUserData(json.data))
      .catch((err) => console.log("Data unable to retrieve"));
  };

  console.log(filterData, "filterdata");

  const dataHandler = () => {
    const result = userData.filter((user) => user.email === selectedData);
    setFilterData(result);
  };

  return (
    <div>
      <div class="searchBox">
        <Autocomplete
          disablePortal
          onChange={(event, value) => setSelectedData(value)}
          id="demo-box"
          options={userData.map((user) => {
            return user.email;
          })}
          sx={{ width: 300 }}
          renderInput={(param) => <TextField {...param} label="Email ID" />}
        />

        <Button
          variant="contained"
          onClick={dataHandler}
          style={{ marginLeft: 20 }}
        >
          Search
        </Button>
      </div>

      {filterData.length === 0 ? null : (
        <div class="cardDetails">
          <Card sx={{ maxWidth: 299 }}>
            <CardMedia
              component="img"
              height="194"
              image={filterData.map((image) => image.avatar)}
              alt="Image"
            />
            <CardContent>
              {filterData.map((user) => {
                return (
                  <div class="typography">
                    <Typography
                      variant="h6"
                      component="div"
                      style={{ marginRight: 5 }}
                    >
                      {user.first_name}
                    </Typography>
                    <Typography variant="h6" component="div">
                      {user.last_name}
                    </Typography>
                  </div>
                );
              })}

              <Typography variant="body2" color="text.secondary">
                This is a section for the description of a person. You can
                provide a short summary of a person. Try to make your
                description as short as possible. For more details about the
                person you can head over to more details options
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small">More Details</Button>
            </CardActions>
          </Card>
        </div>
      )}
    </div>
  );
}

export default Search;
