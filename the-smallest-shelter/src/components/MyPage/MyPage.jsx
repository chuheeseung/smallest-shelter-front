import React, { Component, Children, useState} from "react";
import PropTypes from "prop-types";
import MyInfo from "../MyPage/MyInfo";
import "./MyPage.css";
import MyLikeAnimal from "./MyLikeAnimal";
import styled from 'styled-components';
import ChatHistory from "../ChatHistory/ChatHistory";


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
  const [isOrganization, setIsOrganization] = useState(true);
    return (
      <div>
        <Tabs defaultActiveIndex={0}>
          <TabList>
              {
                  isOrganization==true
                  ? <Tab>단체정보</Tab>
                  : <Tab>개인정보</Tab>
              }
              {
                  isOrganization==true
                  ? <Tab>등록한 동물 목록</Tab>
                  : <Tab>나의 관심 동물</Tab>
              }

            <Tab> {/*<Tab isDisabled>*/}
              쪽지목록
            </Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <MyInfo isOrganization={isOrganization}/>
            </TabPanel>
            <TabPanel><MyLikeAnimal isOrganization={isOrganization}/></TabPanel>
            <TabPanel>
            <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center',  margin: '0 auto'}}>
              <ChatHistory/>
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