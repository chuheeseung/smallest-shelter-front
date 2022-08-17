import React, { Component, Children, useState, useEffect} from "react";
import PropTypes from "prop-types";
import MyInfo from "../MyPage/MyInfo";
import "./MyPage.css";
import MyLikeAnimal from "./MyLikeAnimal";
import styled from 'styled-components';
import ChatHistory from "../ChatHistory/ChatHistory";
import axios from "axios";
import { 
  useRecoilState, 
  // useRecoilValue, 
} from 'recoil';
import { LoginRole } from '../../states/LoginState';
import { myInfoDummy } from './dataMyInfo';
import ChatList from "../ChatList/ChatList";

class Tabs extends Component {
  static childContextTypes = {
    activeIndex: PropTypes.number.isRequired,
    onSelectTab: PropTypes.func.isRequired
  };

  static defaultProps = {
    defaultActiveIndex: 0
  };

  state = {
    activeIndex: this.props.defaultActiveIndex
  };

  getChildContext() {
    return {
      activeIndex: this.state.activeIndex,
      onSelectTab: this.selectTabIndex
    };
  }

  selectTabIndex = activeIndex => {
    this.setState({ activeIndex });
  };

  render() {
    return <TabsStyle>{this.props.children}</TabsStyle>;
  }
}

class TabList extends Component {
  static contextTypes = {
    activeIndex: PropTypes.number.isRequired,
    onSelectTab: PropTypes.func.isRequired
  };

  render() {
    const { activeIndex } = this.context;
    const children = Children.map(this.props.children, (child, index) => {
      return React.cloneElement(child, {
        isActive: index === activeIndex,
        onSelect: () => this.context.onSelectTab(index)
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
        className={
          isActive ? "tab active" : "tab"
        }
        onClick={isDisabled ? null : onSelect}
      >
        {this.props.children}
      </div>
    );
  }
}

class TabPanels extends Component {
  static contextTypes = {
    activeIndex: PropTypes.number.isRequired
  };

  render() {
    const { children } = this.props;
    const { activeIndex } = this.context;
      if(activeIndex==1){
        return <LikePanels>{children[activeIndex]}</LikePanels>;
      }
      else{
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
  const [isRole, setIsRole] = useRecoilState(LoginRole);

  //State들
  const [isUserID, setIsUserID] = useState(0);
  const [isName, setIsName] = useState("");
  const [isPhoneNumber, setIsPhoneNumber] = useState("");
  const [isAddress, setIsAddress] = useState("");
  const [isEmail, setIsEmail] = useState("");
  const [isProfileUrl, setIsProfileUrl] = useState("");
  const [myDataInfo,setMyDataInfo] = useState([]); 

  // const getPosts = async () => {
  //  const mypageRes= await axios({
  //     headers: {
  //         withCredentials: true,
  //         'Accept': 'application/json',
  //     },
  //     method: 'get',
  //     url: 'https://sjs.hana-umc.shop/post?animal_id=1&post_id=1',
  //     params:{
  //         animal_id:1,
  //         post_id:1
  //     }
  // }).then(setMyDataInfo(mypageRes.result)
  //   // dummyInfo = mypageRes.result,
  //   // console.log("isRole: ", isRole),
  //   // console.log("data: ",mypageRes.result),
  //   // setIsUserID(dummyInfo.userIdx),
  //   // setIsName(dummyInfo.name),
  //   // setIsPhoneNumber(dummyInfo.phoneNumber),
  //   // setIsAddress(dummyInfo.address),
  //   // setIsEmail(dummyInfo.email),
  //   // setIsProfileUrl(dummyInfo.profileImgUrl),
  // )};

  // useEffect(() => {
  //   getPosts();
  // },[]);

    return (
      <div>
        <Tabs defaultActiveIndex={0}>
          <TabList>
              {
                isRole=="ORGANIZATION"
                  ? <Tab>단체정보</Tab>
                  : <Tab>개인정보</Tab>
              }
              {
                isRole=="ORGANIZATION"
                  ? <Tab>등록한 동물 목록</Tab>
                  : <Tab>나의 관심 동물</Tab>
              }

            <Tab> {/*<Tab isDisabled>*/}
              쪽지 목록
            </Tab>
          </TabList>
          <TabPanels>
            <TabPanel >
              <MyInfo isRole={isRole} userID={isUserID} name={isName} phoneNumber={isPhoneNumber} address={isAddress} email={isEmail} profileImgUrl={isProfileUrl}/>
            </TabPanel>
            <TabPanel><MyLikeAnimal isRole={isRole} userID={isUserID}/></TabPanel>
            <TabPanel>
            <div style={{display: 'flex', flexDirection: 'column', height: '100%', width: '100%'}}>
              <ChatList/>
            </div>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </div>
    );
  }

export default MyPage;

//마이페이지 스타일드 컴포넌트
const TabsStyle=styled.div`
  display: flex;
  width: 95%;
`;

const TabsItems=styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  margin:50px 0px 50px 50px;
  width:900px;  
`;

const Panels=styled.div`
    background: #EFEFEF;
    height:600px;
    padding: 20px;
    margin-top:60px;
    width:250%;
    border-radius: 15px;
`;

const LikePanels=styled.div`
    background: #EFEFEF;
    height:100%;
    padding: 20px;
    margin-top:60px;
    width:250%;
    border-radius: 15px;
`;