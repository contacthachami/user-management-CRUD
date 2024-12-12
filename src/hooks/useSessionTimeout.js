import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { updateLastActivity, endSession } from '../redux/sessionSlice';

const useSessionTimeout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isSessionActive } = useSelector((state) => state.session);

  useEffect(() => {
    const handleActivity = () => {
      dispatch(updateLastActivity());
    };

    const activityEvents = ['mousemove', 'keydown', 'click'];
    activityEvents.forEach((event) =>
      window.addEventListener(event, handleActivity)
    );

    const interval = setInterval(() => {
      if (!isSessionActive) {
        navigate('/login'); // Redirige vers la page de connexion
        clearInterval(interval);
      }
    }, 1000);

    return () => {
      activityEvents.forEach((event) =>
        window.removeEventListener(event, handleActivity)
      );
      clearInterval(interval);
    };
  }, [dispatch, isSessionActive, navigate]);
};

export default useSessionTimeout;
