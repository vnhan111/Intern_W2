import Store from "../store/Store";
import { getAllProjectAPI, type ProjectResponse} from "../api/projectAPI";
import { getAllProjectStart, getAllProjectSuccess, getAllProjectError,clearProjectError } from "../redux/slice/projectSlice";

const { dispatch } = Store;

export class ProjectService{
    static async getAllProject(){
        try{
            console.log("Project start loading");
            const response = await getAllProjectAPI();
            if(response){
                    console.log("get all project successful");
                    dispatch(getAllProjectSuccess(response));
                    return { success: true, data: response};
                }else {
                    console.log("ProjectService: Fetch projects returned empty or invalid data");
                    const errorMessage = "Không nhận được dữ liệu project hợp lệ";
                    dispatch(getAllProjectError(errorMessage));
                    return { success: false, error: errorMessage };
                }
            } catch (err: unknown) {
                console.error("ProjectService: Error fetching projects:", err);

                const errorMessage =
                    err instanceof Error
                    ? err.message
                    : "Lỗi khi tải danh sách project. Vui lòng thử lại sau.";

                dispatch(getAllProjectError(errorMessage));
                return { success: false, error: errorMessage };
            }
        }
}