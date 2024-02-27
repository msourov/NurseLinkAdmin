import { Space, Table, Tag } from "antd";

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
    dataIndex: "ward",
    key: "ward",
  },
  // {
  //   title: "Tags",
  //   key: "tags",
  //   dataIndex: "tags",
  //   render: (_, { tags }) => (
  //     <>
  //       {tags.map((tag) => {
  //         let color = tag.length > 5 ? "geekblue" : "green";
  //         if (tag === "loser") {
  //           color = "volcano";
  //         }
  //         return (
  //           <Tag color={color} key={tag}>
  //             {tag.toUpperCase()}
  //           </Tag>
  //         );
  //       })}
  //     </>
  //   ),
  // },
  {
    title: "Action",
    key: "action",
    render: (_, record) => (
      <Space size="middle" style={{ margin: "0", padding: "0" }}>
        <Tag>Edit</Tag>
        <Tag>Delete</Tag>
      </Space>
    ),
  },
];

const data = [
  {
    key: "1",
    sl: "01",
    floor_no: "Floor 1",
    ward: "Female Ward",
    tags: ["nice", "developer"],
  },
  {
    key: "2",
    sl: "02",
    floor_no: "Floor 2",
    ward: "Female Cabin",
    tags: ["loser"],
  },
  {
    key: "3",
    sl: "03",
    floor_no: "Floor 3",
    ward: "Male Ward",
    tags: ["cool", "teacher"],
  },
];

const Ward_Cabin = () => {
  return (
    <div>
      <Table columns={columns} dataSource={data} />
    </div>
  );
};

export default Ward_Cabin;
