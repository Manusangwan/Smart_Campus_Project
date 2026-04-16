import { useNavigate } from "react-router-dom";
import "../../styles/global.css";

import facultyIcon from "../../assets/icons/faculty.png";
import pollIcon from "../../assets/icons/poll.png";
import announceIcon from "../../assets/icons/announcement.png";
import complaintIcon from "../../assets/icons/complaint.png";

export default function DashboardCards() {
  const navigate = useNavigate();

  const cards = [
    {
      title: "Faculty Directory",
      sub: "Find Faculty Details",
      action: "View Directory",
      icon: facultyIcon,
      bg: "sca-card-blue",
      route: "/faculty",
    },
    {
      title: "Poll of the Week",
      sub: "Vote & Share Opinion",
      action: "Vote Now",
      icon: pollIcon,
      bg: "sca-card-green",
      route: "/poll",
    },
    {
      title: "Announcements",
      sub: "Latest Campus Updates",
      action: "View All",
      icon: announceIcon,
      bg: "sca-card-yellow",
      route: "/announcements",
    },
    {
      title: "Raise Complaint",
      sub: "Report Campus Issues",
      action: "Raise Now",
      icon: complaintIcon,
      bg: "sca-card-pink",
      route: "/complaints?new=true",   // 🔥 DIRECT OPEN FORM
    },
  ];

  return (
    <div className="sca-dashboard-grid">
      {cards.map((card, i) => (
        <div
          key={i}
          className={`sca-dashboard-card ${card.bg}`}
          onClick={() => navigate(card.route)}
        >
          <div className="sca-icon-wrapper">
            <img src={card.icon} alt="" />
          </div>

          <h3>{card.title}</h3>
          <p>{card.sub}</p>

          <span className="sca-link">{card.action} →</span>
        </div>
      ))}
    </div>
  );
}