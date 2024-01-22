import { Provider } from "react-redux";
import { Content } from "./components/Content/Content";
import Header from "./components/Header/Header";
import { store } from "./store";
import Sidebar from "./components/Sidebar/Sidebar";
import { useWindowWidth } from "./shared/customHooks";

function App() {
  const isDesktop = useWindowWidth();

  return (
    <Provider store={store}>
      <div className='container'>
        <Header />
        <div className='main'>
          {isDesktop && <Sidebar />}
          <Content />
        </div>
      </div>
    </Provider>
  );
}

export default App;