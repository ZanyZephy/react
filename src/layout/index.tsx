import React, { ReactNode, createContext, useContext, useState } from "react";

const LayoutContext = createContext<{ state?: any; setState?: any }>({});
const Layout: React.FC<{ children?: ReactNode }> = ({ children }) => {
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

function App() {
  return (
    <>
      <Layout></Layout>
    </>
  );
}

export default App;
