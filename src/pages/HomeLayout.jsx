import { Breadcrumb, Layout, Menu, theme } from "antd";
import IconGenerator from "../components/IconGenerator";
import { Outlet, useNavigate } from "react-router-dom";
const { Header, Content, Sider } = Layout;
const items = [
  {
    key: "dashboard",
    icon: (
      <IconGenerator style={{ marginBlock: "center" }} props={"dashboard"} />
    ),
    label: "Dashboard",
    link: "/",
  },
  {
    key: "ward",
    icon: <IconGenerator style={{ marginBlock: "center" }} props={"ward"} />,
    label: "Ward/Cabin",
    link: "/ward",
  },
  {
    key: "nurse_station",
    icon: (
      <IconGenerator
        style={{ marginBlock: "center" }}
        props={"nurse_station"}
      />
    ),
    label: "Nurse Station",
    link: "/nurse_station",
  },
  {
    key: "bed",
    icon: <IconGenerator style={{ marginBlock: "center" }} props={"bed"} />,
    label: "Bed",
    link: "/bed",
  },
  {
    key: "doctor",
    icon: <IconGenerator style={{ marginBlock: "center" }} props={"doctor"} />,
    label: "Doctor",
    link: "/doctor",
  },
  {
    key: "patient",
    icon: <IconGenerator style={{ marginBlock: "center" }} props={"patient"} />,
    label: "Patient",
    link: "/patient",
  },
];

const HomeLayout = () => {
  const navigate = useNavigate();
  const handleMenuItemClick = (childItem) => {
    childItem.key !== "dashboard"
      ? navigate(`/${childItem.key}`)
      : navigate("/");
  };
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  return (
    <Layout>
      <Header
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          backgroundColor: "white",
        }}
      >
        <img src="./NurseCare.png" width="100px" margin="0" padding="0" />
        <img src="./icons/login.png" width="20px" margin="0" padding="0" />
      </Header>
      <Layout>
        <Sider
          breakpoint="lg"
          collapsedWidth="0"
          onBreakpoint={(broken) => {}}
          onCollapse={(collapsed, type) => {
            // console.log(collapsed, type);
          }}
          width={200}
          style={{
            background: colorBgContainer,
            paddingTop: "3.25em",
          }}
        >
          <Menu
            mode="inline"
            defaultSelectedKeys={["1"]}
            defaultOpenKeys={["sub1"]}
            style={{
              height: "100%",
              borderRight: 0,
            }}
            items={items}
            onClick={handleMenuItemClick}
          />
        </Sider>
        <Layout
          style={{
            padding: "0 24px 24px",
          }}
        >
          <Breadcrumb
            style={{
              margin: "16px 0",
            }}
          >
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>List</Breadcrumb.Item>
            <Breadcrumb.Item>App</Breadcrumb.Item>
          </Breadcrumb>
          <Content
            style={{
              padding: 24,
              margin: 0,
              minHeight: 280,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
              flexGrow: 1,
            }}
          >
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};
export default HomeLayout;
