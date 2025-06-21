import AppRoutes from "./routes";
import { useInitApp } from "./hooks/useInitApp";

export default function App() {
  // Хук для инициализации пользователя и других данных
  useInitApp();

  return (
    <div>
      <AppRoutes />
    </div>
  );
}
