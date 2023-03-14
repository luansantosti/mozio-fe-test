import { styled } from "@mui/system"

import appBackground from '../../assets/images/app-background.png'

export const Wrapper = styled('div')`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 50px 0;
  min-height: 100vh;
  background: url(${appBackground}) no-repeat center;
  background-size: 96%;
`

export const Content = styled('div')`
  width: 800px;
  max-width: 100%;
  background: #fff;
  border-radius: 1rem;
  padding: 40px 80px;
`



