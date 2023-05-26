import { useRecoilState, useRecoilValue } from 'recoil'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import FullWidthLayout from './components/layout/fullwidth-layout/FullWidthLayout';
import { Theme, ToastContainer } from 'react-toastify';
import ImportPage from './routes/import/ImportPage';
import 'react-toastify/dist/ReactToastify.css';
import SearchPage from './routes/search/SearchPage';
import SettingsPage from './routes/settings/SettingsPage';
import { apiUrlSelector, themeState } from './states/system-states';
import MonthlyReportPage from './routes/report/MonthlyReportPage';
import PayDebtPage from './routes/debt/PayDebtPage';
import BillCreatePage from './routes/bill/BillCreatePage';
import useFetch from './hooks/useFetch';
import LocalStorage from './submodules/local-storage/local-storage';

const router = createBrowserRouter([
  {
    path: "/",
    element: <FullWidthLayout id="full-layout" />,
    children: [
      {
        path: "/import",
        element: <ImportPage id="import" />
      },
      {
        path: "/bill",
        element: <BillCreatePage id="bill" />
      },
      {
        path: "/report",
        element: <MonthlyReportPage id="report" />
      },
      {
        path: "/search",
        element: <SearchPage id="search" />
      },
      {
        path: "/debt",
        element: <PayDebtPage id="debt" />
      },
      {
        path: "/settings",
        element: <SettingsPage id="settings" />
      }
    ]
  }
]);

function App() {
  const [theme, setTheme] = useRecoilState(themeState);
  const settingsApiUrl = useRecoilValue(apiUrlSelector("settings"));
  useFetch({
    url: settingsApiUrl,
    method: "POST",
    data: LocalStorage.get("settings")
  }, []);

  return (
    <>
      <ToastContainer 
        position="top-center"
        autoClose={3000} 
        limit={2}
        closeOnClick
        pauseOnHover
        theme={theme as Theme}
      />
      <RouterProvider router={router} />
    </>
  )
}

export default App