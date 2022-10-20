import axios from "axios";
import { useEffect, useState } from "react";
import { BsMailbox } from "react-icons/bs";
import { FiPhoneCall } from "react-icons/fi";
import { GrMapLocation } from "react-icons/gr";

const App = () => {
  const url = "https://randomuser.me/api";
  const [user, setUser] = useState("");

  const getUser = async () => {
    const { data } = await axios(url);
    console.log(data.results[0]);
    setUser(data.results[0]);
  };

  useEffect(() => {
    getUser();
  }, []);

  const { name, dob, email, phone, picture, location, registered } = user;

  return (
    <div className="container">
      <div className="wrapper">
        <div className="name">
          <img src={picture?.large} alt={name?.first} />
          <p>
            {name?.title}. {name?.first} {name?.last}
          </p>
        </div>
        <div className="email">
          <BsMailbox size={44} />
          <p>{email}</p>
        </div>
        <div className="phone">
          <FiPhoneCall size={44} />
          <p> + {phone}</p>
        </div>
        <div className="location">
          <GrMapLocation size={44} />
          <p>
            {location?.city} & {location?.country}
          </p>
        </div>
        {/* <p className="age">Age : {dob?.age}</p> */}
        <p className="register">
          Register Date : {String(registered?.date).slice(0, 10).replaceAll("-", " / ")}
        </p>
      </div>
      <div className="btn">
        <button onClick={() => getUser()}>CHANGE USER</button>
      </div>
    </div>
  );
};

export default App;
