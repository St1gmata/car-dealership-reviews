import React, { useEffect, useState } from "react";

const Dealers = () => {
  const [dealers, setDealers] = useState([]);
  const [state, setState] = useState("All");
  const username = sessionStorage.getItem("username");

  const fetchDealers = async (selectedState = "All") => {
    let url = "/djangoapp/get_dealers";
    if (selectedState !== "All") {
      url = `/djangoapp/get_dealers/${selectedState}`;
    }
    const response = await fetch(url);
    const data = await response.json();
    setDealers(data.dealers || []);
  };

  useEffect(() => {
    fetchDealers();
  }, []);

  return (
    <div className="container mt-4">
      <h2>Dealerships</h2>

      <div className="mb-3">
        <label className="form-label">Filter by State</label>
        <select
          className="form-select"
          value={state}
          onChange={(e) => {
            setState(e.target.value);
            fetchDealers(e.target.value);
          }}
        >
          <option value="All">Show all</option>
          <option value="Kansas">Kansas</option>
          <option value="California">California</option>
          <option value="Texas">Texas</option>
          <option value="New York">New York</option>
        </select>
      </div>

      <table className="table table-bordered table-striped">
        <thead>
          <tr>
            <th>Dealer Name</th>
            <th>City</th>
            <th>State</th>
            <th>Address</th>
            <th>Details</th>
            {username && <th>Review</th>}
          </tr>
        </thead>
        <tbody>
          {dealers.map((dealer) => (
            <tr key={dealer.id}>
              <td>{dealer.full_name}</td>
              <td>{dealer.city}</td>
              <td>{dealer.state}</td>
              <td>{dealer.address}</td>
              <td>
                <a className="btn btn-info btn-sm" href={`/dealer/${dealer.id}`}>
                  View
                </a>
              </td>
              {username && (
                <td>
                  <a className="btn btn-primary btn-sm" href={`/add-review/${dealer.id}`}>
                    Review Dealer
                  </a>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Dealers;
