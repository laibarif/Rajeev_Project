import React, { useState, useRef } from "react";
import "./Adminpage.css";
import axios from "axios";
import image from "../../assets/property.svg"; // Replace with your image
import { BACKEND_URL } from "../../utils/constant";
import { useEffect } from "react";

const AddProperty = () => {
  const [formData, setFormData] = useState({
    name: "",
    location: "",
    price: "",
    description: "",
    image: null,
    soldOut: false,
  });

  const [priceError, setPriceError] = useState(""); // Error message for price field
  const [nameError, setNameError] = useState(""); // Error message for name field
  const [fieldError, setFieldError] = useState(""); // General error for required fields
  const [sizeError, setSizeError] = useState(""); // Error message for invalid image size
  const [successMessage, setSuccessMessage] = useState(""); // Success message
  const [errorMessage, setErrorMessage] = useState(""); // Error message

  // Ref for clearing the file input field
  const fileInputRef = useRef(null);

  // Function to handle changes in form fields
  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;

    if (type === "checkbox") {
      setFormData({ ...formData, [name]: checked });
    } else if (type === "file") {
      const file = files[0];
      if (file) {
        const img = new Image();
        const objectUrl = URL.createObjectURL(file);

        img.onload = () => {
          const { width, height } = img;

          // Check if the image size is valid (1236x808 or 1138x732)
          if (
            (width === 1236 && height === 808) ||
            (width === 1138 && height === 732)
          ) {
            setFormData({ ...formData, [name]: file });
          } else {
            setSizeError(
              "Invalid image size. Allowed sizes are 1236x808 or 1138x732 pixels."
            );
            setTimeout(() => {
              setSizeError(""); // Clear error after 3 seconds
            }, 3000);
          }
          URL.revokeObjectURL(objectUrl); // Clean up the object URL
        };

        img.src = objectUrl; // Trigger the loading of the image
      }
    } else {
      if (name === "name") {
        const nameRegex = /^[a-zA-Z\s]*$/;
        if (!nameRegex.test(value)) {
          setNameError("Name can only contain alphabetic characters.");
          setTimeout(() => {
            setNameError(""); // Clear the error message after 3 seconds
          }, 3000);
        }
        const filteredValue = value.replace(/[^a-zA-Z\s]/g, ""); // Remove invalid characters in real-time
        setFormData({ ...formData, [name]: filteredValue });
      } else {
        setFormData({ ...formData, [name]: value });
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if required fields are empty
    if (
      !formData.name ||
      !formData.location ||
      !formData.description ||
      !formData.image
    ) {
      setFieldError("Please fill in all fields before submitting.");
      setTimeout(() => {
        setFieldError("");
      }, 3000);
      return;
    }

    const submitData = new FormData();
    submitData.append("name", formData.name);
    submitData.append("location", formData.location);
    submitData.append("price", formData.price);
    submitData.append("description", formData.description);
    submitData.append("image", formData.image);
    submitData.append("sold_out", formData.soldOut);

    try {
      const response = await axios.post(
        `${BACKEND_URL}/api/add-property`,
        submitData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setSuccessMessage(response.data.message);
      setFormData({
        name: "",
        location: "",
        price: "",
        description: "",
        image: null,
        soldOut: false,
      }); // Reset form

      // Clear the file input field
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }

      // Remove success message after 3 seconds
      setTimeout(() => {
        setSuccessMessage("");
      }, 3000);
    } catch (err) {
      setErrorMessage("Error adding property");
      console.error(err);

      // Clear error after 3 seconds
      setTimeout(() => {
        setErrorMessage("");
      }, 3000);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="market-property-container">
      <div className="market-property-form">
        <div className="form-content">
          <div className="form-image">
            <img src={image} alt="Add Property" />
          </div>

          <div className="form-fields">
            <h2>Add Property</h2>

            <div className="form-group">
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Property Name"
                required
              />
              {nameError && <p className="form-message error">{nameError}</p>}
            </div>
            <div className="form-group">
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="Location"
                required
              />
            </div>
            <div className="form-group">
              <input
                type="text"
                name="price"
                value={formData.price}
                onChange={handleChange}
                placeholder="Price"
              />
              {priceError && <p className="form-message error">{priceError}</p>}
            </div>
            <div className="form-group">
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Description"
                required
              ></textarea>
            </div>
            <div className="form-group">
              <input
                type="file"
                name="image"
                accept="image/*"
                onChange={handleChange}
                ref={fileInputRef} // Ref for clearing input
                required
              />
              {sizeError && <p className="form-message error">{sizeError}</p>}
            </div>
            <div className="form-group-checkbox">
              <label>Sold Out</label>
              <input
                type="checkbox"
                name="soldOut"
                checked={formData.soldOut}
                onChange={handleChange}
              />
            </div>

            <div className="form-buttons">
              <button
                className="cancel-btn"
                type="button"
                onClick={() =>
                  setFormData({
                    name: "",
                    location: "",
                    price: "",
                    description: "",
                    image: null,
                    soldOut: false,
                  })
                }
              >
                Cancel
              </button>
              <button className="submit-btn" onClick={handleSubmit}>
                Submit
              </button>
            </div>

            {fieldError && <p className="form-message error">{fieldError}</p>}
            {successMessage && <p className="form-message">{successMessage}</p>}
            {errorMessage && (
              <p className="form-message error">{errorMessage}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddProperty;
