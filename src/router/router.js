import React, { Suspense } from "react";
import { Outlet, Route, Routes } from "react-router-dom";
import Dashboard from "../Components/dashboard";
import ContactList from "../Components/common/contact";
import InternalStorage from "../Components/common/internalStorage";
import InstalledAppList from "../Components/common/appsInstalled";
import CallsList from "../Components/common/calls";
import NotificationList from "../Components/common/notifications";
import MessagesLogs from "../Components/common/messages";
import LocationList from "../Components/common/locationGPS";
import Map from "../Components/common/map";
import Telegram from "../Components/common/Social/telegram";
import WhatsApp from "../Components/common/Social/whatsapp";
import WhatsApp4b from "../Components/common/Social/whatsapp4b";
import DCIM from "../Components/common/Camera/dcim";
import Pictures from "../Components/common/Camera/Pictures";
import AllFiles from "../Components/allfiles";
import Dash from "../Components/dashboard1";

const DefaultRouter = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <Outlet /> {/* Renders the nested route */}
      </Suspense>

      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/contactlist/user/*" element={<ContactList />} />
        <Route path="/internal-storage/user/*" element={<InternalStorage />} />
        <Route path="/installed-apps/user/*" element={<InstalledAppList />} />
        <Route path="/calls/user/*" element={<CallsList />} />
        <Route path="/notifications/user/*" element={<NotificationList />} />
        <Route path="/messages/user/*" element={<MessagesLogs />} />
        <Route path="/location/user/*" element={<LocationList />} />
        <Route path="/social/telegram" element={<Telegram />} />
        <Route path="/social/whatsapp" element={<WhatsApp />} />
        <Route path="/social/whatsapp4b" element={<WhatsApp4b />} />
        <Route path="/camera/dcim" element={<DCIM />} />
        <Route path="/camera/pictures" element={<Pictures />} />
        <Route path="/camera/allfiles" element={<AllFiles />} />
        <Route path="/user/map" element={<Map />} />
      </Routes>
    </div>
  );
};

export default DefaultRouter;
