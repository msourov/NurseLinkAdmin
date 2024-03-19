import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { bedHelper } from "../actions/HelperFunctions";

const BedOptions = () => {
  const [bedOptions, setBedOptions] = useState([]);
  const token = useSelector((state) => state.login.token);
  useEffect(() => {
    const getBedOptions = async () => {
      const res = await bedHelper(token);
      res && setBedOptions(res.data);
    };

    getBedOptions();
  }, [token]);
  // bedOptions && console.log("bedOptions", bedOptions);
  const prepareBedOptions =
    bedOptions &&
    bedOptions.map((item) => ({
      value: item.uid,
      //   label: `${item.name} - ${item.bed_no}`,
      label: item.name,
    }));
  return prepareBedOptions;
};

export default BedOptions;
