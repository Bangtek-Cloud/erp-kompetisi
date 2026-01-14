import AppsLayout from "@/layout/appLayout";
import DashboardIndex from "@/screen/dashboard/main";
import AccountSettings from "@/screen/dashboard/account";
import FinancePage from "@/screen/dashboard/finance";
import DonorsPage from "@/screen/dashboard/finance/donors";
import PublicFinancePage from "@/screen/dashboard/finance/public";
import FinancialReportsPage from "@/screen/dashboard/finance/report";
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
import ProtectedRoute from "@/components/protectedRoute";
import RedirectRoute from "@/components/redirectRoute";
import RegisterPage from "@/screen/auth/register";
import RegisterForTournament from "@/screen/dashboard/main/registerForTournament";
import TournamentUpdatePage from "@/screen/dashboard/main/tournament/update";
import ConfirmTournament from "@/screen/dashboard/main/tournament/confirm";
import NotificationPage from "@/screen/dashboard/main/notification";
import EventUpdateOrCreate from "@/screen/dashboard/main/schedule/updateOrCreate";
import TermsPage from "@/screen/landing/terms";
import PrivacyPage from "@/screen/landing/privacy";
import WebsiteIndex from "@/screen/dashboard/management/website";
import useAuthStore from "@/store/feature/authStand";
import WebsiteRouteIndex from "@/screen/dashboard/management/webRouter";
import UpdateOrCreateWebsiteRoute from "@/screen/dashboard/management/webRouter/updateOrCreate";
import Userlist from "@/screen/dashboard/management/user";
import AccountSettingById from "@/screen/dashboard/management/user/updateUser";
import UserSessionlist from "@/screen/dashboard/management/session";
import AssetsManagement from "@/screen/dashboard/finance/assets";
import BankManagement from "@/screen/dashboard/management/bank";
import NewBankAccount from "@/screen/dashboard/management/bank/new";
import UpdateBankAccount from "@/screen/dashboard/management/bank/update";
import GalleryPage from "@/screen/dashboard/gallery";
import ClipPage from "@/screen/dashboard/clip";
import { ArticleListPage } from "@/screen/dashboard/article";
import { ArticleFormPage } from "@/screen/dashboard/article/upsert";
import EventLanding from "@/screen/landing/event";
import TournamentLanding from "@/screen/landing/tournament";
import GalleryLanding from "@/screen/landing/gallery";
import VideosLanding from "@/screen/landing/clip";
import ArticlesLanding from "@/screen/landing/article";
import ArticleDetail from "@/screen/landing/detailArticle";

export default function AppRouter() {
    const { user } = useAuthStore();
    const isAdmin = user?.role === "ADMIN" || user?.role === "SU";
    const isEditor = user?.role === "EDITOR" || user?.role === 'ADMIN' || user?.role === 'SU';

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<LandingLayout />} errorElement={<h1>Terjadi kesalahan</h1>} loader={() => new Promise(resolve => setTimeout(resolve, 1000))}>
                    <Route index element={<LandingHome />} />
                    <Route path="events" element={<EventLanding />} />
                    <Route path="tournaments" element={<TournamentLanding />} />
                    <Route path="gallery" element={<GalleryLanding />} />
                    <Route path="videos" element={<VideosLanding />} />
                    <Route path="articles" element={<ArticlesLanding />} />
                    <Route path="article/:id" element={<ArticleDetail />} />
                    <Route path="terms" element={<TermsPage />} />
                    <Route path="privacy" element={<PrivacyPage />} />
                    <Route path="*" element={<Navigate to="/" />} />
                </Route>

                <Route element={<RedirectRoute />}>
                    <Route path="auth" element={<AuthLayout />} errorElement={<h1>Terjadi kesalahan</h1>}>
                        <Route index element={<Navigate to="/auth/login" />} />
                        <Route path="login" element={<LoginPage />} />
                        <Route path="register" element={<RegisterPage />} />
                        <Route path="*" element={<Navigate to="/auth/login" />} />
                    </Route>
                </Route>

                {/* Protected Routes */}
                <Route element={<ProtectedRoute />}>
                    <Route path="apps" element={<AppsLayout />}>
                        <Route index element={<Navigate to="/apps/home" />} />
                        <Route path="home" element={<DashboardIndex />} />
                        <Route path="match" element={<MatchesPage />} />
                        <Route path="tournament" element={<TournamentsPage />} />
                        <Route path="tournament/create" element={<TournamentUpdatePage actionType="create" />} />
                        <Route path="tournament/update/:tournamentId" element={<TournamentUpdatePage actionType="update" />} />
                        <Route path="tournament/register/:tournamentId" element={<RegisterForTournament />} />
                        <Route path="tournament/confirm/:tournamentId" element={<ConfirmTournament />} />
                        <Route path="tournament/user/:tournamentId" element={<TechniciansPage />} />
                        {/* <Route path="technician" element={<TechniciansPage />} /> */}
                        <Route path="schedule" element={<SchedulePage />} />
                        <Route path="schedule/create" element={<EventUpdateOrCreate actionType="create" />} />
                        <Route path="schedule/update/:eventId" element={<EventUpdateOrCreate actionType="update" />} />
                        <Route path="leaderboard" element={<LeaderboardPage />} />
                        <Route path="reports" element={<ReportsPage />} />
                        <Route path="settings" element={<AccountSettings />} />
                        <Route path="notification" element={<NotificationPage />} />

                        {isAdmin && (
                            <Route path="management">
                                <Route path="website" element={<WebsiteIndex />} />
                                <Route path="web-route" element={<WebsiteRouteIndex />} />
                                <Route path="web-route/create" element={<UpdateOrCreateWebsiteRoute actionType="create" />} />
                                <Route path="web-route/update/:webRouteId" element={<UpdateOrCreateWebsiteRoute actionType="update" />} />

                                <Route path="user" element={<Userlist />} />
                                <Route path="user/:userId" element={<AccountSettingById />} />

                                <Route path="session" element={<UserSessionlist />} />

                                <Route path="bank" element={<BankManagement />} />
                                <Route path="bank/new" element={<NewBankAccount />} />
                                <Route path="bank/update/:id" element={<UpdateBankAccount />} />
                            </Route>
                        )}

                        {isEditor && (
                            <Route path="editor">
                                <Route path="gallery" element={<GalleryPage />} />
                                <Route path="video" element={<ClipPage />} />
                                <Route path="article" element={<ArticleListPage />} />
                                <Route path="article/create" element={<ArticleFormPage mode="create" />} />
                                <Route path="article/:id" element={<ArticleFormPage mode="edit" />} />

                            </Route>
                        )}

                        <Route path="finance">
                            <Route index element={<Navigate to="/apps/finance/home" />} />
                            <Route path="home" element={<FinancePage />} />
                            <Route path="assets" element={<AssetsManagement />} />
                            <Route path="reports" element={<FinancialReportsPage />} />
                            <Route path="public" element={<PublicFinancePage />} />
                            <Route path="donors" element={<DonorsPage />} />
                            <Route path="*" element={<Navigate to="/apps/finance/home" />} />
                        </Route>

                        <Route path="*" element={<Navigate to="/apps/home" />} />
                    </Route>
                </Route>
            </Routes>
        </BrowserRouter>
    );
}
