import ReactDOM from "react-dom/client"
import App from "./App.tsx"
import "./index.css"
import { BrowserRouter } from "react-router-dom"
import { store } from "./app/store"
import { Provider } from "react-redux"
// import {ApiProvider } from "@reduxjs/toolkit/query/react"

// store.dispatch()

ReactDOM.createRoot(document.getElementById("root")!).render(
	<Provider store={store}>
		<BrowserRouter>
			<App />
		</BrowserRouter>
	</Provider>
)
