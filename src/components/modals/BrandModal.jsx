import React from "react";
import { flexColumn, modalStyle } from "../../styles/globalStyle";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import useStockCall from "../../hooks/useStockCall";

export default function BrandModal({ open, handleClose, info, setInfo }) {
  const { postStockData, putStockData } = useStockCall();

  const handleChange = e => {
    e.preventDefault();
    const { name, value } = e.target;
    setInfo({ ...info, [name]: value });
  };
  const handleSubmit = e => {
    e.preventDefault();

    if (info.id) {
      putStockData("brands", info);
    } else {
      postStockData("brands", info);
    }
    handleClose();
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description">
      <Box sx={modalStyle}>
        {/* stillendirme özelliklerini birkaç modal da kullandığımız için aynı özellikleri tekrar tekrar yazmak yerine ortak bir alana yani globalsStyle içerisine taşımış olduk. */}
        <Box sx={flexColumn} component={"form"} onSubmit={handleSubmit}>
          <TextField
            label="Brand Name"
            name="name"
            id="name"
            type="text"
            variant="outlined"
            value={info?.name}
            onChange={handleChange}
            required
          />

          <TextField
            label="Image Url"
            name="image"
            id="image"
            type="url"
            variant="outlined"
            value={info?.image}
            onChange={handleChange}
          />

          <Button type="submit" variant="contained" size="large">
            {info.id ? "Update Brand" : "Submit Brand"}
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}
