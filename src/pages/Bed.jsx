import {
  Button,
  Input,
  Layout,
  Modal,
  Popconfirm,
  Space,
  Table,
  Tag,
} from "antd";
import {
  CheckOutlined,
  DeleteOutlined,
  EditOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import Highlighter from "react-highlight-words";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { deleteBed, fetchBed, updateBed } from "../features/bedSlice";
// import { EditBed } from "../components/Forms";
import Header from "../components/Header";
import { deleteBed, fetchBed, updateBed } from "../features/bedSlice";
import WardOptions from "../utils/WardOptions";
import FloorOptions from "../utils/FloorOptions";
import { AssignToBed, EditBed } from "../components/Forms";
import {
  AssignDoctor,
  AssignNurse,
  AssignPatient,
  AssignRemote,
} from "../actions/AssignToBed";

const Bed = () => {
  const dispatch = useDispatch();
  const [beds, setBeds] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [assignModalOpen, setAssignModalOpen] = useState(false);
  const [editUid, setEditUid] = useState(null);
  const [initialFormVal, setInitialFormVal] = useState({});
  const [triggerRerender, setTriggerRerender] = useState(false);
  const [assignInitials, setAssignInitials] = useState({
    assignedPatient: {},
    assignedDoctor: {},
    assignedNurse: {},
    assignedRemote: {},
  });
  const searchInput = useRef(null);
  const token = useSelector((state) => state.login.token);
  // const store = useSelector((state) => state.bed);
  const wardOptions = WardOptions();
  const floorOptions = FloorOptions();

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };
  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText("");
  };

  const renderTrigger = () => {
    // This is to cause rerender after an operation.
    setTriggerRerender((prev) => !prev);
  };

  const toggleEditModal = (bool) => {
    setEditModalOpen(bool);
  };

  // This function prepopulates the bed edit form with previous values.
  const createInitialValues = (record) => {
    const { value: floorValue, label: floorLabel } = floorOptions.find(
      (item) => item.value === record.floor_uid
    );
    const { value: wardValue, label: wardLabel } = wardOptions.find(
      (item) => item.value === record.ward_uid
    );
    const obj = {
      floor: { floorLabel, floorValue },
      ward: { wardLabel, wardValue },
      name: record.bed,
      active: record.active,
    };
    setInitialFormVal(obj);
  };

  // record contains all the information about the bed clicked to edit.
  const handleEditButton = async (record) => {
    setEditUid(record.uid);
    createInitialValues(record);
    toggleEditModal(true);
  };

  const handleAssignButton = async (record) => {
    setEditUid(record.uid);
    setAssignModalOpen(true);
  };

  const handleDelete = async (uid) => {
    try {
      await dispatch(deleteBed({ token, uid }));
      setTriggerRerender((prev) => !prev);
      useSelector((state) => state.beds);
    } catch (error) {
      console.error("Error deleting bed:", error);
    }
  };

  const onEditBed = async (values) => {
    dispatch(updateBed({ token, values, editUid, toggleEditModal }));
    // toggleEditModal(false);
  };

  const onAssignPatient = async (patient_uid) => {
    setAssignModalOpen(false);
    setAssignInitials({
      ...assignInitials,
      assignedPatient: { uid: editUid, patient_uid: patient_uid },
    });
    const res = await AssignPatient({ token, editUid, patient_uid });
  };
  const onAssignDoctor = async (doctor_uid) => {
    setAssignModalOpen(false);
    setAssignInitials({
      ...assignInitials,
      assignedDoctor: { uid: editUid, doctor_uid: doctor_uid },
    });
    const res = await AssignDoctor({ token, editUid, doctor_uid });
  };
  const onAssignNurse = async (nurse_uid) => {
    setAssignModalOpen(false);
    setAssignInitials({
      ...assignInitials,
      assignedNurse: { uid: editUid, nurse_uid: nurse_uid },
    });
    const res = await AssignNurse({ token, editUid, nurse_uid });
  };
  const onAssignRemote = async (mak_id) => {
    setAssignModalOpen(false);
    setAssignInitials({
      ...assignInitials,
      assignedRemote: { uid: editUid, mak_id: mak_id },
    });
    const res = await AssignRemote({ token, editUid, mak_id });
  };
  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      close,
    }) => (
      <div
        style={{
          padding: 8,
        }}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: "block",
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({
                closeDropdown: false,
              });
              setSearchText(selectedKeys[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? "#1677ff" : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{
            backgroundColor: "#ffc069",
            padding: 0,
          }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });
  useEffect(() => {
    const getBedData = async () => {
      const response = await dispatch(fetchBed(token, dispatch));
      setBeds(response.payload.data);
    };
    getBedData();
  }, [editModalOpen, triggerRerender]);

  const columns = [
    {
      title: "SL",
      dataIndex: "sl",
      key: "sl",
      width: "6%",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Bed",
      dataIndex: "bed",
      key: "bed",
      width: "14%",
      ...getColumnSearchProps("bed"),
    },
    {
      title: "Floor",
      dataIndex: "floor",
      key: "floor",
      width: "23%",
      ...getColumnSearchProps("floor"),
    },
    {
      title: "Ward",
      dataIndex: "ward",
      key: "ward",
      width: "23%",
      ...getColumnSearchProps("ward"),
    },

    {
      title: "Action",
      key: "action",
      width: "32%",
      // ...getColumnSearchProps('action'),
      render: (_, record) => (
        <Space
          size="middle"
          style={{
            margin: "0",
            padding: "0",
            flexWrap: "wrap",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Button
            onClick={() => handleEditButton(record)}
            style={{
              border: "none",
              padding: 0,
              width: "fit-content",
              minWidth: "60px",
              outline: "none",
            }}
          >
            <Tag
              style={{
                backgroundColor: "#87D068",
                color: "white",
                fontSize: "0.9rem",
              }}
            >
              <EditOutlined /> Edit
            </Tag>
          </Button>
          <Button
            onClick={() => handleAssignButton(record)}
            style={{
              border: "none",
              padding: 0,
              width: "fit-content",
              minWidth: "60px",
              outline: "none",
            }}
          >
            <Tag
              style={{
                backgroundColor: "#87D068",
                color: "white",
                fontSize: "0.9rem",
              }}
            >
              <CheckOutlined /> Assign
            </Tag>
          </Button>
          <Popconfirm
            title=""
            description="Are you sure?"
            okText="Yes"
            cancelText="No"
            onConfirm={() => handleDelete(record.uid)}
          >
            <Button
              // onClick={() => handleDelete(record.uid)}
              style={{
                margin: 0,
                border: "none",
                padding: 0,
                width: "fit-content",
                minWidth: "60px",
                outline: "none",
              }}
            >
              <Tag
                style={{
                  backgroundColor: "red",
                  color: "white",
                  fontSize: "0.9rem",
                }}
              >
                <DeleteOutlined /> Delete
              </Tag>
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const sortedBeds = [...beds].sort((a, b) => a.id - b.id);
  const bedData = sortedBeds?.map((item, index) => ({
    key: item.id,
    sl: index,
    bed: item.name,
    floor:
      (floorOptions &&
        floorOptions.find((i) => i.value === item.floor_uid)?.label) ||
      "",
    floor_uid: item.floor_uid,
    ward:
      (wardOptions &&
        wardOptions.find((i) => i.value === item.ward_uid)?.label) ||
      "",
    ward_uid: item.ward_uid,
    uid: item.uid,
    active: item.active,
  }));

  return (
    <Layout>
      <Header
        headerRoutes={["Home", "Bed"]}
        titles={["Bed", "Home"]}
        page="bed"
        triggerRender={renderTrigger}
      />
      <Table columns={columns} dataSource={bedData} style={{ margin: "0px" }} />
      {editModalOpen && (
        <Modal
          key={`e-${editUid}`}
          open={() => editModalOpen}
          onOk={() => toggleEditModal(false)}
          onCancel={() => toggleEditModal(false)}
        >
          <EditBed onEditBed={onEditBed} initialVal={initialFormVal} />
        </Modal>
      )}
      {assignModalOpen && (
        <Modal
          key={`a-${editUid}`}
          open={() => assignModalOpen}
          onOk={() => setAssignModalOpen(false)}
          onCancel={() => setAssignModalOpen(false)}
        >
          <AssignToBed
            onAssignPatient={onAssignPatient}
            onAssignDoctor={onAssignDoctor}
            onAssignNurse={onAssignNurse}
            onAssignRemote={onAssignRemote}
            initialAssignValues={assignInitials}
          />
        </Modal>
      )}
    </Layout>
  );
};

export default Bed;
