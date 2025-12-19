import Modal from './components/features/Modals/Modal';
import Layout from './components/layout/Layout';
import { AppProvider } from './context/AppContext';

function App() {
  return (
    <AppProvider>
      <Layout container="container" />
      <Modal />
    </AppProvider>
  );
}

export default App;
