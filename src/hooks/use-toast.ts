import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export function useToast() {
    const showToast = ({ title, description }: { title: string; description?: string }) => {
        toast.success(`${title} - ${description}`);
    };

    return { showToast };
}
