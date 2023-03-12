import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RouteAPI } from "../../core/constants/Route.api";
import { logoutUser } from "../../store/slices/authSlice";
import { clearProfileAPI } from "../../store/slices/profileSlices";

export default function useLogout() {
    const dispatchEvent = useDispatch<any>();
    const navigate = useNavigate();

    function onLogout() {
        dispatchEvent(logoutUser());
        dispatchEvent(clearProfileAPI());
        navigate(RouteAPI.Login);
    }

    return onLogout;
}
