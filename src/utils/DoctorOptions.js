import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { doctorHelper } from "../actions/HelperFunctions";

const DoctorOptions = () => {
  const [doctorOptions, setDoctorOptions] = useState([]);
  const token = useSelector((state) => state.login.token);
  useEffect(() => {
    const getDoctorOptions = async () => {
      const res = await doctorHelper(token);
      res && setDoctorOptions(res.data);
    };

    getDoctorOptions();
  }, [token]);
  //   doctorOptions && console.log("doctorOptions", doctorOptions);
  const prepareDoctorOptions =
    doctorOptions &&
    doctorOptions.map((item) => ({
      value: item.uid,
      //   label: `${item.name} - ${item.doctor_no}`,
      label: item.name,
    }));
  return prepareDoctorOptions;
};

export default DoctorOptions;
