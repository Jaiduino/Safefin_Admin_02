import React, { useState } from "react";

const MyComponent = () => {
  const [formData, setFormData] = useState({
    user: {
      name: "",
      email: "",
      address: {
        street: "",
        city: "",
        zip: "",
      },
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("https://your-api-endpoint.com", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        console.log("Data posted successfully");
        // Handle success, e.g., show a success message
      } else {
        console.error("Failed to post data");
        // Handle error, e.g., show an error message
      }
    } catch (error) {
      console.error("Error:", error);
      // Handle error, e.g., show an error message
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      user: {
        ...prevData.user,
        address: {
          ...prevData.user.address,
          [name]: value,
        },
      },
    }));
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name:
        <input
          type="text"
          name="name"
          value={formData.user.name}
          onChange={(e) =>
            setFormData({
              ...formData,
              user: { ...formData.user, name: e.target.value },
            })
          }
        />
      </label>
      <label>
        Email:
        <input
          type="text"
          name="email"
          value={formData.user.email}
          onChange={(e) =>
            setFormData({
              ...formData,
              user: { ...formData.user, email: e.target.value },
            })
          }
        />
      </label>
      <label>
        Street:
        <input
          type="text"
          name="street"
          value={formData.user.address.street}
          onChange={handleInputChange}
        />
      </label>
      <label>
        City:
        <input
          type="text"
          name="city"
          value={formData.user.address.city}
          onChange={handleInputChange}
        />
      </label>
      <label>
        Zip:
        <input
          type="text"
          name="zip"
          value={formData.user.address.zip}
          onChange={handleInputChange}
        />
      </label>
      <button type="submit">Submit</button>
    </form>
  );
};

export default MyComponent;
