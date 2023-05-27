import { createBrowserRouter } from "react-router-dom";
import FullWidthLayout from "./components/layout/fullwidth-layout/FullWidthLayout";
import ImportPage from "./routes/import/ImportPage";
import BillCreatePage from "./routes/bill/BillCreatePage";
import MonthlyReportPage from "./routes/report/MonthlyReportPage";
import SearchPage from "./routes/search/SearchPage";
import PayDebtPage from "./routes/debt/PayDebtPage";
import SettingsPage from "./routes/settings/SettingsPage";

export const router = createBrowserRouter([
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