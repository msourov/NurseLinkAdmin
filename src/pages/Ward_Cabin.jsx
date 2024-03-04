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
import Header from "../components/Header";
import { fetchWard, updateWard } from "../features/wardSlice";
import { EditWard } from "../components/Forms";

const Ward_Cabin = () => {
  const dispatch = useDispatch();
  const [wards, setWards] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editUid, setEditUid] = useState(null);
  const [initialFormVal, setInitialFormVal] = useState({});
  const [triggerRerender, setTriggerRerender] = useState(false);
  const searchInput = useRef(null);
  const token = useSelector((state) => state.login.token);

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
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Floor No",
      dataIndex: "floor_no",
      key: "floor_no",
    },
    {
      title: "Ward/Cabin Name",
      dataIndex: "name",
      key: "name",
      ...getColumnSearchProps("name"),
    },
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

  useEffect(() => {
    const getWardData = async () => {
      const response = await dispatch(fetchWard(token));
      setWards(response.payload.data);
    };
    // console.log("floors", floors);
    getWardData();
  }, [editModalOpen, triggerRerender]);

  console.log("wards", wards);

  const prepareWardData = wards.map((item, ind) => ({
    key: `ward${ind}`,
    sl: ind,
    floor_no: item.floor_no,
    name: item.name,
  }));

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
    console.log("inside renderTrigger in ward.jsx");
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
      // Dispatch the deleteFloor action
      // await dispatch(delete({ token, uid }));

      // Update state to trigger re-render
      setTriggerRerender((prev) => !prev);

      // Optional: Retrieve the latest state using useSelector
      // useSelector((state) => state.floors);
    } catch (error) {
      console.error("Error deleting floor:", error);
    }
  };

  const onEditWard = async (values) => {
    setInitialFormVal(values);
    console.log("values", values);
    // dispatch(updateWard({ token, values, toggleEditModal }));
    // toggleEditModal(false);
  };

  return (
    <Layout>
      <Header
        headerRoutes={["Home", "Ward"]}
        titles={["Ward", "Home"]}
        page="ward"
        triggerRender={renderTrigger}
      />
      <Table columns={columns} dataSource={prepareWardData} />
      {editModalOpen && (
        <Modal
          key={`e-${editUid}`}
          open={() => editModalOpen}
          onOk={() => toggleEditModal(false)}
          onCancel={() => toggleEditModal(false)}
        >
          <EditWard onEditWard={onEditWard} initialVal={initialFormVal} />
        </Modal>
      )}
    </Layout>
  );
};

export default Ward_Cabin;
