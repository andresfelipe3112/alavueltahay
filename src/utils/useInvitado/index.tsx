import { useState, useEffect, useContext } from "react";
import StoreContext from "../../helpers/globalStates";
import Storage from "../../helpers/localStorage";

const userInvitadData = () => {
  const [data, setData] = useState(true);
  const { user, setUser } = useContext(StoreContext.UserContext);

  let fun = async () => {
    let a = await Storage.getItem("_USER_LOGGED");
    if (user.email === "usuario-invitado@alavueltahay.cl" && user.id === 53) {
      setData(false);
    } else {
      setData(true);
    }
  };

  useEffect(() => {
    fun();
  }, []);

  return [data, fun];
};

export default userInvitadData;
