// import React, { useState } from "react";
// import styles from "./AdminHeader.module.css";
// import {
//   FaUser,
//   FaUsers,
//   FaCalendarAlt,
//   FaUserCheck,
//   FaChartBar,
//   FaTools,
//   FaUserPlus,
//   FaSignOutAlt,
//   FaPhotoVideo,
//   FaBars,
//   FaTimes,
// } from "react-icons/fa";

// const tabs = [
//   { key: "events", label: "Events", icon: <FaCalendarAlt /> },
//   { key: "other-tools", label: "Other Tools", icon: <FaTools /> },
//   { key: "media", label: "Media", icon: <FaPhotoVideo /> },
//   { key: "leaders", label: "Exec Leaders", icon: <FaUser /> },
//   { key: "scc-leaders", label: "SCC Leaders", icon: <FaUsers /> },
//   { key: "members", label: "Join Requests", icon: <FaUserCheck /> },
//   { key: "join-sccs", label: "SCC Members", icon: <FaUserPlus /> },
//   { key: "join-group", label: "Group Members", icon: <FaUsers /> },
//   { key: "reports", label: "Reports", icon: <FaChartBar /> },
// ];

// export default function AdminHeader({
//   activeTab,
//   setActiveTab,
//   onLogout,
//   pendingCount = 0,
// }) {
//   const [menuOpen, setMenuOpen] = useState(false);

//   const handleTab = (key) => {
//     setActiveTab(key);
//     setMenuOpen(false);
//   };

//   return (
//     <>
//       <header className={styles.header}>
//         <div className={styles.topBar}>
//           <div className={styles.brand}>
//             <img
//               src="/others/catcom-logo.png"
//               alt="CATCOM Logo"
//               className={styles.logo}
//             />
//             <div className={styles.brandText}>
//               <span className={styles.brandName}>CATCOM</span>
//               <span className={styles.brandSub}>Admin Panel · JKUAT</span>
//             </div>
//           </div>

//           <div className={styles.topActions}>
//             <button className={styles.signOutBtn} onClick={onLogout}>
//               <FaSignOutAlt />
//               <span>Sign Out</span>
//             </button>
//             <button
//               className={styles.menuToggle}
//               onClick={() => setMenuOpen((o) => !o)}
//             >
//               {menuOpen ? <FaTimes /> : <FaBars />}
//             </button>
//           </div>
//         </div>

//         <nav className={styles.navbar}>
//           {tabs.map((tab) => (
//             <button
//               key={tab.key}
//               className={`${styles.navItem} ${activeTab === tab.key ? styles.active : ""}`}
//               onClick={() => handleTab(tab.key)}
//             >
//               <span className={styles.icon}>{tab.icon}</span>
//               <span className={styles.label}>{tab.label}</span>
//               {tab.key === "members" && pendingCount > 0 && (
//                 <span className={styles.navBadge}>
//                   {pendingCount > 99 ? "99+" : pendingCount}
//                 </span>
//               )}
//               {activeTab === tab.key && <span className={styles.activePill} />}
//             </button>
//           ))}
//         </nav>
//       </header>

//       {menuOpen && (
//         <div
//           className={styles.mobileOverlay}
//           onClick={() => setMenuOpen(false)}
//         />
//       )}
//       <div
//         className={`${styles.mobileDrawer} ${menuOpen ? styles.drawerOpen : ""}`}
//       >
//         <div className={styles.drawerHeader}>
//           <span className={styles.drawerTitle}>Navigation</span>
//           <button
//             className={styles.drawerClose}
//             onClick={() => setMenuOpen(false)}
//           >
//             <FaTimes />
//           </button>
//         </div>
//         {tabs.map((tab) => (
//           <button
//             key={tab.key}
//             className={`${styles.drawerItem} ${activeTab === tab.key ? styles.drawerActive : ""}`}
//             onClick={() => handleTab(tab.key)}
//           >
//             <span className={styles.drawerIcon}>{tab.icon}</span>
//             {tab.label}
//             {tab.key === "members" && pendingCount > 0 && (
//               <span className={styles.navBadge}>
//                 {pendingCount > 99 ? "99+" : pendingCount}
//               </span>
//             )}
//           </button>
//         ))}
//       </div>
//     </>
//   );
// }

import React, { useState } from "react";
import styles from "./AdminHeader.module.css";
import {
  FaUser,
  FaUsers,
  FaCalendarAlt,
  FaUserCheck,
  FaChartBar,
  FaTools,
  FaUserPlus,
  FaSignOutAlt,
  FaPhotoVideo,
  FaBars,
  FaTimes,
} from "react-icons/fa";

const tabs = [
  { key: "events", label: "Events", icon: <FaCalendarAlt /> },
  { key: "other-tools", label: "Other Tools", icon: <FaTools /> },
  { key: "media", label: "Media", icon: <FaPhotoVideo /> },
  { key: "leaders", label: "Exec Leaders", icon: <FaUser /> },
  { key: "scc-leaders", label: "SCC Leaders", icon: <FaUsers /> },
  { key: "members", label: "Join Requests", icon: <FaUserCheck /> },
  { key: "join-sccs", label: "SCC Members", icon: <FaUserPlus /> },
  { key: "join-group", label: "Group Members", icon: <FaUsers /> },
  { key: "reports", label: "Reports", icon: <FaChartBar /> },
];

export default function AdminHeader({
  activeTab,
  setActiveTab,
  onLogout,
  pendingCount = 0,
}) {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleTab = (key) => {
    setActiveTab(key);
    setMenuOpen(false);
  };

  return (
    <>
      <header className={styles.header}>
        <div className={styles.topBar}>
          <div className={styles.brand}>
            <img
              src="/others/catcom-logo.png"
              alt="CATCOM Logo"
              className={styles.logo}
            />
            <div className={styles.brandText}>
              <span className={styles.brandName}>CATCOM</span>
              <span className={styles.brandSub}>Admin Panel · JKUAT</span>
            </div>
          </div>

          <div className={styles.topActions}>
            <button className={styles.signOutBtn} onClick={onLogout}>
              <FaSignOutAlt />
              <span>Sign Out</span>
            </button>
            <button
              className={styles.menuToggle}
              onClick={() => setMenuOpen((o) => !o)}
            >
              {menuOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>
        </div>

        <nav className={styles.navbar}>
          {tabs.map((tab) => (
            <button
              key={tab.key}
              className={`${styles.navItem} ${activeTab === tab.key ? styles.active : ""}`}
              onClick={() => handleTab(tab.key)}
            >
              <span className={styles.icon}>{tab.icon}</span>
              <span className={styles.label}>{tab.label}</span>
              {tab.key === "members" && pendingCount > 0 && (
                <span className={styles.navBadge}>
                  {pendingCount > 99 ? "99+" : pendingCount}
                </span>
              )}
              {activeTab === tab.key && <span className={styles.activePill} />}
            </button>
          ))}
        </nav>
      </header>

      {menuOpen && (
        <div
          className={styles.mobileOverlay}
          onClick={() => setMenuOpen(false)}
        />
      )}
      <div
        className={`${styles.mobileDrawer} ${menuOpen ? styles.drawerOpen : ""}`}
      >
        <div className={styles.drawerHeader}>
          <span className={styles.drawerTitle}>Navigation</span>
          <button
            className={styles.drawerClose}
            onClick={() => setMenuOpen(false)}
          >
            <FaTimes />
          </button>
        </div>
        {tabs.map((tab) => (
          <button
            key={tab.key}
            className={`${styles.drawerItem} ${activeTab === tab.key ? styles.drawerActive : ""}`}
            onClick={() => handleTab(tab.key)}
          >
            <span className={styles.drawerIcon}>{tab.icon}</span>
            {tab.label}
            {tab.key === "members" && pendingCount > 0 && (
              <span className={styles.navBadge}>
                {pendingCount > 99 ? "99+" : pendingCount}
              </span>
            )}
          </button>
        ))}
      </div>
    </>
  );
}
