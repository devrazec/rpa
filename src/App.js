import React, { useEffect, useContext, Suspense } from "react";
import { Route, Routes } from 'react-router-dom';

// Custom CSS
import './App.css';

// Data Provider
import { DataContext } from './data/DataContext';

// Components
import ComponentSettings from './component/ComponentSettings';
import ComponentHeader from './component/ComponentHeader';
import ComponentSidebar from './component/ComponentSidebar';
import ComponentFooter from './component/ComponentFooter';
import ComponentLoading from './component/ComponentLoading';

// Pages
import PageHome from './page/PageHome';
import PageNotFound from './page/PageNotFound';
import PageFolder from './page/PageFolder';
import PageJson from './page/PageJson';
import PageScripts from './page/PageScripts';

function App() {

  // Global Data Context    
  const {

    // Theme
    hookTheme

  } = useContext(DataContext);

  return (
    <>
      
      <ComponentLoading />

      <ComponentSettings />
      
      <div style={{ display: "flex", height: "100vh", flexDirection: "column" }}>

        <ComponentHeader />

        <div style={{ display: "flex", flex: 1 }}>

          <ComponentSidebar />

          <Suspense>
            <Routes>
              <Route exact path="/" element={<PageHome />} />
              <Route exact path="/pagefolder" element={<PageFolder />} />
              <Route exact path="/pagejson" element={<PageJson />} />
              <Route exact path="/pagescripts" element={<PageScripts />} />
              <Route exact path="/pagenotfound" element={<PageNotFound />} />
              <Route path="*" element={<PageNotFound />} />
            </Routes>
          </Suspense>

        </div>

        <ComponentFooter />

      </div>

    </>
  );
}

export default React.memo(App);
