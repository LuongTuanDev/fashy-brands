import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { DashboardInsightsSection } from "../../components/admin/DashboardInsightsSection";
import { DashboardNavigationSidebarSection } from "../../components/admin/DashboardNavigationSidebarSection";

const Dashboard = () => {
  return (
    <div className="flex flex-col min-h-screen bg-[#0e0e0e]">
      <Header />

      <div className="flex flex-1 pt-[68px] items-stretch">
        {/* Sidebar */}
        <DashboardNavigationSidebarSection />

        {/* Content */}
        <main className="flex-1 min-w-0 overflow-y-auto overflow-x-hidden">
          <div className="max-w-5xl mx-auto px-6 md:px-12 py-12">
            <DashboardInsightsSection />
          </div>
        </main>
      </div>

      <Footer />
    </div>
  );
};

export default Dashboard;