import React, { useState } from "react";

const App = () => {
  const [formData, setFormData] = useState({
    concertId: "",
    name: "",
    email: "",
    phone: "",
    quantity: 1,
    creditCard: "",
    expiration: "",
    securityCode: "",
    address: "",
    city: "",
    province: "",
    postalCode: "",
    country: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.quantity < 1) return alert("Quantity must be at least 1.");
    try {
      const res = await fetch("https://nscc-0490105-tickethub-fvctc9f5dweyagft.canadacentral-01.azurewebsites.net/api/tickets", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) alert("✅ Ticket submitted successfully!");
      else alert("❌ Submission failed.");
    } catch {
      alert("Error occurred while submitting.");
    }
  };

  return (
    <div style={styles.wrapper}>
      <div style={styles.formContainer}>
        <h1 style={styles.title}>🎟️ Concert Ticket Booking</h1>
        <p style={styles.subtitle}>Please complete the form to book your tickets.</p>

        <form onSubmit={handleSubmit}>
          <div style={styles.grid}>
            <FormField label="Concert ID" name="concertId" value={formData.concertId} onChange={handleChange} />
            <FormField label="Quantity" name="quantity" type="number" min="1" value={formData.quantity} onChange={handleChange} />
            <FormField label="Name" name="name" value={formData.name} onChange={handleChange} />
            <FormField label="Phone" name="phone" value={formData.phone} onChange={handleChange} />
            <FormField label="Email" name="email" value={formData.email} onChange={handleChange} />
            <FormField label="Address" name="address" value={formData.address} onChange={handleChange} />
            <FormField label="City" name="city" value={formData.city} onChange={handleChange} />
            <FormField label="Province" name="province" value={formData.province} onChange={handleChange} />
            <FormField label="Postal Code" name="postalCode" value={formData.postalCode} onChange={handleChange} />
            <FormField label="Country" name="country" value={formData.country} onChange={handleChange} />
          </div>

          <h2 style={styles.sectionTitle}>💳 Payment Info</h2>
          <div style={styles.grid}>
            <FormField label="Credit Card" name="creditCard" value={formData.creditCard} onChange={handleChange} />
            <FormField label="Expiration (MM/YY)" name="expiration" value={formData.expiration} onChange={handleChange} />
            <FormField label="Security Code" name="securityCode" value={formData.securityCode} onChange={handleChange} />
          </div>

          <button type="submit" style={styles.submitButton}>
            Submit Ticket 🎫
          </button>
        </form>
      </div>
    </div>
  );
};

const FormField = ({ label, name, ...props }) => (
  <div style={{ display: "flex", flexDirection: "column" }}>
    <label htmlFor={name} style={styles.label}>{label}</label>
    <input
      id={name}
      name={name}
      {...props}
      style={styles.input}
    />
  </div>
);

// Inline Styles
const styles = {
  wrapper: {
    backgroundColor: "#fef08a", // light yellow
    minHeight: "100vh",
    padding: "40px 20px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  formContainer: {
    backgroundColor: "#fff",
    padding: "40px",
    borderRadius: "16px",
    maxWidth: "960px",
    width: "100%",
    boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
  },
  title: {
    fontSize: "32px",
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: "8px",
    color: "#ca8a04", // golden-yellow
  },
  subtitle: {
    textAlign: "center",
    fontSize: "14px",
    color: "#555",
    marginBottom: "32px",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "24px",
    marginBottom: "32px",
  },
  sectionTitle: {
    fontSize: "20px",
    fontWeight: "600",
    color: "#ca8a04",
    marginBottom: "16px",
    borderTop: "1px solid #eee",
    paddingTop: "20px",
  },
  label: {
    fontSize: "14px",
    marginBottom: "6px",
    color: "#333",
    fontWeight: "500",
  },
  input: {
    padding: "10px 12px",
    border: "1px solid #ccc",
    borderRadius: "6px",
    fontSize: "14px",
  },
  submitButton: {
    marginTop: "20px",
    width: "100%",
    backgroundColor: "#facc15",
    color: "#000",
    padding: "14px",
    fontSize: "16px",
    fontWeight: "bold",
    borderRadius: "8px",
    border: "none",
    cursor: "pointer",
  },
};

export default App;
