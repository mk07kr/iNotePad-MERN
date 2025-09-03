import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Notes from "./notes";

const Home = (props) => {
  const { showAlert } = props;
  const navigate = useNavigate();

  useEffect(() => {
    // Check if token exists, if not redirect to login
    const token = localStorage.getItem("token");
    if (!token) {
      showAlert("Please log in to view your notes.", "warning");
      navigate("/login");
    }
  }, [navigate, showAlert]);

  return (
    <div>
      <h6>Welcome</h6>
     <Notes showAlert={showAlert} />
          </div>
  );
};

export default Home;
