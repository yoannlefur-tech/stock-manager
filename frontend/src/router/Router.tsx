import { Navigate, Route, Routes } from "react-router-dom"
import Layout from "../components/Layout"
import LoginPage from "../pages/LoginPage"
import HomePage from "../pages/HomePage"
import ProfilPage from "../pages/ProfilPage"
import StockPage from "../pages/Stocks/StockPage"
import ProductPage from "../pages/Stocks/ProductPage"
import CategoryPage from "../pages/Stocks/CategoryPage"
import BrandPage from "../pages/Stocks/BrandPage"
import { useAuth } from "../hooks/useAuth"
import { Paths } from "../types/router"
import ProductDetailsPage from "../pages/Stocks/ProductDetailsPage"
import ProductFormPage from "../pages/Stocks/ProductFormPage"
import CategoryDetailsPage from "../pages/Stocks/CategoryDetailsPage"
import CategoryFormPage from "../pages/Stocks/CategoryFormPage"
import BrandDetailsPage from "../pages/Stocks/BrandDetailsPage"
import BrandFormPage from "../pages/Stocks/BrandFormPage"
import ScanPage from "../pages/ScanPage"

function PrivateRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuth()
  return isAuthenticated ? <>{children}</> : <Navigate to={Paths.Login} />
}

export const Router = () => {

    return (
        <Routes>
            <Route path={Paths.Login} element={<LoginPage />} />
            <Route element={
                <PrivateRoute>
                    <Layout />
                </PrivateRoute>
            }>
                <Route path={Paths.Default} element={<Navigate to={Paths.Home} />} />

                <Route path={Paths.Home} element={<HomePage />} />

                <Route path={Paths.Profile} element={<ProfilPage />} />

                <Route path={Paths.Scan} element={<ScanPage />} />

                <Route path={Paths.Stocks} element={<StockPage />} />

                <Route path={Paths.ProductList} element={<ProductPage />} />
                <Route path={Paths.ProductDetails} element={<ProductDetailsPage />} />
                <Route path={Paths.ProductNew} element={<ProductFormPage />} />
                <Route path={Paths.ProductEdit} element={<ProductFormPage />} />

                <Route path={Paths.CategoryList} element={<CategoryPage />} />
                <Route path={Paths.CategoryDetails} element={<CategoryDetailsPage />} />
                <Route path={Paths.CategoryNew} element={<CategoryFormPage />} />
                <Route path={Paths.CategoryEdit} element={<CategoryFormPage />} />

                <Route path={Paths.BrandList} element={<BrandPage />} />
                <Route path={Paths.BrandDetails} element={<BrandDetailsPage />} />
                <Route path={Paths.BrandNew} element={<BrandFormPage />} />
                <Route path={Paths.BrandEdit} element={<BrandFormPage />} />
            </Route>
        </Routes>
    )

}