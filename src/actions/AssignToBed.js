import { message } from "antd";
import api from "./api";

export const AssignPatient = async ({ editUid, patient_uid, token }) => {
  try {
    const res = await api(token).put("v1/margaret/bed/patient/assign", {
      uid: editUid,
      patient_uid: patient_uid,
    });
    if (res.status === 201) {
      message.success(res.data.message);
      return res;
    }
  } catch (error) {
    message.error(error?.response?.data?.message);
    console.error(error);
    throw error;
  }
};

export const AssignDoctor = async ({ token, editUid, doctor_uid }) => {
  try {
    const res = await api(token).put("v1/margaret/bed/doctor/assign", {
      uid: editUid,
      doctor_uid: doctor_uid,
    });
    if (res.status === 201) {
      message.success(res.data.message);
      return res;
    }
  } catch (error) {
    message.error(error?.response?.data?.message);
    console.error(error);
    throw error;
  }
};
export const AssignNurse = async ({ token, editUid, nurse_uid }) => {
  try {
    const res = await api(token).put("v1/margaret/bed/nurse/assign", {
      uid: editUid,
      nurse_uid: nurse_uid,
    });
    if (res.status === 201) {
      message.success(res.data.message);
      return res;
    }
  } catch (error) {
    message.error(error?.response?.data?.message);
    console.error(error);
    throw error;
  }
};
export const AssignRemote = async ({ token, editUid, mak_id }) => {
  try {
    const res = await api(token).put("v1/margaret/bed/mak/assign", {
      uid: editUid,
      mak_id: mak_id,
    });
    if (res.status === 201) {
      message.success(res.data.message);
      return res;
    }
  } catch (error) {
    message.error(error?.response?.data?.message);
    console.error(error);
    throw error;
  }
};
