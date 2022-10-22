import axios from "axios";
import { useEffect, useState } from "react";
import { BsMailbox } from "react-icons/bs";
import { FiPhoneCall } from "react-icons/fi";
import { GoLocation } from "react-icons/go";
import spinner from "./loading.gif";

const App = () => {
  const url = "https://randomuser.me/api";
  const [user, setUser] = useState("");
  const [loading, setLoading] = useState(true);

  const getUser = async () => {
    try {
      const { data } = await axios(url);
      console.log(data.results[0]);
      setUser(data.results[0]);
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(true);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  // loading && <h1>Loading...</h1>
  if (loading) {
    return (
      <div className="load">
        <img src={spinner} alt="" />
        <h1>Loading..</h1>
      </div>
    );
  }

  const { name, email, phone, picture, location, registered } = user;

  return (
    <div className="container">
      <div className="wrapper">
        <div className="name">
          <img src={picture?.large} alt={name?.first} />
          <p className="fullname" style={{ padding: "1.5rem" }}>
            {name?.title}. {name?.first} {name?.last}
          </p>
        </div>
        <div className="email">
          <span>
            <BsMailbox size={44} />
          </span>
          <p>{email}</p>
        </div>
        <div className="phone">
          <FiPhoneCall size={44} />
          <p> + {phone}</p>
        </div>
        <div className="location">
          <GoLocation size={44} />
          <p>
            {location?.city} & {location?.country}
          </p>
        </div>
        {/* <p className="age">Age : {dob?.age}</p> */}
        <p className="register">
          Register Date :{" "}
          {String(registered?.date).slice(0, 10).replaceAll("-", " / ")}
        </p>
      </div>
      <div className="btn">
        <button onClick={() => getUser()}>CHANGE USER</button>
      </div>
    </div>
  );
};

export default App;
