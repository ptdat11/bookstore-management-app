import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index2.css'
import LocalStorage from './submodules/local-storage/local-storage.ts'
import AppConstraint from './interfaces/app-constraint.ts'
import { RecoilRoot } from 'recoil'

if (LocalStorage.get("theme") === "dark") {
  document.documentElement.classList.add("dark");
}

if (!LocalStorage.get<AppConstraint>("settings")) {
  LocalStorage.set("settings", {
    id: 1,
    MinImport: 150,
    AmountNeedImport: 300,
    MaxDebt: 1000000,
    BookAmountAfter: 20,
    PaidNotGreaterThanDebt: true
  });
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RecoilRoot>
      <App />
    </RecoilRoot>
  </React.StrictMode>,
)
