import React, { useEffect, useState } from "react";
import { getRequests, resetPasswordResponse } from "./logic/admin";
import { Tabs } from "../../ui/Tabs/Tabs";
import PasswordReset from "./atoms/PasswordReset";
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
        ]}
      ></Tabs>
    </div>
  );
};
