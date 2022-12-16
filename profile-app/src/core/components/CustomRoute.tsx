import { useEffect } from "react";
import CommonService from "../../shared/services/common.service";

function CustomRoute (props: any) {
    useEffect(() => {
        CommonService.currentPrevUrl.prev = CommonService.currentPrevUrl.current === CommonService.currentPrevUrl.prev ? CommonService.currentPrevUrl.prev : CommonService.currentPrevUrl.current;
        CommonService.currentPrevUrl.current = props.pathName;
        
    });
    return props.children;
}

export default CustomRoute;
