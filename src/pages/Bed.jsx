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
// import { deleteBed, fetchBed, updateBed } from "../features/bedSlice";
// import { EditBed } from "../components/Forms";
import Header from "../components/Header";
import { fetchBed } from "../features/bedSlice";
import WardOptions from "../utils/WardOptions";
import FloorOptions from "../utils/FloorOptions";

const Bed = () => {
  const dispatch = useDispatch();
  const [beds, setBeds] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editUid, setEditUid] = useState(null);
  const [initialFormVal, setInitialFormVal] = useState({});
  const [triggerRerender, setTriggerRerender] = useState(false);
  const searchInput = useRef(null);
  const token = useSelector((state) => state.login.token);
  // const store = useSelector((state) => state.bed);

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
    // console.log("handleEdit", record);
    setEditUid(record.uid);
    setInitialFormVal(record);
    toggleEditModal(true);
  };

  const handleDelete = async (uid) => {
    try {
      // await dispatch(deleteBed({ token, uid }));
      setTriggerRerender((prev) => !prev);
      useSelector((state) => state.beds);
    } catch (error) {
      console.error("Error deleting bed:", error);
    }
  };

  const onEditBed = async (values) => {
    // setInitialFormVal(values);
    // console.log("values", values);
    // dispatch(updateBed({ token, values, toggleEditModal }));
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
  useEffect(() => {
    const getBedData = async () => {
      const response = await dispatch(fetchBed(token));
      setBeds(response.payload.data);
    };
    // console.log("beds", beds);
    getBedData();
  }, [editModalOpen, triggerRerender]);

  const columns = [
    {
      title: "SL",
      dataIndex: "sl",
      key: "sl",
      width: "10%",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Bed",
      dataIndex: "bed",
      key: "bed",
      width: "20%",
      ...getColumnSearchProps("bed"),
    },
    {
      title: "Floor",
      dataIndex: "floor",
      key: "floor",
      width: "25%",
      ...getColumnSearchProps("floor"),
    },
    {
      title: "Ward",
      dataIndex: "ward",
      key: "ward",
      width: "25%",
      ...getColumnSearchProps("ward"),
    },

    {
      title: "Action",
      key: "action",
      width: "20%",
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
  const wardOptions = WardOptions();
  const floorOptions = FloorOptions();
  const sortedBeds = [...beds].sort((a, b) => a.id - b.id);
  const bedData = sortedBeds?.map((item, index) => ({
    key: item.id,
    sl: index,
    bed: item.name,
    floor:
      (floorOptions &&
        floorOptions.find((i) => i.value === item.floor_uid)["label"]) ||
      "",
    ward:
      (wardOptions &&
        wardOptions.find((i) => i.value === item.ward_uid)["label"]) ||
      "",
    uid: item.uid,
  }));
  console.log("beds", JSON.stringify(bedData, undefined, 2));
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
          {/* <EditBed onEditBed={onEditBed} initialValues={initialFormVal} /> */}
        </Modal>
      )}
    </Layout>
  );
};

export default Bed;
