import { Tabs } from "../../ui/Tabs/Tabs";
import AuthorStatsCSVDownloader from "./atoms/AuthorStatsCSV";
import PasswordReset from "./atoms/PasswordReset";
import ReportsTab from "./atoms/ReportsTab";
import AuthorStatsChart from "./atoms/Statistics";
import TablesData from "./atoms/TablesData";

export const AdminsPanel = () => {
  return (
    <div>
      <Tabs
        tabs={[
          {
            id: 0,
            text: "Сброс пароля",
            children: <PasswordReset />,
          },
          {
            id: 1,
            text: "Данные таблиц",
            children: <TablesData />,
          },
          {
            id: 2,
            text: "Статистика авторов",
            children: <AuthorStatsChart />,
          },
          {
            id: 3,
            text: "Статистика автора",
            children: <AuthorStatsCSVDownloader />,
          },
          {
            id: 4,
            text: "Отчеты",
            children: <ReportsTab />,
          },
        ]}
      ></Tabs>
    </div>
  );
};
