import ItemDashboard from "./components/item-dashboard";
import { Toaster } from "./components/ui/toaster";

function App() {
  return (
    <div className="min-h-screen w-screen flex flex-col">
      <ItemDashboard />
      <Toaster />
    </div>
  );
}

export default App;
