import { Button, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { HexColorPicker } from "react-colorful";
import { GetColorName } from "hex-color-to-color-name";

const AddCustomer = ({ formData, setFormData, handleSubmit }) => {
  const [color, setColor] = useState("#aabbcc");

  useEffect(() => {
    setFormData({
      ...formData,
      favorite_outfit_color: color,
    });
  }, [color]);
  return (
    <dialog id="add" className="modal modal-bottom sm:modal-middle ">
      <div className="modal-box  w-full max-w-5xl px-10">
        <form onSubmit={handleSubmit} className="mt-10">
          <strong className="mb-5">Personal Information</strong>
          <div>
            <TextField
              margin="dense"
              id="name"
              label="Name"
              type="text"
              variant="standard"
              fullWidth
              onChange={(e) => {
                setFormData({
                  ...formData,
                  name: e.target.value,
                });
              }}
              value={formData.name}
            />
          </div>
          <div>
            <TextField
              margin="dense"
              id="name"
              label="Instagram"
              type="text"
              variant="standard"
              fullWidth
              onChange={(e) => {
                setFormData({
                  ...formData,
                  instagram_users: e.target.value,
                });
              }}
              value={formData.instagram_users}
            />
          </div>
          <div className="mt-10">
            <HexColorPicker color={color} onChange={setColor} />
          </div>
          <div>
            <TextField
              margin="dense"
              id="name"
              label="Favorite Outfit Color"
              type="text"
              variant="standard"
              fullWidth
              onChange={(e) => {
                setFormData({
                  ...formData,
                  favorite_outfit_color: e.target.value,
                });
              }}
              value={`${formData.favorite_outfit_color} - ${GetColorName(
                formData.favorite_outfit_color
              )}`}
            />
          </div>
          <div className="flex w-full justify-end mt-5">
            <Button variant="outlined" type="submit">
              Submit
            </Button>
          </div>
        </form>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
  );
};

export default AddCustomer;
