import React, { ReactNode, useState } from "react";
import "./Tabs.css";

interface ITab {
  id: number;
  text: string;
  children: ReactNode;
}

interface ITabs {
  tabs: ITab[];
}

export const Tabs = (params: ITabs) => {
  const [activeTab, setActiveTab] = useState(0);
  return (
    <div className="Tabs">
      <div className="TabsNames">
        {params.tabs.map((tab) => (
          <div
            key={tab.id}
            className={`TabName ${activeTab === tab.id ? "active" : ""}`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.text}
          </div>
        ))}
      </div>
      <div className="TabsChildren">
        {params.tabs.find((tab) => tab.id === activeTab)?.children}
      </div>
    </div>
  );
};
