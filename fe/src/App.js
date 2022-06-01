import './App.css';
import { useRoutes } from 'react-router-dom';
import { routes } from './Routes/Routes';
import { Suspense, useRef } from 'react';
import { Toast } from 'primereact/toast';

function App() {
  const toast = useRef(null);

  const showSuccess = (value) => {
    toast.current.show({ severity: 'success', summary: value.detail, detail: value.message });
  }

  return (
    <>
      <Toast ref={toast} />
      <Suspense fallback={<div>Loading ...</div>}>
        {
          useRoutes(routes({showSuccess}))
        }
      </Suspense>
    </>
  )
}

export default App;
