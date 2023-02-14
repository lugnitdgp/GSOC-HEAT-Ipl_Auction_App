import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./headers/navBar.js";
import Footer from "./footers/footer.js";
import Landingpage from "./landingPage/landingPage.js";
import LoginPage from "./pages/loginPage.js";
import SignupPage from "./pages/signupPage.js";
import MainPage from "./pages/mainPage.js";
import AdminPage from "./pages/adminPage.js";
import Addplayer from "./pages/addplayer.js"
import PlayersBought from "./pages/playersBought.js"

function App() {
    return (
        <Router>
            <Navbar />
            <main>
                <Routes>
                    <Route path="/" element={<Landingpage />} exact />
                    <Route path="/signup" element={<SignupPage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/mainpage" element={<MainPage/>} />
                    <Route path="/adminpage" element={<AdminPage/>} />
                    <Route path="/addplayer" element={<Addplayer/>}/>
                    <Route path="/playersBought" element={<PlayersBought/>}/>
                </Routes>
            </main>
            <Footer />
        </Router>
    );
}

export default App;
