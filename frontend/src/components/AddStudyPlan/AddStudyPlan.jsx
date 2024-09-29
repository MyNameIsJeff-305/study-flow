import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useModal } from "../../context/Modal";
import { createStudyplan } from "../../redux/studyplans";
import './AddStudyPlan.css'; // Importing the CSS for styling

export default function AddStudyPlan({ userId, setStudyPlanChecker }) {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [subject, setSubject] = useState('');
    const [goal, setGoal] = useState('');
    const [deadline, setDeadline] = useState('');
    const [imageUrl, setImageUrl] = useState('');

    const [errors, setErrors] = useState({});
    const [isButtonDisabled, setIsButtonDisabled] = useState(true);

    const { closeModal } = useModal();

    useEffect(() => {
        setSubject('');
        setGoal('');
        setDeadline('');
        setImageUrl('');
        setErrors({});
        setIsButtonDisabled(true);
    }, []);

    useEffect(() => {
        let newErrors = {};

        if (subject.length === 0) {
            newErrors.subject = 'Subject is required';
        }
        if (goal.length === 0) {
            newErrors.goal = 'Goal is required';
        }
        if (deadline.length === 0) {
            newErrors.deadline = 'Deadline is required';
        }
        setErrors(newErrors);
        setIsButtonDisabled(Object.keys(newErrors).length > 0);
    }, [subject, goal, deadline]);

    // console.log(userId, "THIS IS THE USER ID");

    const handleSubmit = async (e) => {
        e.preventDefault();
        e.stopPropagation();

        setErrors({});
        const newStudyplanImage = {
            subject,
            goal,
            deadline,
            createdBy: userId,
            imageUrl
        };

        const newStudyplan = {
            subject: subject,
            goal: goal,
            deadline: deadline,
            createdBy: userId
        };

        return dispatch(createStudyplan(imageUrl.length > 0 ? newStudyplanImage : newStudyplan))
            .then(() => {
                setStudyPlanChecker(true);
                closeModal();
                navigate('/');
            })
            .catch(async (res) => {
                const data = await res.json();
                if (data && data.errors) {
                    setErrors(data.errors);
                }
            });

    }

    return (
        <form className="studyplan-form" onSubmit={handleSubmit}>
            <div className="form-group">
                <label htmlFor="subject">Subject</label>
                <textarea
                    id="subject"
                    type="textarea"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className={errors.subject ? 'input-error' : ''}
                />
                {errors.subject && <div className="error-message">{errors.subject}</div>}
            </div>
            <div className="form-group">
                <label htmlFor="goal">Goal</label>
                <input
                    id="goal"
                    type="text"
                    value={goal}
                    onChange={(e) => setGoal(e.target.value)}
                    className={errors.goal ? 'input-error' : ''}
                />
                {errors.goal && <div className="error-message">{errors.goal}</div>}
            </div>
            <div className="form-group">
                <label htmlFor="deadline">Deadline</label>
                <input
                    id="deadline"
                    type="text"
                    value={deadline}
                    onChange={(e) => setDeadline(e.target.value)}
                    className={errors.deadline ? 'input-error' : ''}
                />
                {errors.deadline && <div className="error-message">{errors.deadline}</div>}
            </div>
            <div className="form-group">
                <label htmlFor="imageUrl">Image URL</label>
                <input
                    id="imageUrl"
                    type="text"
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                    className={errors.imageUrl ? 'input-error' : ''}
                />
                {errors.imageUrl && <div className="error-message">{errors.imageUrl}</div>}
            </div>
            <button className="submit-button" type="submit" disabled={isButtonDisabled}>Create Study Plan</button>
        </form>
    )
}
