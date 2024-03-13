import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { nurseHelper } from "../actions/HelperFunctions";

const NurseOptions = () => {
  const [nurseOptions, setNurseOptions] = useState([]);
  const token = useSelector((state) => state.login.token);
  useEffect(() => {
    const getNurseOptions = async () => {
      const res = await nurseHelper(token);
      res && setNurseOptions(res.data);
    };

    getNurseOptions();
  }, [token]);
  nurseOptions && console.log("nurseOptions", nurseOptions);
  const prepareNurseOptions =
    nurseOptions &&
    nurseOptions.map((item) => ({
      value: item.uid,
      //   label: `${item.name} - ${item.nurse_no}`,
      label: item.name,
    }));
  return prepareNurseOptions;
};

export default NurseOptions;
