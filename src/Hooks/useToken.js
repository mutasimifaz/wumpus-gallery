import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
const useToken = (user) => {
  const [token, setToken] = useState("");
  const [userData, setUserData] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    const email = user?.user?.email;
    const name = user?.user?.displayName || user?.user?.name;
    if (name) {
      navigate("/");
    }
    const photo =
      user?.user?.photoURL || "https://i.ibb.co/Vv2MQFg/user-profile.png";
    const currentUser = {
      email: email,
      user_name: name || user?.user?.displayName,
      photo: photo,
    };

    if (email) {
      fetch(`https://wumpus-gallery-server.onrender.com/user/${email}`, {
        method: "PUT",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(currentUser),
      })
        .then((res) => res.json())
        .then((data) => {
          const accessToken = data.token;
          localStorage.setItem("accessToken", accessToken);
          setToken(accessToken);
          setUserData(data);
        })
        .finally(() => {
          // navigate("/");
        });
    }
  }, [user, userData, navigate]);
  return [token];
};

export default useToken;
