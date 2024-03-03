/* eslint-disable react/prop-types */
import { PageHeader } from "@ant-design/pro-layout";
import { useNavigate } from "react-router-dom";
import { PlusCircleOutlined } from "@ant-design/icons";
import { Button, Modal } from "antd";
import { useState } from "react";
import { CreateFloor } from "./Forms";

// import { RoleForm } from "../pages/user_management/RoleForm";
// import { UserForm } from "../pages/user_management/UserForm";

function Header({
  headerRoutes: [firstLevel, secondLevel, thirdLevel],
  titles,
  page,
  triggerRender,
}) {
  const [trigger, setTrigger] = useState(false);

  const triggerFn = () => {
    setTrigger(true);
    console.log("inside triggerFn before if trigger = ", trigger);
    if (trigger) {
      console.log("inside triggerFn after if  = ", trigger);
      triggerRender();
      setTrigger(false);
    }
  };
  const navigate = useNavigate();
  const items = [
    { path: "/", breadcrumbName: firstLevel },
    { path: "/", breadcrumbName: secondLevel },
    { path: "/role", breadcrumbName: thirdLevel },
  ];
  return (
    <div>
      <PageHeader
        className="site-page-header"
        title={titles[0]}
        onBack={() => navigate(-1)}
        subTitle={titles[1]}
        breadcrumb={items}
        extra={[
          <div key="createModal" style={{ marginLeft: "auto" }}>
            <CreateModal page={page} triggerRerender={triggerFn} />
          </div>,
        ]}
      />
    </div>
  );
}

const CreateModal = ({ page, triggerRerender }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleCloseModal = () => {
    setIsModalOpen(false);
    triggerRerender();
  };
  return (
    <>
      <Button
        type="primary"
        onClick={() => setIsModalOpen(true)}
        className="bg-green-500 flex items-center"
      >
        <PlusCircleOutlined />
        {`Create New ${page[0].toUpperCase() + page.slice(1)}`}
      </Button>
      <Modal
        title={`Create ${page}`}
        open={isModalOpen}
        onOk={() => setIsModalOpen(false)}
        onCancel={() => setIsModalOpen(false)}
      >
        {page === "floor" && <CreateFloor onCloseModal={handleCloseModal} />}
        {/* {page === "role" && <RoleForm onCloseModal={handleCloseModal} />}
        {page === "user" && <UserForm onCloseModal={handleCloseModal} />} */}
      </Modal>
    </>
  );
};

export default Header;