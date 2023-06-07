import { useEffect } from "react";
import { useRecoilState, useRecoilValue } from 'recoil'
import { RouterProvider } from 'react-router-dom'
import { Theme, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { apiUrlSelector, themeState } from './states/system-states';
import useFetch from './hooks/useFetch';
import LocalStorage from './submodules/local-storage/local-storage';
import AppConstraint from './interfaces/app-constraint';
import { jsonFetch } from "./submodules/networking/jsonFetch";
import { router } from "./router";

function App() {
  const [theme, setTheme] = useRecoilState(themeState);
  const settingsApiUrl = useRecoilValue(apiUrlSelector("settings"));

  const appliedSettings = useFetch<AppConstraint[]>({
    url: settingsApiUrl,
    method: "GET",
  }, []);

  useEffect(() => {
    let isCurrent = true;
    const localSettings: AppConstraint | undefined = LocalStorage.get<AppConstraint>("settings");
    if (appliedSettings.data) {
      const serverSettings = appliedSettings.data.at(-1);
      if (
        localSettings?.PaidNotGreaterThanDebt !== serverSettings?.PaidNotGreaterThanDebt ||
        localSettings?.AmountNeedImport !== serverSettings?.AmountNeedImport ||
        localSettings?.BookAmountAfter !== serverSettings?.BookAmountAfter ||
        localSettings?.MaxDebt !== serverSettings?.MaxDebt ||
        localSettings?.MinImport !== serverSettings?.MinImport
      ) {
        if (isCurrent)
          jsonFetch(settingsApiUrl, "POST", localSettings);
      }
    }

    return () => {
      isCurrent = false;
    }
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