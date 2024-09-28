import React, { useState, useEffect } from "react";
import axios from "axios";
import "./ViewProperty.css"; // Make sure the CSS contains grid styling
import { Link } from "react-router-dom";
import { BACKEND_URL } from "../../utils/constant";

const ViewProperty = () => {
  const [properties, setProperties] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const propertiesPerPage = 8;

  // Fetch properties from the backend
  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await axios.get(`${BACKEND_URL}/api/view-properties`);
        setProperties(response.data);
      } catch (error) {
        console.error("Error fetching properties:", error);
      }
    };
    fetchProperties();
  }, []);

  // Pagination logic
  const indexOfLastProperty = currentPage * propertiesPerPage;
  const indexOfFirstProperty = indexOfLastProperty - propertiesPerPage;
  const currentProperties = properties.slice(
    indexOfFirstProperty,
    indexOfLastProperty
  );

  const totalPages = Math.ceil(properties.length / propertiesPerPage);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Toggle property status
  const toggleStatus = (id, index) => {
    console.log("Property ID to update:", id);
    // Create a copy of properties
    const updatedProperties = [...properties];

    // Toggle the 'sold_out' status
    updatedProperties[index].sold_out = !updatedProperties[index].sold_out;

    // Update the state with the modified properties array
    setProperties(updatedProperties);

    // Send a PUT request to update the status in the backend
    axios
      .put(`http://localhost:5000/api/properties/${id}`, {
        sold_out: updatedProperties[index].sold_out,
      })
      .then((response) => {
        console.log("Property status updated successfully.");
      })
      .catch((error) => {
        console.error("Error updating property status:", error);
      });
  };

  return (
    <div className="view-properties-container">
      <h2 className="featured-heading">Featured Properties</h2>
      <div className="property-grid">
        {currentProperties.length > 0 ? (
          currentProperties.map((property, index) => (
            <div key={index} className="property-card">
              <div className="property-image-container">
                <img
                  src={`${BACKEND_URL}${
                    property.image || "/assets/default-property.jpg"
                  }`}
                  alt={property.name}
                  className="property-image"
                />
              </div>
              <div className="property-content">
                <h3>{property.name}</h3>
                <p>
                  <strong>Location:</strong> {property.location}
                </p>
                <p>
                  <strong>Price:</strong> {property.price}
                </p>
                <p>{property.description.slice(0, 100)}</p>
                {property.sold_out ? (
                  <p className="sold-out">Sold Out</p>
                ) : (
                  <p className="available">Available</p>
                )}

                {/* Change Status Button */}
                <button
                  className="change-status-btn"
                  onClick={() => toggleStatus(property.id, index)}
                >
                  Change Status
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>No properties available</p>
        )}
      </div>

      {/* Pagination */}
      <div className="pagination">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            className={`pagination-btn ${
              currentPage === index + 1 ? "active" : ""
            }`}
            onClick={() => paginate(index + 1)}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ViewProperty;
