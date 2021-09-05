/* NOTE: We will be written styles that using all of the apps.
   Maybe some styles do not use at the current moment but I think they will be needed in a more large project.
   It is only my suggestion!
*/
import { createGlobalStyle } from "styled-components";
import BackgroundImage from "assets/images/background.gif";

export default createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    outline: 0;
    box-sizing: border-box;
  }
  body {
    overflow: hidden;
    position: absolute;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  html {
    background: url(${BackgroundImage}) no-repeat center center fixed; 
    -webkit-background-size: cover;
    -moz-background-size: cover;
    -o-background-size: cover;
    background-size: cover;
    font-size: 16px
  }
  input::placeholder {
    color: ${(props) => props.theme.colors.gray[5]};
  }
  .text-center {
    text-align: center;
  }
  .text-right {
    text-align: right;
  }
  .text-line-through {
    text-decoration: line-through;
  }
  .cursor-pointer {
    cursor: pointer;
  }
  .pt-8 {
    padding-top: 8px;
  }
  .pl-8 {
    padding-left: 8px;
  }
  .ph-8 {
    padding-left: 8px;
    padding-right: 8px;
  }
  .pv-8 {
    padding-top: 8px;
    padding-bottom: 8px;
  }
  .mt-8 {
    margin-top: 8px;
  }
  .ml-8 {
    margin-left: 8px;
  }
  .mh-8 {
    margin-left: 8px;
    margin-right: 8px;
  }
  .mv-8 {
    margin-top: 8px;
    margin-bottom: 8px;
  }
  .border-err {
    border-color: ${(props) => props.theme.palette.error.dark} !important;
    &:hover {
    border-color: ${(props) => props.theme.palette.error.dark} !important;
    box-shadow: ${(props) =>
      props.theme.palette.error.main} 0 0 0 3px !important;
  }
  &:focus {
    border-color: ${(props) => props.theme.palette.error.dark} !important;
    box-shadow: ${(props) =>
      props.theme.palette.error.main} 0 0 0 3px !important;
  }
  }
  .text-error {
    color: ${(props) => props.theme.palette.error.dark};
  }
  .flex-box {
    display: flex;
    align-items: center;
  }
  .flex-start {
    justify-content: flex-start ;
  }
  .flex-center {
    justify-content: center ;
  }
  .scroll-bar {
     overflow-y: scroll;
     height: 30rem;
  }
  .scroll-bar::-webkit-scrollbar {
    width: 8px;
  }

  .scroll-bar::-webkit-scrollbar-track {
      -webkit-box-shadow: inset 0 0 0x; 
      border-radius: 10px;
  }

  .scroll-bar::-webkit-scrollbar-thumb {
      border-radius: 10px;
      -webkit-box-shadow: inset 0 0 100px ${(props) =>
        props.theme.colors.gray[4]}; 
  }
`;
