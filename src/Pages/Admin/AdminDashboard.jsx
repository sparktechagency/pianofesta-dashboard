import OverviewCard from "../../Components/Dashboard/Overview/OverviewCards";
import UserOverview from "../../Components/Dashboard/Overview/UserOverview";
import IncomeOverview from "../../Components/Dashboard/Overview/IncomeOverview";
import RecentUser from "../../Components/Dashboard/Overview/RecentUser";

const AdminDashboard = () => {
  return (
    <div>
      <>
        <div className="my-5">
          <OverviewCard />
        </div>

        <div className="flex flex-col lg:flex-row gap-5 mt-8">
          <UserOverview />
          <IncomeOverview />
        </div>
        <div>
          <RecentUser />
        </div>
      </>
    </div>
  );
};

export default AdminDashboard;
