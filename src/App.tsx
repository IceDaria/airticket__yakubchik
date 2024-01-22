import { Provider } from "react-redux";
import { store } from "./store";
import Header from "./components/Header/Header";
import Content from "./components/Content/Content";
import Sidebar from "./components/Sidebar/Sidebar";
import { useWindowSize } from "./shared/customHooks";

const App = () => {
  const { isDesktop } = useWindowSize();

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