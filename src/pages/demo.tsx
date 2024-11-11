import React, { ReactNode, createContext, useContext, useState } from "react";

const LayoutContext = createContext<{ state?: any; setState?: any }>({});
const Layout: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, setState] = useState({
    title: "主标题",
    content: "主内容",
  });

  return (
    <>
      <LayoutContext.Provider value={{ state, setState }}>
        {children}
      </LayoutContext.Provider>
    </>
  );
};

const HomePage: React.FC = () => {
  const { state, setState } = useContext(LayoutContext);

  const handleClick = () => {
    setState({
      ...state,
      content: "改变内容",
    });
  };

  return (
    <>
      <div>
        <div>首页页面：</div>
        <div>标题：{state.title}</div>
        <div>内容：{state.content}</div>

        <button onClick={handleClick}>点我</button>
      </div>
    </>
  );
};

const AboutPage: React.FC = () => {
  const { state } = useContext(LayoutContext);
  return (
    <>
      <div>
        <div>关于页面：</div>
        <div>标题：{state.title}</div>
        <div>内容：{state.content}</div>
      </div>
    </>
  );
};

function App() {
  return (
    <>
      <Layout>
        <HomePage></HomePage>
        <AboutPage></AboutPage>
      </Layout>
    </>
  );
}

export default App;
