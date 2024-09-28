const express = require("express");
const mysql = require("mysql2");
const bodyParser = require("body-parser");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
require("dotenv").config();

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// MySQL connection pool
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  connectTimeout: 60000,
  idleTimeout: 2147483647,
});

app.get("/", (req, res) => {
  res.send("Hello World");
});
// API to handle form submission
app.post("/submit-form", (req, res) => {
  const { name, email, mobile, comment } = req.body;
  const query =
    "INSERT INTO contact_form (name, email, mobile, comment) VALUES (?, ?, ?, ?)";

  pool.getConnection((err, connection) => {
    if (err) {
      console.error("Error connecting to MySQL:", err);
      return res.status(500).send("Database connection error");
    }

    connection.query(query, [name, email, mobile, comment], (err, result) => {
      connection.release();

      if (err) {
        console.error("Error saving data:", err);
        res.status(500).send("Error saving data");
      } else {
        res.status(200).send("Data saved successfully");
      }
    });
  });
});

// API to handle property submission
app.post("/submit-property", (req, res) => {
  const { name, email, mobile, address } = req.body;
  const query =
    "INSERT INTO market_property (name, email, mobile,comment, address) VALUES (?, ?, ?, ?)";

  pool.getConnection((err, connection) => {
    if (err) {
      console.error("Error connecting to MySQL:", err);
      return res.status(500).send("Database connection error");
    }

    connection.query(query, [name, email, mobile, address], (err, result) => {
      connection.release();

      if (err) {
        console.error("Error inserting data:", err);
        res.status(500).send("Error storing data");
      } else {
        res.status(200).send("Data stored successfully");
      }
    });
  });
});

// API to handle other services form submission
app.post("/other-services", (req, res) => {
  const { name, email, mobile, serviceType } = req.body;

  const query =
    "INSERT INTO service_requests (name, email, mobile, service_type) VALUES (?, ?, ?, ?)";

  pool.getConnection((err, connection) => {
    if (err) {
      console.error("Error connecting to MySQL:", err);
      return res.status(500).send("Database connection error");
    }

    connection.query(
      query,
      [name, email, mobile, serviceType],
      (err, result) => {
        connection.release();

        if (err) {
          console.error("Error inserting data:", err);
          res.status(500).send("Error storing data");
        } else {
          res.status(200).send("Data stored successfully");
        }
      }
    );
  });
});

// API for login
app.post("/api/login", (req, res) => {
  const { username, password } = req.body;
  const query = "SELECT * FROM users WHERE username = ? AND password = ?";

  pool.getConnection((err, connection) => {
    if (err) {
      console.error("Error connecting to MySQL:", err);
      return res.status(500).send("Database connection error");
    }

    connection.query(query, [username, password], (err, results) => {
      connection.release();

      if (err) {
        console.error("Error during login query:", err);
        return res.status(500).json({ message: "Error checking credentials" });
      }

      if (results.length === 0) {
        return res
          .status(401)
          .json({ message: "Invalid username or password" });
      }

      const user = results[0];
      res.status(200).json({ message: "Login successful", user: user });
    });
  });
});

// Configure multer storage for image upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

// API to add property with image upload
app.post("/api/add-property", upload.single("image"), (req, res) => {
  const { name, location, price, description, sold_out } = req.body;
  const image = req.file ? `/uploads/${req.file.filename}` : null;

  const soldOutValue = sold_out === "true" || sold_out === true ? 1 : 0;

  const query =
    "INSERT INTO properties (name, location, price, description, image, sold_out) VALUES (?, ?, ?, ?, ?, ?)";

  pool.getConnection((err, connection) => {
    if (err) {
      console.error("Error connecting to MySQL:", err);
      return res.status(500).send("Database connection error");
    }

    connection.query(
      query,
      [name, location, price, description, image, soldOutValue],
      (err, result) => {
        connection.release();

        if (err) {
          console.error("Error adding property:", err);
          return res.status(500).json({ message: "Error adding property" });
        }

        res.status(200).json({ message: "Property added successfully" });
      }
    );
  });
});

app.put('/api/properties/:id', (req, res) => {
  const { id } = req.params;
  const { sold_out } = req.body;
  const soldOutValue = sold_out === true || sold_out === 'true' ? 1 : 0; // Convert boolean to 1 or 0

  const query = 'UPDATE properties SET sold_out = ? WHERE id = ?';

  pool.getConnection((err, connection) => {
    if (err) {
      console.error("Error connecting to MySQL:", err);
      return res.status(500).send("Database connection error");
    }

    connection.query(query, [soldOutValue, id], (err, result) => {
      connection.release();

      if (err) {
        console.error('Error updating property status:', err);
        return res.status(500).json({ message: 'Error updating property status' });
      }

      if (result.affectedRows === 0) {
        return res.status(404).json({ message: 'Property not found' });
      }

      res.status(200).json({ message: 'Property status updated successfully' });
    });
  });
});

app.delete('/api/properties/:id', (req, res) => {
  const { id } = req.params;
  const query = 'DELETE FROM properties WHERE id = ?';

  pool.getConnection((err, connection) => {
    if (err) {
      console.error("Error connecting to MySQL:", err);
      return res.status(500).send("Database connection error");
    }

    connection.query(query, [id], (err, result) => {
      connection.release();

      if (err) {
        console.error("Error deleting property:", err);
        return res.status(500).json({ message: "Error deleting property" });
      }

      if (result.affectedRows === 0) {
        return res.status(404).json({ message: "Property not found" });
      }

      res.status(200).json({ message: "Property deleted successfully" });
    });
  });
});


// API to view all properties
app.get("/api/view-properties", (req, res) => {
  const query = "SELECT * FROM properties";

  pool.getConnection((err, connection) => {
    if (err) {
      console.error("Error connecting to MySQL:", err);
      return res.status(500).send("Database connection error");
    }

    connection.query(query, (err, results) => {
      connection.release();

      if (err) {
        console.error("Error fetching properties:", err);
        return res.status(500).json({ message: "Error retrieving properties" });
      }

      res.status(200).json(results);
    });
  });
});

// API to fetch a specific property by ID
app.get("/api/property/:id", (req, res) => {
  const propertyId = req.params.id;
  const query = "SELECT * FROM properties WHERE id = ?";

  pool.getConnection((err, connection) => {
    if (err) {
      console.error("Error connecting to MySQL:", err);
      return res.status(500).send("Database connection error");
    }

    connection.query(query, [propertyId], (err, result) => {
      connection.release();

      if (err) {
        console.error("Error fetching property:", err);
        return res.status(500).send("Error fetching property");
      }

      if (result.length === 0) {
        return res.status(404).send("Property not found");
      }

      res.json(result[0]);
    });
  });
});

// API to handle enquiries
app.post("/api/enquiries", (req, res) => {
  const { propertyId, propertyName, name, email, mobile } = req.body;

  const query =
    "INSERT INTO enquiries (propertyId, propertyName, name, email, mobile) VALUES (?, ?, ?, ?, ?)";

  pool.getConnection((err, connection) => {
    if (err) {
      console.error("Error connecting to MySQL:", err);
      return res.status(500).send("Database connection error");
    }

    connection.query(
      query,
      [propertyId, propertyName, name, email, mobile],
      (err, result) => {
        connection.release();

        if (err) {
          console.error("Error saving enquiry:", err);
          return res.status(500).json({ error: "Failed to save enquiry" });
        }

        res.status(200).json({
          message: "Enquiry saved successfully",
          enquiryId: result.insertId,
        });
      }
    );
  });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
