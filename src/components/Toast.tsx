import { useToast } from "../contexts/ToastContext";

export default function Toast() {
  const { isOpen, message, variant } = useToast();
  return <div className="fixed bottom-6 left-1/2 z-50">Toast</div>;
}
