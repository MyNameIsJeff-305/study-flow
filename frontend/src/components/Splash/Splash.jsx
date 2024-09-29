import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchAllStudyplans } from '../../redux/studyplans';
import StudyPlanCard from '../StudyPlanCard/StudyPlanCard';

import './Splash.css';
import OpenModalMenuItem from '../Navigation/OpenModalMenuItem';
import AddStudyPlan from '../AddStudyPlan/AddStudyPlan';

const Splash = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [studyPlanChecker, setStudyPlanChecker] = useState(false);

  const studyplans = useSelector((state) => state.studyplans.allStudyplans);
  const user = useSelector((state) => state.session.user);

  useEffect(() => {
    dispatch(fetchAllStudyplans());
    setStudyPlanChecker(false);
  }, [dispatch, studyPlanChecker]);

  if (studyplans.length === 0) {
    return <span className="loader"></span>
  }

  const onModalClose = () => {
    // setStudyPlanChecker(true);
  }

  // console.log(user.user.id, "THIS IS THE USER");

  return (
    <div className="splash-main-container">
      <div style={{ display: "flex", flexDirection: "row", alignItems: "space-between", justifyContent: "space-between" }}>
        <h1>Looking for what to study today?</h1>
        {user && (
          <div className='add-study-plan' style={{ listStyle: "none", alignItems: "center", alignContent: "center" }}>
            <OpenModalMenuItem
              itemText={"Create a Study Plan"}
              modalComponent={<AddStudyPlan userId={user.user?.id || user.id} setStudyPlanChecker={setStudyPlanChecker} />}
              onModalClose={onModalClose}
            />
          </div>
        )}
      </div>
      <div className='study-plans-container'>
        {studyplans.map((studyplan) => (
          <div key={studyplan.id} onClick={() => navigate(`/studyplans/${studyplan.id}`)}>
            <StudyPlanCard key={studyplan.id} studyplan={studyplan} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Splash;
