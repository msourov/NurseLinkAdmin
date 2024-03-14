import { Layout, Modal, Table, Select, Switch, Tree, Divider } from "antd";
import Header from "../components/Header";
import { useState } from "react";
import {
  CarryOutOutlined,
  CheckOutlined,
  FormOutlined,
} from "@ant-design/icons";
import useSelection from "antd/es/table/hooks/useSelection";
import { useSelector } from "react-redux";
import { getNurseStation } from "../features/nurseStationSlice";

const NurseStation = () => {
  const [triggerRerender, setTriggerRerender] = useState(false);

  const renderTrigger = () => {
    setTriggerRerender((prev) => !prev);
  };
  return (
    <Layout>
      <Header
        headerRoutes={["Home", "Nurse Station"]}
        titles={["Nurse Station", "Home"]}
        page="Nurse Station"
        triggerRender={renderTrigger}
      />
      <ShowNurseStations />
      {/* {editModalOpen && (
        <Modal
          key={`e-${editUid}`}
          open={() => editModalOpen}
          onOk={() => toggleEditModal(false)}
          onCancel={() => toggleEditModal(false)}
        >
          <EditFloor onEditFloor={onEditFloor} initialValues={initialFormVal} />
        </Modal>
      )} */}
    </Layout>
  );
};

export default NurseStation;

// const NSDataConverter = (nurseStationData) => {
//   return nurseStationData.map((item, index) => ({
//     title: item.name,
//     key: `p${index}`,
//     // icon: <CarryOutOutlined />,
//     children: item.ward_cabin.map((i, ind) => ({
//       title: i.name,
//       key: i.value,
//       // icon: <CarryOutOutlined />,
//     })),
//   }));
// };
const ShowNurseStations = () => {
  const onSelect = (selectedKeys, info) => {
    console.log("selected", selectedKeys, info);
  };
  const nurseStationData = useSelector(getNurseStation);
  console.log(
    "nurseStationData",
    JSON.stringify(nurseStationData, undefined, 2)
  );

  const formattedTreeData = nurseStationData.map((item, index) => ({
    title: item.name,
    key: `p${index}`,
    icon: <CarryOutOutlined />,
    children: item.ward_cabin.map((ward, wardIndex) => ({
      title: ward.name,
      key: `${item.name}-${wardIndex}`,
    })),
  }));

  // const handleLeafIconChange = (value) => {
  //   if (value === "custom") {
  //     return setShowLeafIcon(<CheckOutlined />);
  //   }
  //   if (value === "true") {
  //     return setShowLeafIcon(true);
  //   }
  //   return setShowLeafIcon(false);
  // };
  return (
    <div>
      {/* <div
        style={{
          marginBottom: 16,
        }}
      >
        showLine: <Switch checked={!!showLine} onChange={setShowLine} />
        <br />
        <br />
        showIcon: <Switch checked={showIcon} onChange={setShowIcon} />
        <br />
        <br />
        showLeafIcon:{" "}
        <Select defaultValue="true" onChange={handleLeafIconChange}>
          <Select.Option value="true">True</Select.Option>
          <Select.Option value="false">False</Select.Option>
          <Select.Option value="custom">Custom icon</Select.Option>
        </Select>
      </div> */}
      <Tree
        style={{ marginLeft: "1em", marginTop: "1em", fontWeight: "500" }}
        // defaultExpandedKeys={["0-0-0"]}
        onSelect={onSelect}
        treeData={formattedTreeData}
      />
    </div>
  );
};
