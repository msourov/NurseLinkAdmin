import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { remoteHelper } from "../actions/HelperFunctions";

const RemoteOptions = () => {
  const [remoteOptions, setRemoteOptions] = useState([]);
  const token = useSelector((state) => state.login.token);
  useEffect(() => {
    const getRemoteOptions = async () => {
      const res = await remoteHelper(token);
      res && setRemoteOptions(res.data);
    };

    getRemoteOptions();
  }, [token]);
  //   remoteOptions && console.log("remoteOptions", remoteOptions);
  const prepareRemoteOptions =
    remoteOptions &&
    remoteOptions.map((item) => ({
      value: item.mak_id,
      label: item.name,
    }));
  return prepareRemoteOptions;
};

export default RemoteOptions;
