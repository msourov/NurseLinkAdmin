import { Layout, Modal, Table } from "antd";
import Header from "../components/Header";

const NurseStation = () => {
  return (
    <Layout>
      <Header
        headerRoutes={["Home", "Nurse Station"]}
        titles={["Nurse Station", "Home"]}
        page="Nurse Station"
        // triggerRender={renderTrigger}
      />
      {/* <Table
        columns={columns}
        dataSource={floorData}
        style={{ margin: "0px" }}
      /> */}
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
