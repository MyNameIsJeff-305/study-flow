import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './ExerciseCard.css';
import { addUserExerciseThunk, fetchCurrentUserUserExercises } from '../../redux/userexercise';

export default function ExerciseCard({ exercise, userId }) {
    const dispatch = useDispatch();

    const completionInfo = useSelector((state) => state.userExercises.currentUserUserExercises);
    const [isChecked, setIsChecked] = useState(false);
    
    useEffect(() => {
        dispatch(fetchCurrentUserUserExercises(userId));
    }, [dispatch, userId]);
    
    const thisExercise = completionInfo.find((userExercise) => userExercise.exerciseId === exercise.id);
    
    useEffect(() => {
        if(!isChecked && thisExercise) {
            setIsChecked(true);
        }
        if (isChecked && !thisExercise) {
            dispatch(addUserExerciseThunk(exercise.id, userId));
        }
    }, [isChecked, thisExercise, dispatch, exercise.id, userId]);
    
    if(!completionInfo) {
        return <div>loading...</div>;
    }
    

    const handleCheckboxChange = () => {
        setIsChecked(!isChecked);
    };

    return (
        <div className="exercise-card-container">
            <input
                type="checkbox"
                checked={isChecked}
                disabled={isChecked}
                onChange={handleCheckboxChange}
            />
            <h3>{exercise.exercise}</h3>
        </div>
    );
}
