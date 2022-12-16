import React from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom';
export interface withRouterProps {
    location: ReturnType<typeof useLocation>;
    params: Record<string, string>;
    navigate: ReturnType<typeof useNavigate>;
}

const withRouter = <Props extends withRouterProps>(Component: React.ComponentType<Props>) => {
    return (props: Omit<Props, keyof withRouterProps>) => {
        let location = useLocation();
        let params = useParams();
        let navigate = useNavigate();
        return (
            <Component {...(props as Props)} location={location} params={params} navigate={navigate} />
        )
    }
}

export default withRouter;
