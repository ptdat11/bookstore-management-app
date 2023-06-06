import { createHashRouter } from "react-router-dom";
import FullWidthLayout from "./components/layout/fullwidth-layout/FullWidthLayout";
import ImportPage from "./routes/import/ImportPage";
import BillCreatePage from "./routes/bill/BillCreatePage";
import MonthlyReportPage from "./routes/report/MonthlyReportPage";
import SearchPage from "./routes/search/SearchPage";
import PayDebtPage from "./routes/debt/PayDebtPage";
import SettingsPage from "./routes/settings/SettingsPage";
import ErrorPage from "./routes/error/ErrorPage";

export const router = createHashRouter([
    {
      path: "/",
      errorElement: <ErrorPage id="error" />,
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
  ], {
    basename: "/"
  });