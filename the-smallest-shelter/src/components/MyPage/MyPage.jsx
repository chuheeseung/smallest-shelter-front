import React, { Component, Children, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import MyInfo from '../MyPage/MyInfo';
import './MyPage.css';
import MyLikeAnimal from './MyLikeAnimal';
import styled from 'styled-components';
import axios from 'axios';
import {
  useRecoilState,
  // useRecoilValue,
} from 'recoil';
import {
  LoginImageIndex, 
  LoginRole, 
  LoginState, 
  LoginUserAddr, 
  LoginUserEmail, 
  LoginUserId, 
  LoginUserIdx, 
  LoginUserName, 
  LoginUserOrgName, 
  LoginUserPhoneNum, 
  LoginUserPw, 
  LoginUserToken 
} from '../../states/LoginState';
import { myInfoDummy } from './dataMyInfo';
import ChatList from '../ChatList/ChatList';
import { useNavigate } from 'react-router-dom';

class Tabs extends Component {
  static childContextTypes = {
    activeIndex: PropTypes.number.isRequired,
    onSelectTab: PropTypes.func.isRequired,
  };

  static defaultProps = {
    defaultActiveIndex: 0,
  };

  state = {
    activeIndex: this.props.defaultActiveIndex,
  };

  getChildContext() {
    return {
      activeIndex: this.state.activeIndex,
      onSelectTab: this.selectTabIndex,
    };
  }

  selectTabIndex = (activeIndex) => {
    this.setState({ activeIndex });
  };

  render() {
    return <TabsStyle>{this.props.children}</TabsStyle>;
  }
}

class TabList extends Component {
  static contextTypes = {
    activeIndex: PropTypes.number.isRequired,
    onSelectTab: PropTypes.func.isRequired,
  };

  render() {
    const { activeIndex } = this.context;
    const children = Children.map(this.props.children, (child, index) => {
      return React.cloneElement(child, {
        isActive: index === activeIndex,
        onSelect: () => this.context.onSelectTab(index),
      });
    });
    return <TabsItems>{children}</TabsItems>;
  }
}

class Tab extends Component {
  render() {
    const { isActive, isDisabled, onSelect } = this.props;
    return (
      <div
        className={isActive ? 'tab active' : 'tab'}
        onClick={isDisabled ? null : onSelect}
      >
        {this.props.children}
      </div>
    );
  }
}

class TabPanels extends Component {
  static contextTypes = {
    activeIndex: PropTypes.number.isRequired,
  };

  render() {
    const { children } = this.props;
    const { activeIndex } = this.context;
    if (activeIndex == 1) {
      return <LikePanels>{children[activeIndex]}</LikePanels>;
    } else if (activeIndex == 2) {
      return <ChatPanels>{children[activeIndex]}</ChatPanels>;
    } else {
      return <Panels>{children[activeIndex]}</Panels>;
    }
  }
}

class TabPanel extends Component {
  render() {
    return this.props.children;
  }
}
//-------------------------여기가 메인-----------------------------------
function MyPage() {
  const [loginState, setLoginState] = useRecoilState(LoginState);
  const [isRole, setIsRole] = useRecoilState(LoginRole);
  const [userIdx, setUserIdx] = useRecoilState(LoginUserIdx);
  const [token, setToken] = useRecoilState(LoginUserToken);
  const [loginUserName, setLoginUserName] = useRecoilState(LoginUserName);
  const [loginUserId, setLoginUserId] = useRecoilState(LoginUserId);
  const [savedLoginPw, setSavedLoginPw]  = useRecoilState(LoginUserPw);
  const [loginImageIndex, setLoginImageIndex] = useRecoilState(LoginImageIndex);
  const [loginUserAddr, setLoginUserAddr] = useRecoilState(LoginUserAddr);
  const [loginUserPhoneNum, setLoginUserPhoneNum] = useRecoilState(LoginUserPhoneNum);
  const [loginUserEmail, setLoginUserEmail] = useRecoilState(LoginUserEmail);
  const [userOrgName, setUserOrgName] = useRecoilState(LoginUserOrgName);
  //State들
  const [isUserID, setIsUserID] = useState(0);
  const [isName, setIsName] = useState('');
  const [isPhoneNumber, setIsPhoneNumber] = useState('');
  const [isAddress, setIsAddress] = useState('');
  const [isEmail, setIsEmail] = useState('');
  const [isProfileUrl, setIsProfileUrl] = useState('');
  const [myDataInfo, setMyDataInfo] = useState([]);

  const navigate = useNavigate();

  const getPosts = async () => {
    console.log(token);
    const mypageRes = await axios({
      headers: {
        Authorization: `Bearer ${token}`,
        withCredentials: true,
        Accept: 'application/json',
      },
      method: 'get',
      url: `https://sjs.hana-umc.shop/auth/private/${userIdx}`,
    }).then((response) => {
      console.log(response);
      setMyDataInfo(response.data.result);
      // dummyInfo = mypageRes.result,
    });
  };

  const handleUpdate = () => {
    if(window.confirm("회원 정보를 수정하겠습니까?") === true) {
      console.log("update");
      navigate('/update/member');
    }
    else {
      console.log("update 취소");
    }
  };

  const handleDelete = async (e) => {
    e.preventDefault();

    if(window.confirm("정말로 탈퇴하겠습니까?") === true) {
      await axios
        .delete(
          `https://sjs.hana-umc.shop/auth/out/${loginUserIdx}`,
          {
            params: { userIdx: loginUserIdx },
            headers: { Authorization: loginUserToken },
          }
        )
        .then((response) => {
          console.log(response);
          alert("탈퇴했습니다.");
          
          sessionStorage.removeItem("userIdx");
          sessionStorage.removeItem("name");
          sessionStorage.removeItem("role");
          sessionStorage.removeItem("organizationName");
          sessionStorage.removeItem("bearer_token");

          setLoginState(false);
          setLoginUserIdx(0);
          setIsRole("");
          setLoginUserName("");
          setUserOrgName("");
          setLoginUserId("");
          setSavedLoginPw("");
          setLoginUserToken("");
          setLoginImageIndex(0);

          navigate('/');
        })
        .catch((error) => {
          console.log(error);
        })
    }
    else {
      alert("탈퇴를 취소하셨습니다.");
    }
  };

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <div>
      <Tabs defaultActiveIndex={0}>
        <TabList>
          {isRole == 'ORGANIZATION' ? <Tab>단체정보</Tab> : <Tab>개인정보</Tab>}
          {isRole == 'ORGANIZATION' ? (
            <Tab>등록한 동물 목록</Tab>
          ) : (
            <Tab>나의 관심 동물</Tab>
          )}

          <Tab>쪽지 목록</Tab>
        </TabList>
        <TabPanels>
          <TabButtons>
              <TabButton onClick={handleUpdate}>수정</TabButton>
              <TabButton onClick={handleDelete}>탈퇴</TabButton>
            </TabButtons>
          <TabPanel>
            <MyInfo
              isRole={isRole}
              userID={userIdx}
              name={loginUserName}
              phoneNumber={loginUserPhoneNum}
              address={loginUserAddr}
              email={loginUserEmail}
              profileImgUrl={loginImageIndex}
            />
          </TabPanel>
          <TabPanel>
            <MyLikeAnimal isRole={isRole} userID={loginUserId} />
          </TabPanel>
          <TabPanel>
            <ChatList />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </div>
  );
}

export default MyPage;

//마이페이지 스타일드 컴포넌트
const TabsStyle = styled.div`
  position: relative;
  left: 1%;
  display: flex;
  width: 100vw;
`;

const TabsItems = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  margin: 50px 0px 50px 50px;
  width: 900px;
`;

const Panels = styled.div`
  background: #efefef;
  height: 600px;
  margin-top: 60px;
  width: 250%;
  border-radius: 15px;
  margin-right: 50px;
`;

const LikePanels = styled.div`
  background: #efefef;
  height: 100%;
  padding: 20px;
  margin-top: 60px;
  width: 250%;
  border-radius: 15px;
  margin-right: 50px;
`;

const ChatPanels = styled.div`
  background: #efefef;
  width: 100vw;
  height: 70vh;
  margin-top: 60px;
  width: 250%;
  border-radius: 15px;
  margin-right: 50px;
`;

const TabButtons = styled.div`
  text-align: right;
  margin-top: 4px;
`;

const TabButton = styled.button`
  border: none;
  border-radius: 15px;
  color: white;
  background-color: #fbc22e;
  margin-right: 10px;
  font-size: 12px;
  cursor: pointer;

  &:hover {
    transition: all ease 0.1s;
    transform: scale(1.02);
  }
`;