import { Tabs } from "../../ui/Tabs/Tabs";
import UserManagement from "./atoms/UserManagement";
import DBFunctions from "./atoms/DBFunctions";

export const SuperAdminsPanel = () => {
  return (
    <div>
      <Tabs
        tabs={[
          {
            id: 0,
            text: "Управление пользователями",
            children: <UserManagement />,
          },
          {
            id: 1,
            text: "Процедуры, функции, триггеры",
            children: <DBFunctions />,
          },
        ]}
      ></Tabs>
    </div>
  );
};
