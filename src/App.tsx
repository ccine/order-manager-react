import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./Pages/Login";
import Home from "./Pages/Home";
import { AuthProvider, RequireAuth } from "./Components/Auth";
import { useState } from "react";

function App() {
  const [highContrastMode, setHighContrastMode] = useState<boolean>(false);

  return (
    <div className="App">
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route
              path="/"
              element={
                <Login
                  highContrastMode={highContrastMode}
                  setHighContrastMode={setHighContrastMode}
                />
              }
            />
            <Route
              path="/Login"
              element={
                <Login
                  highContrastMode={highContrastMode}
                  setHighContrastMode={setHighContrastMode}
                />
              }
            />
            <Route
              path="/Home"
              element={
                <RequireAuth>
                  <Home
                    highContrastMode={highContrastMode}
                    setHighContrastMode={setHighContrastMode}
                  />
                </RequireAuth>
              }
            />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
}

export default App;
