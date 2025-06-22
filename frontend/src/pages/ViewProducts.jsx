import React, { useEffect, useState } from "react";
import axios from "axios";

const ViewProducts = () => {
  const [products, setProducts] = useState([]);
  const [role, setRole] = useState(null);
  const token = localStorage.getItem("token");
  console.log(token,"LLLLL")

  useEffect(() => {
    const storedRole = localStorage.getItem("role");
    setRole(storedRole);
    console.log("Role from localStorage:", storedRole);
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      if (!role) return;

      try {
        const response = await axios.get("http://localhost:4000/product/getproduct", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setProducts(response.data); 
      } catch (error) {
        console.error("Error fetching products:", error);
        alert("Failed to load products.");
      }
    };

    fetchProducts();
  }, [role, token]);

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>📦 View Products</h2>
      {products.length === 0 ? (
        <p style={styles.noData}>No products found.</p>
      ) : (
        <div style={styles.grid}>
          {products.map((product, index) => (
            <div key={index} style={styles.card}>
              <h3 style={styles.title}>{product.name}</h3>
              <p><strong>Type:</strong> {product.type}</p>
              <p><strong>Price:</strong> ₹{product.price}</p>
              {role?.toLowerCase() === "admin" && (
                <p><strong>Added By:</strong> {product.user_id?.name || product.user_id?.email}</p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    padding: "40px",
    fontFamily: "sans-serif",
  },
  heading: {
    textAlign: "center",
    fontSize: "28px",
    marginBottom: "30px",
    color: "#333",
  },
  noData: {
    textAlign: "center",
    fontSize: "18px",
    color: "#777",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
    gap: "20px",
  },
  card: {
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
    backgroundColor: "#fff",
    transition: "transform 0.2s ease",
  },
  title: {
    marginBottom: "10px",
    color: "#007bff",
  },
};

export default ViewProducts;