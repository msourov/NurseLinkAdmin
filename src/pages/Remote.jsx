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
import Header from "../components/Header";
import {
  deleteRemote,
  fetchRemote,
  updateRemote,
} from "../features/remoteSlice";
import { AssignRemoteToBed } from "../components/Forms";

const Remote = () => {
  const dispatch = useDispatch();
  const [remotes, setRemotes] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [assignModalOpen, setAssignModalOpen] = useState(false);
  const [makId, setMakId] = useState(null);
  const [initialFormVal, setInitialFormVal] = useState({});
  const [triggerRerender, setTriggerRerender] = useState(false);
  const searchInput = useRef(null);
  const token = useSelector((state) => state.login.token);

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

  // record contains all the information about the bed clicked to edit.
  // const handleEditButton = async (record) => {
  //   setEditUid(record.uid);
  //   createInitialValues(record);
  //   toggleEditModal(true);
  // };

  const handleAssignButton = async (record) => {
    console.log("record", record);
    setMakId(record.mak_id);
    setAssignModalOpen(true);
  };

  const handleDelete = async (uid) => {
    try {
      await dispatch(deleteRemote({ token, uid }));
      setTriggerRerender((prev) => !prev);
      useSelector((state) => state.remotes);
    } catch (error) {
      console.error("Error deleting bed:", error);
    }
  };

  const onEditRemote = async (values) => {
    dispatch(updateRemote({ token, values, editUid, toggleEditModal }));
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
    const getRemoteData = async () => {
      const response = await dispatch(fetchRemote(token, dispatch));
      console.log("response", response);
      setRemotes(response.payload.data);
    };
    getRemoteData();
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
      title: "Name",
      dataIndex: "name",
      key: "name",
      width: "14%",
      ...getColumnSearchProps("name"),
    },
    {
      title: "Mak_ID",
      dataIndex: "mak_id",
      key: "mak_id",
      width: "23%",
      ...getColumnSearchProps("mak_id"),
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
  const remoteData = remotes?.map((item, index) => ({
    key: item.id,
    sl: index,
    name: item.name,
    mak_id: item.mak_id,
    uid: item.uid,
  }));
  console.log("remoteData", remoteData);
  return (
    <Layout>
      <Header
        headerRoutes={["Home", "Remote"]}
        titles={["Remote", "Home"]}
        page="Remote"
        triggerRender={renderTrigger}
      />
      <Table
        columns={columns}
        dataSource={remoteData}
        style={{ margin: "0px" }}
      />

      {assignModalOpen && (
        <Modal
          key={`a-${makId}`}
          open={() => assignModalOpen}
          onOk={() => setAssignModalOpen(false)}
          onCancel={() => setAssignModalOpen(false)}
        >
          <AssignRemoteToBed
            makId={makId}
            onCloseModal={() => setAssignModalOpen(false)}
          />
        </Modal>
      )}
    </Layout>
  );
};

export default Remote;
