import {
  Button,
  Checkbox,
  Col,
  DatePicker,
  Form,
  Input,
  Layout,
  Popconfirm,
  Row,
  Select,
  Switch,
} from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createFloor } from "../features/floorSlice";
import { createWard, fetchWard } from "../features/wardSlice";
import FloorOptions from "../utils/FloorOptions";
import { useForm } from "antd/es/form/Form";
import WardOptions from "../utils/WardOptions";
import { createBed } from "../features/bedSlice";
import PatientOptions from "../utils/PatientOptions";
import { AssignPatient } from "../actions/AssignToBed";
import DoctorOptions from "../utils/DoctorOptions";
import NurseOptions from "../utils/NurseOptions";
import RemoteOptions from "../utils/RemoteOptions";
import { createDoctor } from "../features/doctorSlice";
import { createPatient } from "../features/patientSlice";
import dayjs from "dayjs";

export const CreateFloor = ({ onCloseModal }) => {
  const token = useSelector((state) => state.login.token);
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const layout = {
    labelCol: {
      span: 8,
    },
    wrapperCol: {
      span: 16,
    },
  };
  const onFinish = async ({ name, floor_no, active }) => {
    const res = await dispatch(createFloor({ token, name, floor_no, active }));
    onCloseModal();
  };
  return (
    <Form
      form={form}
      {...layout}
      name="nest-messages"
      onFinish={onFinish}
      style={{
        maxWidth: 600,
        marginRight: "5em",
        marginTop: "2em",
        display: "flex",
        flexDirection: "column",
      }}
      // align="left"
      // validateMessages={validateMessages}
    >
      {/* name, floor_no, active, uid */}
      <Form.Item
        name={["name"]}
        label="Name"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name={["floor_no"]}
        label="Floor Number"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item name="active" label="Active">
        <Switch
          checkedChildren="true"
          unCheckedChildren="false"
          // onChange={onSwitchChange}
          style={{ boxShadow: "none", borderColor: "#d9d9d9" }}
        />
      </Form.Item>
      <Form.Item
        wrapperCol={{
          ...layout.wrapperCol,
          offset: 8,
        }}
      >
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export const EditFloor = ({ onEditFloor, initialValues }) => {
  const [form] = Form.useForm();
  const layout = {
    labelCol: {
      span: 8,
    },
    wrapperCol: {
      span: 16,
    },
  };

  useEffect(() => {
    initialValues &&
      form.setFieldsValue({
        name: initialValues.name || "",
        floor_no: initialValues.floor_no || "",
        active: initialValues.active || false,
        uid: initialValues.uid || "",
      });
  }, []);

  const onFinish = (values) => {
    onEditFloor(values);
  };
  return (
    <Form
      form={form}
      {...layout}
      name="nest-messages"
      onFinish={onFinish}
      style={{
        maxWidth: 600,
        marginRight: "5em",
        marginTop: "2em",
        display: "flex",
        flexDirection: "column",
      }}
      // align="left"
      // validateMessages={validateMessages}
    >
      {/* name, floor_no, active, uid */}
      <Form.Item
        name={["name"]}
        label="Name"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name={["floor_no"]}
        label="Floor Number"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item name="active" label="Active">
        <Switch
          checkedChildren="true"
          unCheckedChildren="false"
          // onChange={onSwitchChange}
          style={{ boxShadow: "none", borderColor: "#d9d9d9" }}
        />
      </Form.Item>
      <Form.Item
        hidden
        name={["uid"]}
        label="UID"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        wrapperCol={{
          ...layout.wrapperCol,
          offset: 8,
        }}
      >
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export const CreateWard = ({ onCloseModal }) => {
  const [floorOptions, setFloorOptions] = useState([]);
  const token = useSelector((state) => state.login.token);
  const [form] = Form.useForm();
  const dispatch = useDispatch();

  const layout = {
    labelCol: {
      span: 8,
    },
    wrapperCol: {
      span: 16,
    },
  };

  // useEffect(() => {
  //   const fetchoptions = async () => {
  //     const res = await FloorOptions();
  //     setFloorOptions(res);
  //   };

  //   fetchoptions();
  // }, [onCloseModal]);
  const options = FloorOptions();
  const onFinish = async ({ name, floor_uid, active }) => {
    const res = await dispatch(createWard({ token, name, floor_uid, active }));
    onCloseModal();
  };
  return (
    <Form
      form={form}
      {...layout}
      name="nest-messages"
      onFinish={onFinish}
      style={{
        maxWidth: 600,
        marginRight: "5em",
        marginTop: "2em",
        display: "flex",
        flexDirection: "column",
      }}
      // align="left"
      // validateMessages={validateMessages}
    >
      {/* name, floor_no, active, uid */}
      <Form.Item
        name={["name"]}
        label="Name"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name={["floor_uid"]}
        label="Floor Uid"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Select style={{ width: 120 }} options={options} />
      </Form.Item>
      <Form.Item name="active" label="Active">
        <Switch
          checkedChildren="true"
          unCheckedChildren="false"
          // onChange={onSwitchChange}
          style={{ boxShadow: "none", borderColor: "#d9d9d9" }}
        />
      </Form.Item>
      <Form.Item
        wrapperCol={{
          ...layout.wrapperCol,
          offset: 8,
        }}
      >
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export const EditWard = ({ onEditSubmit, initialVal }) => {
  const [form] = Form.useForm();
  const layout = {
    labelCol: {
      span: 8,
    },
    wrapperCol: {
      span: 16,
    },
  };
  const floorOptions = FloorOptions();
  useEffect(() => {
    initialVal &&
      form.setFieldsValue({
        name: initialVal.name || "",
        floor: initialVal.floor_uid || "",
        active: initialVal.active || false,
        uid: initialVal.uid || "",
      });
  }, [initialVal, form]);

  const onFinish = (values) => {
    const obj = {
      name: values.name,
      floor_uid: values.floor,
      uid: values.uid,
      active: values.active,
    };
    onEditSubmit(obj);
  };
  return (
    <Form
      form={form}
      {...layout}
      name="nest-messages"
      onFinish={onFinish}
      style={{
        maxWidth: 600,
        marginRight: "5em",
        marginTop: "2em",
        display: "flex",
        flexDirection: "column",
      }}
      // align="left"
      // validateMessages={validateMessages}
    >
      {/* name, floor_no, active, uid */}
      <Form.Item
        name={["name"]}
        label="Name"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name={["floor"]}
        label="Floor"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Select style={{ width: 120 }} options={floorOptions} />
      </Form.Item>
      <Form.Item name="active" label="Active">
        <Switch
          checkedChildren="true"
          unCheckedChildren="false"
          // onChange={onSwitchChange}
          style={{ boxShadow: "none", borderColor: "#d9d9d9" }}
        />
      </Form.Item>
      <Form.Item
        hidden
        name={["uid"]}
        label="UID"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        wrapperCol={{
          ...layout.wrapperCol,
          offset: 8,
        }}
      >
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};
export const CreateBed = ({ onCloseModal }) => {
  const [allWards, setAllWards] = useState([]);
  const [sameFloorWards, setSameFloorWards] = useState([]);
  const token = useSelector((state) => state.login.token);
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  useEffect(() => {
    const getAllWards = async () => {
      try {
        const res = await dispatch(fetchWard(token));
        setAllWards(res.payload.data);
      } catch (error) {
        console.error("Error fetching wards:", error);
      }
    };
    getAllWards();
  }, [dispatch, token]);
  const handleFloorSelect = (floorUid) => {
    const getSameFloorWards = (floorUid) => {
      const sameFloorWards = allWards.filter(
        (item) => item.floor_uid === floorUid
      );
      return sameFloorWards.map((item) => ({
        label: item.name,
        value: item.uid,
      }));
    };
    setSameFloorWards(getSameFloorWards(floorUid));
  };
  const handleWardSelect = (value) => {
    // console.log("inside handlewards", value);
  };

  const layout = {
    labelCol: {
      span: 8,
    },
    wrapperCol: {
      span: 16,
    },
  };

  const onFinish = async (values) => {
    try {
      await dispatch(createBed({ token, values }));
      onCloseModal();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Form
      form={form}
      {...layout}
      name="nest messages"
      onFinish={onFinish}
      style={{
        maxWidth: 600,
        marginRight: "5em",
        marginTop: "2em",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Form.Item
        name={["floor_uid"]}
        label="Select Floor"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Select
          defaultValue=""
          style={{ width: 120 }}
          onChange={handleFloorSelect}
          options={FloorOptions()}
        ></Select>
      </Form.Item>
      <Form.Item
        name={["ward_uid"]}
        label="Select Ward"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Select
          style={{ width: 120 }}
          onChange={handleWardSelect}
          options={sameFloorWards}
        ></Select>
      </Form.Item>
      <Form.Item
        name={["name"]}
        label="Bed"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item name="active" label="Active">
        <Switch
          checkedChildren="true"
          unCheckedChildren="false"
          // onChange={onSwitchChange}
          style={{ boxShadow: "none", borderColor: "#d9d9d9" }}
        />
      </Form.Item>
      <Form.Item
        wrapperCol={{
          ...layout.wrapperCol,
          offset: 8,
        }}
      >
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export const EditBed = ({ onEditBed, initialVal }) => {
  const [allWards, setAllWards] = useState([]);
  const [sameFloorWards, setSameFloorWards] = useState([]);
  const token = useSelector((state) => state.login.token);
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const layout = {
    labelCol: {
      span: 8,
    },
    wrapperCol: {
      span: 16,
    },
  };

  useEffect(() => {
    const getAllWards = async () => {
      try {
        const res = await dispatch(fetchWard(token));
        setAllWards(res.payload.data);
      } catch (error) {
        console.error("Error fetching wards:", error);
      }
    };
    getAllWards();
  }, [dispatch, token, sameFloorWards]);
  // console.log("allWards", allWards);
  // const handleFloorSelect = (floorUid) => {
  //   const getSameFloorWards = (floorUid) => {
  //     const sameFloorWards = allWards.filter(
  //       (item) => item.floor_uid === floorUid
  //     );
  //     return sameFloorWards.map((item) => ({
  //       label: item.name,
  //       value: item.uid,
  //     }));
  //   };
  //   setSameFloorWards(getSameFloorWards(floorUid));
  // };

  const handleFloorSelect = (floorUid) => {
    const filteredWards = allWards.filter(
      (item) => item.floor_uid === floorUid
    );
    setSameFloorWards(
      filteredWards.map((item) => ({ label: item.name, value: item.uid }))
    );
    form.resetFields(["ward_uid"]);
  };

  console.log("render tracker");
  useEffect(() => {
    initialVal &&
      form.setFieldsValue({
        name: initialVal.name || "",
        floor_uid: initialVal.floor.floorLabel || "",
        active: initialVal.active || false,
        ward_uid: initialVal.ward.wardLabel || "",
      });
  }, [initialVal, form]);

  const onFinish = async (values) => {
    // try {
    //   await dispatch(createBed({ token, values }));
    //   onCloseModal();
    // } catch (error) {
    //   console.error(error);
    // }
    // const obj = {}
    onEditBed(values);
  };
  const handleWardSelect = (wardUid) => {
    // console.log("wardUid", wardUid);
  };

  return (
    <Form
      form={form}
      {...layout}
      name="nest messages"
      onFinish={onFinish}
      style={{
        maxWidth: 600,
        marginRight: "5em",
        marginTop: "2em",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Form.Item
        name={["floor_uid"]}
        label="Select Floor"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Select
          defaultValue=""
          style={{ width: 120 }}
          onChange={handleFloorSelect}
          options={FloorOptions()}
        ></Select>
      </Form.Item>
      <Form.Item
        name={["ward_uid"]}
        label="Select Ward"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Select
          style={{ width: 120 }}
          // onChange={handleWardSelect}
          options={sameFloorWards}
        ></Select>
        {/* {sameFloorWards ? (
          
        ) : (
          <Select style={{ width: 120 }} onChange={handleWardSelect}></Select>
        )} */}
      </Form.Item>
      <Form.Item
        name={["name"]}
        label="Bed"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item name="active" label="Active">
        <Switch
          checkedChildren="true"
          unCheckedChildren="false"
          // onChange={onSwitchChange}
          style={{ boxShadow: "none", borderColor: "#d9d9d9" }}
        />
      </Form.Item>
      <Form.Item
        wrapperCol={{
          ...layout.wrapperCol,
          offset: 8,
        }}
      >
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export const CreateNurseStation = () => {
  const onChange = (checkedValues) => {
    console.log("checked = ", checkedValues);
  };
  const wardOptions = WardOptions();
  return (
    <Checkbox.Group
      style={{
        width: "100%",
        display: "flex",
        alignItems: "center",
      }}
      // options={wardOptions}
      onChange={onChange}
    >
      <Row>
        {wardOptions.map((item) => (
          <Col span={8}>
            {
              <Checkbox value={item.value}>
                <span
                  style={{
                    color:
                      item.label.split(" ")[1] === "Ward"
                        ? "#ff713a"
                        : "#7dbbf0",
                  }}
                >
                  {item.label}
                </span>
              </Checkbox>
            }
          </Col>
        ))}
      </Row>
    </Checkbox.Group>
  );
};

export const AssignToBed = ({
  onAssignPatient,
  onAssignDoctor,
  onAssignNurse,
  onAssignRemote,
  initialAssignValues,
}) => {
  const [selectedValue, setSelectedValue] = useState({
    selectedPatientVal: null,
    selectedDoctorVal: null,
    selectedNurseVal: null,
    selectedRemoteVal: null,
  });
  const [isItemSelected, setIsItemSelected] = useState({
    patientSelected: false,
    doctorSelected: false,
    nurseSelected: false,
    remoteSelected: false,
  }); // Flag for selection

  const [form] = Form.useForm();
  const layout = {
    labelCol: {
      span: 8,
    },
    wrapperCol: {
      span: 16,
    },
  };

  console.log("initialPatient", initialAssignValues);

  useEffect(() => {
    if (initialAssignValues) {
      setSelectedValue((prevState) => ({
        ...prevState,
        selectedPatientVal: initialAssignValues?.assignedPatient?.patient_uid,
        selectedDoctorVal: initialAssignValues?.assignedDoctor?.doctor_uid,
        selectedNurseVal: initialAssignValues?.assignedNurse?.nurse_uid,
        selectedRemoteVal: initialAssignValues?.assignedRemote?.mak_id,
      })); // Set the initial value
      form.setFieldsValue({
        patient_uid: initialAssignValues?.assignedPatient?.patient_uid,
        doctor_uid: initialAssignValues?.assignedDoctor?.doctor_uid,
        nurse_uid: initialAssignValues?.assignedNurse?.nurse_uid,
        mak_id: initialAssignValues?.assignedRemote?.mak_id,
      }); // Set the form field value
      setIsItemSelected((prevState) => ({
        ...prevState,
        patientSelected: initialAssignValues?.assignedPatient?.patient_uid
          ? true
          : false,
        doctorSelected: initialAssignValues?.assignedDoctor?.doctor_uid
          ? true
          : false,
        nurseSelected: initialAssignValues?.assignedNurse?.nurse_uid
          ? true
          : false,
        remoteSelected: initialAssignValues?.assignedRemote?.mak_id
          ? true
          : false,
      }));
    }
  }, [initialAssignValues, form]);

  // useEffect(() => {
  //   if (!isItemSelected) {
  //     setSelectedValue(null);
  //   }
  // }, [isItemSelected]);

  const handleSearch = (value) => {
    console.log("search:", value);
  };
  const handlePatientChange = (value) => {
    setSelectedValue({ ...selectedValue, selectedPatientVal: value });
    setIsItemSelected({ ...isItemSelected, patientSelected: true });
    form.setFieldsValue({ patient_uid: value });
  };

  const handlePatientUnselect = () => {
    setSelectedValue({ ...selectedValue, selectedPatientVal: null });
    setIsItemSelected({ ...isItemSelected, patientSelected: false }); // Clear selection flag on unselect
  };
  const handleDoctorChange = (value) => {
    setSelectedValue({ ...selectedValue, selectedDoctorVal: value });
    setIsItemSelected({ ...isItemSelected, doctorSelected: true });
    form.setFieldsValue({ doctor_uid: value });
  };

  const handleDoctorUnselect = () => {
    setSelectedValue({ ...selectedValue, selectedDoctorVal: null });
    setIsItemSelected({ ...isItemSelected, doctorSelected: false }); // Clear selection flag on unselect
  };
  const handleNurseChange = (value) => {
    setSelectedValue({ ...selectedValue, selectedNurseVal: value });
    setIsItemSelected({ ...isItemSelected, nurseSelected: true });
    form.setFieldsValue({ nurse_uid: value });
  };

  const handleNurseUnselect = () => {
    setSelectedValue({ ...selectedValue, selectedNurseVal: null });
    setIsItemSelected({ ...isItemSelected, nurseSelected: false }); // Clear selection flag on unselect
  };
  const handleRemoteChange = (value) => {
    setSelectedValue({ ...selectedValue, selectedRemoteVal: value });
    setIsItemSelected({ ...isItemSelected, remoteSelected: true });
    form.setFieldsValue({ mak_id: value });
  };

  const handleRemoteUnselect = () => {
    setSelectedValue({ ...selectedValue, selectedRemoteVal: null });
    setIsItemSelected({ ...isItemSelected, remoteSelected: false }); // Clear selection flag on unselect
  };
  const filterOption = (input, option) =>
    (option?.label ?? "").toLowerCase().includes(input.toLowerCase());

  const onFinish = () => {
    onAssignPatient(selectedValue.selectedPatientVal);
    onAssignDoctor(selectedValue.selectedDoctorVal);
    onAssignNurse(selectedValue.selectedNurseVal);
    onAssignRemote(selectedValue.selectedRemoteVal);
  };
  console.log(selectedValue);
  console.log(isItemSelected);
  return (
    <Form
      form={form}
      {...layout}
      name="nest messages"
      onFinish={onFinish}
      style={{
        maxWidth: 600,
        marginRight: "5em",
        marginTop: "2em",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Form.Item name="patient_uid" label="Select Patient">
        <Select
          showSearch
          placeholder="Select a patient"
          // optionFilterProp="children"
          value={selectedValue.selectedPatientVal}
          onChange={handlePatientChange}
          onSearch={handleSearch}
          filterOption={filterOption}
          options={PatientOptions()}
        />
        <Popconfirm
          title="Remove the patient"
          description="Are you sure to remove this patient"
          onConfirm={handlePatientUnselect}
        >
          <Switch
            checkedChildren="Remove"
            checked={isItemSelected.patientSelected}
            // onChange={handleUnselect}
            disabled={!isItemSelected.patientSelected}
          />
        </Popconfirm>
      </Form.Item>
      <Form.Item name="doctor_uid" label="Select Doctor">
        <Select
          showSearch
          placeholder="Select a doctor"
          // optionFilterProp="children"
          value={selectedValue.selectedDoctorVal}
          onChange={handleDoctorChange}
          onSearch={handleSearch}
          filterOption={filterOption}
          options={DoctorOptions()}
        />
        <Popconfirm
          title="Remove the doctor"
          description="Are you sure to remove this doctor"
          onConfirm={handleDoctorUnselect}
        >
          <Switch
            checkedChildren="Remove"
            checked={isItemSelected.doctorSelected}
            // onChange={handleUnselect}
            disabled={!isItemSelected.doctorSelected}
          />
        </Popconfirm>
      </Form.Item>
      <Form.Item name="nurse_uid" label="Select Nurse">
        <Select
          showSearch
          placeholder="Select a nurse"
          // optionFilterProp="children"
          value={selectedValue.selectedNurseVal}
          onChange={handleNurseChange}
          onSearch={handleSearch}
          filterOption={filterOption}
          options={NurseOptions()}
        />
        <Popconfirm
          title="Remove the nurse"
          description="Are you sure to remove this nurse"
          onConfirm={handleNurseUnselect}
        >
          <Switch
            checkedChildren="Remove"
            checked={isItemSelected.nurseSelected}
            // onChange={handleUnselect}
            disabled={!isItemSelected.nurseSelected}
          />
        </Popconfirm>
      </Form.Item>
      <Form.Item name="mak_id" label="Select Remote">
        <Select
          showSearch
          placeholder="Select a remote"
          // optionFilterProp="children"
          value={selectedValue.selectedRemoteVal}
          onChange={handleRemoteChange}
          onSearch={handleSearch}
          filterOption={filterOption}
          options={RemoteOptions()}
        />
        <Popconfirm
          title="Remove the remote"
          description="Are you sure to remove this remote"
          onConfirm={handleRemoteUnselect}
        >
          <Switch
            checkedChildren="Remove"
            checked={isItemSelected.remoteSelected}
            // onChange={handleUnselect}
            disabled={!isItemSelected.remoteSelected}
          />
        </Popconfirm>
      </Form.Item>

      <Form.Item
        wrapperCol={{
          ...layout.wrapperCol,
          offset: 8,
        }}
      >
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

{
  /* <div className="flex items-center gap-3"></div> */
}

export const CreateDoctor = ({ onCloseModal }) => {
  const token = useSelector((state) => state.login.token);
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const layout = {
    labelCol: {
      span: 8,
    },
    wrapperCol: {
      span: 16,
    },
  };
  const onFinish = async ({ name, active }) => {
    const res = await dispatch(createDoctor({ token, name, active }));
    onCloseModal();
  };
  return (
    <Form
      form={form}
      {...layout}
      name="nest-messages"
      onFinish={onFinish}
      style={{
        maxWidth: 600,
        marginRight: "5em",
        marginTop: "2em",
        display: "flex",
        flexDirection: "column",
      }}
      // align="left"
      // validateMessages={validateMessages}
    >
      {/* name, floor_no, active, uid */}
      <Form.Item
        name={["name"]}
        label="Name"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item name="active" label="Active">
        <Switch
          checkedChildren="true"
          unCheckedChildren="false"
          // onChange={onSwitchChange}
          style={{ boxShadow: "none", borderColor: "#d9d9d9" }}
        />
      </Form.Item>
      <Form.Item
        wrapperCol={{
          ...layout.wrapperCol,
          offset: 8,
        }}
      >
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export const EditDoctor = ({ onEditDoctor, initialValues }) => {
  const [form] = Form.useForm();
  const layout = {
    labelCol: {
      span: 8,
    },
    wrapperCol: {
      span: 16,
    },
  };
  // console.log("doctor edit ini", initialValues);
  useEffect(() => {
    initialValues &&
      form.setFieldsValue({
        name: initialValues.name || "",
        active: initialValues.active || false,
        uid: initialValues.uid || "",
      });
  }, []);

  const onFinish = (values) => {
    onEditDoctor(values);
  };
  return (
    <Form
      form={form}
      {...layout}
      name="nest-messages"
      onFinish={onFinish}
      style={{
        maxWidth: 600,
        marginRight: "5em",
        marginTop: "2em",
        display: "flex",
        flexDirection: "column",
      }}
      // align="left"
      // validateMessages={validateMessages}
    >
      <Form.Item
        name={["name"]}
        label="Name"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item name="active" label="Active">
        <Switch
          checkedChildren="true"
          unCheckedChildren="false"
          // onChange={onSwitchChange}
          style={{ boxShadow: "none", borderColor: "#d9d9d9" }}
        />
      </Form.Item>
      <Form.Item
        hidden
        name={["uid"]}
        label="UID"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        wrapperCol={{
          ...layout.wrapperCol,
          offset: 8,
        }}
      >
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export const CreatePatient = ({ onCloseModal }) => {
  const [datetime, setDatetime] = useState(dayjs().toISOString());
  const token = useSelector((state) => state.login.token);
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const layout = {
    labelCol: {
      span: 8,
    },
    wrapperCol: {
      span: 16,
    },
  };
  const onFinish = async ({ name, age, gender, active }) => {
    console.log(name, age, gender, datetime);
    const res = await dispatch(
      createPatient({ token, name, age, gender, active, datetime })
    );
    onCloseModal();
  };
  const defaultValue = dayjs("2024-01-01");
  const onDatetimeChange = (_, dateStr) => {
    if (dateStr) {
      // Check if dateStr is not null
      const date = dayjs(dateStr).toISOString();
      console.log("onChange:", date);
      form.setFieldsValue({
        datetime: date,
      });
      setDatetime(date);
    }
  };

  return (
    <Form
      form={form}
      {...layout}
      name="nest-messages"
      onFinish={onFinish}
      style={{
        maxWidth: 600,
        marginRight: "5em",
        marginTop: "2em",
        display: "flex",
        flexDirection: "column",
      }}
      // align="left"
      // validateMessages={validateMessages}
    >
      {/* name, floor_no, active, uid */}
      <Form.Item
        name={["name"]}
        label="Name"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name={["age"]}
        label="age"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item name="gender" label="Gender">
        <Select
          style={{ width: 120 }}
          options={[
            {
              value: "Male",
              label: "Male",
            },
            {
              value: "Female",
              label: "Female",
            },
          ]}
        />
      </Form.Item>
      <Form.Item name="active" label="Active">
        <Switch
          checkedChildren="true"
          unCheckedChildren="false"
          // onChange={onSwitchChange}
          style={{ boxShadow: "none", borderColor: "#d9d9d9" }}
        />
      </Form.Item>
      <Form.Item name="datetime" label="Datetime">
        <DatePicker
          defaultValue={defaultValue}
          showTime
          // locale={buddhistLocale}
          onChange={onDatetimeChange}
        />
      </Form.Item>
      <Form.Item
        wrapperCol={{
          ...layout.wrapperCol,
          offset: 8,
        }}
      >
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export const EditPatient = ({ onEditPatient, initialValues }) => {
  const [form] = Form.useForm();
  const layout = {
    labelCol: {
      span: 8,
    },
    wrapperCol: {
      span: 16,
    },
  };

  useEffect(() => {
    initialValues &&
      form.setFieldsValue({
        name: initialValues.name || "",
        age: initialValues.age || "",
        uid: initialValues.uid || "",
      });
  }, []);

  const onFinish = (values) => {
    onEditPatient(values);
  };
  return (
    <Form
      form={form}
      {...layout}
      name="nest-messages"
      onFinish={onFinish}
      style={{
        maxWidth: 600,
        marginRight: "5em",
        marginTop: "2em",
        display: "flex",
        flexDirection: "column",
      }}
      // align="left"
      // validateMessages={validateMessages}
    >
      {/* name, floor_no, active, uid */}
      <Form.Item
        name={["name"]}
        label="Name"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name={["age"]}
        label="Age"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        hidden
        name={["uid"]}
        label="UID"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        wrapperCol={{
          ...layout.wrapperCol,
          offset: 8,
        }}
      >
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};
