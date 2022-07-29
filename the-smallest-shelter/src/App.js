import { Route, Routes, BrowserRouter } from 'react-router-dom';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import MyPage from './components/MyPage/MyPage';
import OrganizationSignUp from './components/SignUpPage/OrganizationSignUp';
import PrivateSignUp from './components/SignUpPage/PrivateSignUp';
import ChatScreen from './routes/ChatScreen';
import DetailScreen from './routes/DetailScreen';
import ListviewScreen from './routes/ListviewScreen';
import RegisterScreen from './routes/RegisterScreen';
import SignInScreen from './routes/SignInScreen';
import SignUpScreen from './routes/SignUpScreen';

const App = () => {
  return (
      <BrowserRouter>
          <Header/>
          <Routes>
              <Route path="/" element={<ListviewScreen />} />
              <Route path="/detail" element={<DetailScreen />} />
              <Route path="/register" element={<RegisterScreen />} />
              <Route path="/mypage" element={<MyPage />} />
              <Route path="/chat/:chatRoomId" element={<ChatScreen />} />
              <Route path="/signin" element={<SignInScreen />} />
              <Route path="/signup" element={<SignUpScreen />} />
              <Route path="/signup/private" element={<PrivateSignUp />} />
              <Route path="/signup/organization" element={<OrganizationSignUp/>} />
          </Routes>
          <Footer/>
      </BrowserRouter>
  );
};

export default App;
