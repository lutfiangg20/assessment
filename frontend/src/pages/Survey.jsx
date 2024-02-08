import { TextField } from "@mui/material";
import Navbar from "../components/Navbar";

const Survey = () => {
  return (
    <div>
      <Navbar>
        <div>
          <strong>Personal Information</strong>
          <div className="flex flex-col">
            {/* <input className="" type="text" name="name" id="name" /> */}
            <div>
              <TextField
                id="name"
                label="Name"
                type="text"
                variant="standard"
              />
            </div>
            <div>
              <TextField
                id="name"
                label="Instagram"
                type="text"
                variant="standard"
              />
            </div>
            <div>
              <TextField
                id="name"
                label="Favorite Outfit Color"
                type="text"
                variant="standard"
              />
            </div>
          </div>
        </div>
      </Navbar>
    </div>
  );
};

export default Survey;
