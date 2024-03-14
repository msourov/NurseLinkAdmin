import {
  Breadcrumb,
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
  DeleteOutlined,
  EditOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import Highlighter from "react-highlight-words";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { deleteDoctor, fetchDoctor, updateDoctor } from "../features/doctorSlice";
// import { EditDoctor } from "../components/Forms";
import Header from "../components/Header";
import {
  deleteDoctor,
  fetchDoctor,
  updateDoctor,
} from "../features/doctorSlice";
import { EditDoctor } from "../components/Forms";

const Doctor = () => {
  const dispatch = useDispatch();
  const [doctors, setDoctors] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editUid, setEditUid] = useState(null);
  const [initialFormVal, setInitialFormVal] = useState({});
  const [triggerRerender, setTriggerRerender] = useState(false);
  const searchInput = useRef(null);
  const token = useSelector((state) => state.login.token);
  // const store = useSelector((state) => state.doctor);

  useEffect(() => {
    const getDoctorData = async () => {
      const response = await dispatch(fetchDoctor(token));
      setDoctors(response.payload.data);
    };
    // console.log("doctors", doctors);
    getDoctorData();
  }, [editModalOpen, triggerRerender]);

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
    setTriggerRerender((prev) => !prev);
  };

  const toggleEditModal = (bool) => {
    setEditModalOpen(bool);
  };

  const handleEditButton = async (record) => {
    console.log("handleEdit", record);
    setEditUid(record.uid);
    setInitialFormVal(record);
    toggleEditModal(true);
  };

  const handleDelete = async (uid) => {
    try {
      await dispatch(deleteDoctor({ token, uid }));
      setTriggerRerender((prev) => !prev);
      useSelector((state) => state.doctors);
    } catch (error) {
      console.error("Error deleting doctor:", error);
    }
  };

  const onEditDoctor = async (values) => {
    // setInitialFormVal(values);
    // console.log("values", values);
    dispatch(updateDoctor({ token, values, toggleEditModal }));
    // toggleEditModal(false);
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

  const columns = [
    {
      title: "SL",
      dataIndex: "sl",
      key: "sl",
      width: "15%",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Doctor Name",
      dataIndex: "name",
      key: "name",
      width: "35%",
      ...getColumnSearchProps("name"),
    },
    // {
    //   title: "Mobile No",
    //   dataIndex: "phone",
    //   key: "phone",
    //   width: "25%",
    //   render: (phone) => <a>{phone}</a>,
    // },
    // {
    //   title: "Department",
    //   dataIndex: "department",
    //   key: "department",
    //   width: "35%",
    //   ...getColumnSearchProps("department"),
    // },

    {
      title: "Action",
      key: "action",
      width: "30%",
      // ...getColumnSearchProps('action'),
      render: (_, record) => (
        <Space size="middle" style={{ margin: "0", padding: "0" }}>
          {/* {console.log("record", record)} */}
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

  const sortedDoctors = [...doctors].sort((a, b) => a.id - b.id);
  const doctorData = sortedDoctors?.map((item, index) => ({
    key: `d-${item.id}`,
    sl: index,
    phone: item?.phone || null,
    department: item.department || "",
    name: item.name,
    uid: item.uid,
    active: item.active,
  }));
  // console.log("doctors", JSON.stringify(doctorData, undefined, 2));
  return (
    <Layout>
      <Header
        headerRoutes={["Home", "Doctor"]}
        titles={["Doctor", "Home"]}
        page="Doctor"
        triggerRender={renderTrigger}
      />
      <Table
        columns={columns}
        dataSource={doctorData}
        style={{ margin: "0px" }}
      />
      {editModalOpen && (
        <Modal
          key={`e-${editUid}`}
          open={() => editModalOpen}
          onOk={() => toggleEditModal(false)}
          onCancel={() => toggleEditModal(false)}
        >
          <EditDoctor
            onEditDoctor={onEditDoctor}
            initialValues={initialFormVal}
          />
        </Modal>
      )}
    </Layout>
  );
};

export default Doctor;
