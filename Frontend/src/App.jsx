import { Routes, Route } from "react-router-dom";
import Body from "./Components/Body";
import Login from "./Components/Login";
import Profile from "./Components/Profile";
import Feed from "./Components/Feed";
import Connections from "./Components/Connections";
import Requests from "./Components/Requests";
import Signup from "./Components/Signup";
import Premium from "./Components/Premium";
import Chat from "./Components/Chat";

function App() {
  return (
    <>
      <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
        <Route path="/" element={<Body />}>
          <Route path="/" element={<Feed />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/connections" element={<Connections />} />
          <Route path="/requests" element={<Requests />} />
          <Route path="/premium" element={<Premium />} />
          <Route path="/chat/:targetUserId" element={<Chat />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
