import React from "react";
import type { FC } from "react";
import { NavBar, TabBar } from "antd-mobile";

import { TabBar as CTabBar } from "@/components";

import {
  Route,
  Routes, // v6 Switch改成了Routes
  useNavigate, // v6 useHistory改成了useNavigate
  useLocation,
  MemoryRouter as Router,
} from "react-router-dom";
import {
  AppOutline,
  MessageOutline,
  UnorderedListOutline,
  UserOutline,
} from "antd-mobile-icons";

import styles from "./demo2.module.less";

const Bottom: FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { pathname } = location;

  const setRouteActive = (value: string) => {
    navigate(value);
  };

  const activeKey = "/todo";
  const defaultActiveKey = "/message";

  const tabs = [
    {
      key: "/home",
      title: "首页",
      icon: <AppOutline />,
    },
    {
      key: "/todo",
      title: "待办",
      icon: <UnorderedListOutline />,
    },
    {
      key: "/message",
      title: "消息",
      icon: <MessageOutline />,
    },
    {
      key: "/me",
      title: "我的",
      icon: <UserOutline />,
    },
  ];

  return (
    <>
      <TabBar activeKey={activeKey} defaultActiveKey={defaultActiveKey} onChange={(value) => setRouteActive(value)}>
        {tabs.map((item) => (
          <TabBar.Item key={item.key} icon={item.icon} title={item.title} />
        ))}
      </TabBar>

      <CTabBar activeKey={pathname} onChange={(value) => setRouteActive(value)}>
        {tabs.map((item) => (
          <>
            <div>你好</div>
            <CTabBar.Item key={item.key} icon={item.icon} title={item.title} />
          </>
        ))}
      </CTabBar>
    </>
  );
};

const Page = () => {
  return (
    <Router initialEntries={["/home"]}>
      <div className={styles.app}>
        <div className={styles.top}>
          <NavBar>配合路由使用</NavBar>
        </div>
        <div className={styles.body}>
          <Routes>
            <Route path="/home" element={<Home />}></Route>
            <Route path="/todo" element={<Todo />}></Route>
            <Route path="/message" element={<Message />}></Route>
            <Route path="/me" element={<PersonalCenter />}></Route>
          </Routes>
        </div>
        <div className={styles.bottom}>
          <Bottom />
        </div>
      </div>
    </Router>
  );
};
export default Page;

function Home() {
  return <div>首页</div>;
}

function Todo() {
  return <div>待办</div>;
}

function Message() {
  return <div>消息</div>;
}

function PersonalCenter() {
  return <div>我的</div>;
}
