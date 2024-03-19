/* eslint-disable react/prop-types */
import { PageHeader } from "@ant-design/pro-layout";
import { useNavigate } from "react-router-dom";
import { PlusCircleOutlined } from "@ant-design/icons";
import { Button, Modal } from "antd";
import { useEffect, useState } from "react";
import {
  CreateBed,
  CreateDoctor,
  CreateFloor,
  CreateNurseStation,
  CreatePatient,
  CreateRemote,
  // CreatePatient,
  CreateWard,
} from "./Forms";

function Header({
  headerRoutes: [firstLevel, secondLevel, thirdLevel],
  titles,
  page,
  triggerRender,
}) {
  const [trigger, setTrigger] = useState(false);

  const triggerFn = () => {
    setTrigger((prev) => !prev);
    triggerRender();
  };
  const navigate = useNavigate();
  const items = [
    { path: "/", breadcrumbName: firstLevel },
    { path: "/", breadcrumbName: secondLevel },
    { path: "/", breadcrumbName: thirdLevel },
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
  // const [floorOptions, setFloorOptions] = useState([]);
  // const dispatch = useDispatch();
  const handleCloseModal = () => {
    setIsModalOpen(false);
    triggerRerender();
  };
  // const token = useSelector((state) => state.login.token);
  // useEffect(() => {
  //   const getFloorOptions = async () => {
  //     const res = await dispatch(floorHelper(token));
  //     setFloorOptions(res.payload.data);
  //   };

  //   getFloorOptions();
  // }, [isModalOpen]);

  // const prepareFloorOptions = floorOptions.map((item) => ({
  //   value: item.uid,
  //   label: `${item.name} - ${item.floor_no}`,
  // }));

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
        {page === "ward" && <CreateWard onCloseModal={handleCloseModal} />}
        {page === "bed" && <CreateBed onCloseModal={handleCloseModal} />}
        {page === "Nurse Station" && (
          <CreateNurseStation onCloseModal={handleCloseModal} />
        )}
        {page === "Patient" && (
          <CreatePatient onCloseModal={handleCloseModal} />
        )}
        {page === "Doctor" && <CreateDoctor onCloseModal={handleCloseModal} />}
        {page === "Remote" && <CreateRemote onCloseModal={handleCloseModal} />}
        {/* {page === "role" && <RoleForm onCloseModal={handleCloseModal} />}
        {page === "user" && <UserForm onCloseModal={handleCloseModal} />} */}
      </Modal>
    </>
  );
};

export default Header;
