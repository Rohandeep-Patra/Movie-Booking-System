import React from "react";
import { Tabs } from "antd";
import MoviesList from "./MoviesList";
import TheaterList from "./TheaterList";

const Admin = () => {
  return (
    <>
      <div className="p-3 px-5">
        <p className=" text-2xl uppercase  font-poppins">admin</p>

        <Tabs className=" font-poppins" defaultActiveKey="1">
          <Tabs.TabPane className=" " tab="Movies" key="1">
            <MoviesList/>
          </Tabs.TabPane>
          <Tabs.TabPane className=" " tab="Theaters" key="2">
            <TheaterList/>
          </Tabs.TabPane>
        </Tabs>
      </div>
    </>
  );
};

export default Admin;
