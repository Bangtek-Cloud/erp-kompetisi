import AppsLayout from "@/layout/appLayout";
import DashboardIndex from "@/screen/dashboard/main";
import AccountSettings from "@/screen/dashboard/account";
import FinancePage from "@/screen/dashboard/finance";
import DonorsPage from "@/screen/dashboard/finance/donors";
import PublicFinancePage from "@/screen/dashboard/finance/public";
import FinancialReportsPage from "@/screen/dashboard/finance/report";
import TransactionsPage from "@/screen/dashboard/finance/transactions";
import MatchesPage from "@/screen/dashboard/main/match";
import SchedulePage from "@/screen/dashboard/main/schedule";
import TechniciansPage from "@/screen/dashboard/main/technicians";
import TournamentsPage from "@/screen/dashboard/main/tournament";
import LandingHome from "@/screen/landing/home";
import { BrowserRouter, Navigate, Route, Routes } from "react-router";
import LeaderboardPage from "@/screen/dashboard/management/leaderboard";
import ReportsPage from "@/screen/dashboard/management/report";
import AuthLayout from "@/layout/authLayout";
import LoginPage from "@/screen/auth/login";
import LandingLayout from "@/layout/landingLayout";

export default function AppRouter() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<LandingLayout />}>
                    <Route index element={<LandingHome />} />
                    <Route path="*" element={<Navigate to="/" />} />
                </Route>
                <Route path="apps" element={<AppsLayout />}>
                    <Route index element={<Navigate to="/apps/home" />} />
                    <Route path="home" element={<DashboardIndex />} />
                    <Route path="match" element={<MatchesPage />} />
                    <Route path="tournament" element={<TournamentsPage />} />
                    <Route path="technician" element={<TechniciansPage />} />
                    <Route path="schedule" element={<SchedulePage />} />
                    <Route path="leaderboard" element={<LeaderboardPage />} />
                    <Route path="reports" element={<ReportsPage />} />
                    <Route path="settings" element={<AccountSettings />} />
                    <Route path="finance">
                        <Route index element={<Navigate to="/apps/finance/home" />} />
                        <Route path="home" element={<FinancePage />} />
                        <Route path="transactions" element={<TransactionsPage />} />
                        <Route path="reports" element={<FinancialReportsPage />} />
                        <Route path="public" element={<PublicFinancePage />} />
                        <Route path="donors" element={<DonorsPage />} />
                        <Route path="*" element={<Navigate to="/apps/finance/home" />} />
                    </Route>
                    <Route path="*" element={<Navigate to="/apps" />} />
                </Route>
                <Route path="auth" element={<AuthLayout />}>
                    <Route index element={<Navigate to="/auth/login" />} />
                    <Route path="login" element={<LoginPage />} />
                    <Route path="register" element={<h1>Register under development</h1>} />
                    <Route path="*" element={<Navigate to="/auth" />} />
                </Route>
            </Routes>
        </BrowserRouter >
    )
}