import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchOneStudyplan } from "../../redux/studyplans";
import { fetchCurrentUserUserExercises } from "../../redux/userexercise";
import { useParams } from "react-router-dom";

import { FaCalendarCheck, FaBook, FaUser } from "react-icons/fa";

import './StudyPlanDetails.css';
import ExerciseCard from "../ExerciseCard";

export default function StudyPlanDetails() {

    const { studyplanId } = useParams();

    // console.log(studyplanId);

    const dispatch = useDispatch()

    const currentUser = useSelector((state) => state.session.user);
    const currentStudyplan = useSelector((state) => state.studyplans.currentStudyplan);

    useEffect(() => {
        dispatch(fetchOneStudyplan(parseInt(studyplanId)));
        dispatch(fetchCurrentUserUserExercises(currentUser?.id));
    }, [dispatch, studyplanId])

    if (!currentStudyplan) {
        return <span className="loader"></span>
    }

    return (
        <div className="studyplan-details">
            {/* StudyPlan Image */}
            {/* <div className="studyplan-image">
                <img src={currentStudyplan.imageUrl} alt={currentStudyplan.subject} />
            </div> */}

            {/* StudyPlan Information */}
            <div className="currentStudyplan-info">
                <h2 style={{ textAlign: "start" }}>{currentStudyplan.goal}</h2>
                <div style={{ display: "flex", flexDirection: "row", justifyContent: "start", gap: "10px" }}>
                    <p><strong><FaBook /></strong> {currentStudyplan.subject}</p>
                    <p>|</p>
                    <p><strong><FaCalendarCheck /></strong> {currentStudyplan.deadline}</p>
                    <p>|</p>
                    <p><strong><FaUser /></strong> {currentStudyplan.User?.username}</p>
                </div>
            </div>

            {/* Exercises Section */}
            <div className="currentStudyplan-exercises">
                <h3>Exercises</h3>
                <ul>
                    {currentStudyplan.Exercises?.map((exercise) => (
                        <ExerciseCard key={exercise.id} exercise={exercise} userId={currentUser?.id} />
                    ))}
                </ul>
            </div>
        </div>
    );

}