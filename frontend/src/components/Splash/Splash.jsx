import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchAllStudyplans } from '../../redux/studyplans';
import StudyPlanCard from '../StudyPlanCard/StudyPlanCard';

import './Splash.css';

const Splash = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const studyplans = useSelector((state) => state.studyplans.allStudyplans);

  useEffect(() => {
    dispatch(fetchAllStudyplans());
  }, [dispatch]);

  if (studyplans.length === 0) {
    return <span className="loader"></span>
  }

  return (
    <div className="splash-main-container">
      <h1>Looking for what to study today?</h1>
      <div className='study-plans-container'>
        {studyplans.map((studyplan) => (
          <StudyPlanCard key={studyplan.id} studyplan={studyplan} />
        ))}
      </div>
    </div>
  );
}

export default Splash;
