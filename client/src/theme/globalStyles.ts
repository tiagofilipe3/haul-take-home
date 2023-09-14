import { createGlobalStyle } from 'styled-components'

const GlobalStyles = createGlobalStyle`
  html {
    box-sizing: border-box;
  }
  
  *, *:before, *:after {
    box-sizing: inherit;
  }
  
  body {
    place-items: flex-start;
    background-color: #f0f0f1;
    align-content: center;
    flex-wrap: wrap;
  }
  
  #root {
    width: 100%;
    display: flex;
    justify-content: center;
  }
`

export default GlobalStyles
