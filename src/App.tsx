import Layout from "./components/Layout";
import { useEditor } from "./hooks/useEditor";
import Sidebar from "./components/Sidebar";
import CanvasArea from "./components/CanvasArea";

const App = () => {
  const { state, actions, frameRef } = useEditor();

  return (
    <Layout>
      <Sidebar mode={state.mode} values={state} actions={actions} />

      <CanvasArea mode={state.mode} state={{ ...state, frameRef }} />
    </Layout>
  );
};

export default App;
