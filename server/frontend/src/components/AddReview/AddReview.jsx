import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const AddReview = () => {
  const { dealerId } = useParams();

  const [cars, setCars] = useState([]);
  const [formData, setFormData] = useState({
    review: "",
    purchase: false,
    purchase_date: "",
    car_make: "",
    car_model: "",
    car_year: ""
  });

  useEffect(() => {
    const getCars = async () => {
      const response = await fetch("/djangoapp/get_cars");
      const data = await response.json();
      setCars(data.CarModels || []);
    };
    getCars();
  }, []);

  const selectedMake = cars.find((c) => c.name === formData.car_make);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      dealership: parseInt(dealerId),
      review: formData.review,
      purchase: formData.purchase,
      purchase_date: formData.purchase_date,
      car_make: formData.car_make,
      car_model: formData.car_model,
      car_year: formData.car_year
    };

    const response = await fetch("/djangoapp/add_review", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    });

    if (response.ok) {
      window.location.href = `/dealer/${dealerId}`;
    } else {
      alert("Failed to submit review");
    }
  };

  return (
    <div className="container mt-4">
      <h2>Post a Review</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Review</label>
          <textarea
            className="form-control"
            rows="4"
            value={formData.review}
            onChange={(e) => setFormData({ ...formData, review: e.target.value })}
            required
          />
        </div>

        <div className="form-check mb-3">
          <input
            type="checkbox"
            className="form-check-input"
            checked={formData.purchase}
            onChange={(e) => setFormData({ ...formData, purchase: e.target.checked })}
          />
          <label className="form-check-label">Purchased a car?</label>
        </div>

        {formData.purchase && (
          <>
            <div className="mb-3">
              <label className="form-label">Purchase Date</label>
              <input
                type="date"
                className="form-control"
                value={formData.purchase_date}
                onChange={(e) => setFormData({ ...formData, purchase_date: e.target.value })}
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Car Make</label>
              <select
                className="form-select"
                value={formData.car_make}
                onChange={(e) => setFormData({ ...formData, car_make: e.target.value, car_model: "" })}
              >
                <option value="">Select Make</option>
                {cars.map((make) => (
                  <option key={make.id} value={make.name}>{make.name}</option>
                ))}
              </select>
            </div>

            <div className="mb-3">
              <label className="form-label">Car Model</label>
              <select
                className="form-select"
                value={formData.car_model}
                onChange={(e) => setFormData({ ...formData, car_model: e.target.value })}
              >
                <option value="">Select Model</option>
                {selectedMake?.models?.map((model) => (
                  <option key={model.id} value={model.name}>{model.name}</option>
                ))}
              </select>
            </div>

            <div className="mb-3">
              <label className="form-label">Car Year</label>
              <input
                type="number"
                className="form-control"
                value={formData.car_year}
                onChange={(e) => setFormData({ ...formData, car_year: e.target.value })}
              />
            </div>
          </>
        )}

        <button className="btn btn-success" type="submit">Submit Review</button>
      </form>
    </div>
  );
};

export default AddReview;
