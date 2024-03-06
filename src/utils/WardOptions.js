import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { wardHelper } from "../actions/WardHelper";

const WardOptions = () => {
  const [wardOptions, setWardOptions] = useState([]);
  const token = useSelector((state) => state.login.token);
  useEffect(() => {
    const getWardOptions = async () => {
      const res = await wardHelper(token);
      res && setWardOptions(res.data);
    };

    getWardOptions();
  }, [token]);
  //   wardOptions && console.log("wardOptions", wardOptions);
  const prepareWardOptions =
    wardOptions &&
    wardOptions.map((item) => ({
      value: item.uid,
      label: item.name,
    }));
  return prepareWardOptions;
};

export default WardOptions;
