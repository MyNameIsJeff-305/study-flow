import { FaPen, FaTrash } from 'react-icons/fa';

import './StudyPlanCard.css';

export default function StudyPlanCard({ studyplan }) {
    return (
        <section style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", cursor: "pointer" }}>
            <img src={studyplan.imageUrl}></img>
            <div style={{ padding: "20px", alignContent: "center", justifyContent: "center" }}>
                <h3>{studyplan.goal}</h3>
                <span>Subject: {studyplan.subject} | Created by: {studyplan.User.username}</span>
            </div>
        </section>
    )
}