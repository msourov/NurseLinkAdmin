import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { patientHelper } from "../actions/HelperFunctions";

const PatientOptions = () => {
  const [patientOptions, setPatientOptions] = useState([]);
  const token = useSelector((state) => state.login.token);
  useEffect(() => {
    const getPatientOptions = async () => {
      const res = await patientHelper(token);
      res && setPatientOptions(res.data);
    };

    getPatientOptions();
  }, [token]);
  //   patientOptions && console.log("patientOptions", patientOptions);
  const preparePatientOptions =
    patientOptions &&
    patientOptions.map((item) => ({
      value: item.uid,
      label: item.name,
    }));
  return preparePatientOptions;
};

export default PatientOptions;
