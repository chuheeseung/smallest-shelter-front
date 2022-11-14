import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import MyPage from '../components/MyPage/MyPage';
import { ChakraProvider } from '@chakra-ui/react';
function MyScreen() {
  return (
    <ChakraProvider>
      <MyPage />
    </ChakraProvider>
  );
}

export default MyScreen;
