import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { floorHelper } from "../actions/HelperFunctions";

const FloorOptions = () => {
  const [floorOptions, setFloorOptions] = useState([]);
  const token = useSelector((state) => state.login.token);
  useEffect(() => {
    const getFloorOptions = async () => {
      const res = await floorHelper(token);
      res && setFloorOptions(res.data);
    };

    getFloorOptions();
  }, [token]);
  // floorOptions && console.log("floorOptions", floorOptions);
  const prepareFloorOptions =
    floorOptions &&
    floorOptions.map((item) => ({
      value: item.uid,
      label: `${item.name} - ${item.floor_no}`,
    }));
  return prepareFloorOptions;
};

export default FloorOptions;
