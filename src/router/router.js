import React, { Suspense } from "react";
import { Outlet, Route, Routes } from "react-router-dom";
import UserComponent from "../components/Users";
import ContactList from "../components/common/contact";
import CallsList from "../components/common/calls";
import Map from "../components/common/map";
import InternalStorage from "../components/common/internalStorage";
import InstalledAppList from "../components/common/appsInstalled";
import LocationList from "../components/common/locationGPS";

const DefaultRouter = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <Outlet /> {/* Renders the nested route */}
      </Suspense>

      <Routes>
        <Route path="/" element={<UserComponent />} />
        <Route path="/contactlist/user/*" element={<ContactList />} />
        <Route path="/internal-storage/user/*" element={<InternalStorage />} />
        <Route path="/installed-apps/user/*" element={<InstalledAppList />} />
        <Route path="/calls/user/*" element={<CallsList />} />
        <Route path="/location/user/*" element={<LocationList />} />
        <Route path="/user/map" element={<Map />} />
      </Routes>
    </div>
  );
};

export default DefaultRouter;
