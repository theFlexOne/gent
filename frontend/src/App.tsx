import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainLayout from "./components/layout/MainLayout";
import HomePage from "./pages/home";
import LocationsPage from "./pages/locations";
import PageNotFound from "./pages/pageNotFound";
import ProductsPage from "./pages/products";
import ServicesPage from "./pages/services";
import AppContainer from "./config/AppContainer";

const router = createBrowserRouter([
  {
    Component: AppContainer,
    children: [
      {
        Component: MainLayout,
        children: [
          {
            index: true,
            Component: HomePage,
          },
          {
            path: "/locations/*",
            Component: LocationsPage,
          },
          {
            path: "/services",
            Component: ServicesPage,
          },
          {
            path: "/products",
            Component: ProductsPage,
          },
          {
            path: "/*",
            Component: PageNotFound,
          },
        ],
      },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
