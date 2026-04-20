import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const DealerDetails = () => {
  const { id } = useParams();
  const [dealer, setDealer] = useState(null);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const loadDetails = async () => {
      const response = await fetch(`/djangoapp/dealer/${id}`);
      const data = await response.json();
      setDealer(data.dealer);
      setReviews(data.reviews || []);
    };
    loadDetails();
  }, [id]);

  return (
    <div className="container mt-4">
      {dealer && (
        <>
          <h2>{dealer.full_name}</h2>
          <p>{dealer.address}, {dealer.city}, {dealer.state}</p>
        </>
      )}

      <h3 className="mt-4">Reviews</h3>
      <div className="row">
        {reviews.map((review, index) => (
          <div className="col-md-6 mb-3" key={index}>
            <div className="card shadow-sm">
              <div className="card-body">
                <h5 className="card-title">{review.name}</h5>
                <p className="card-text">{review.review}</p>
                <p className="card-text">
                  <small className="text-muted">
                    Purchase: {review.purchase ? "Yes" : "No"}
                  </small>
                </p>
                {review.car_make && (
                  <p className="card-text">
                    {review.car_year} {review.car_make} {review.car_model}
                  </p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DealerDetails;
