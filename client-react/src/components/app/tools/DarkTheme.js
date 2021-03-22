import { createGlobalStyle } from 'styled-components'; 
import cellsalesLight from '../../../img/cellsalesLight.png';
import authretailerLight from '../../../img/authretailerLight.png';

// let nearBlack = "#1F1F1F";
let nightBase0 = "#000000";
let nightBase1 = "#171717";
let nightBase2 = "#1b1b1b";
let nightBase3 = "#363636";
let nightBase4 = "#565656";
let nightBlue2 = "#1D508F";
let nightWhite = "#EBEBEB";
let nightWhite2 = "#E0E0E0";
let nightBase25 = "#2A2A2A";
let scrollbarTrack = "#171717";
let scrollbarThumb = "#2A2A2A";
let scrollbarThumbOutline = "transparent";
let scrollbarThumbHover = nightBase25;
let scrollbarButtonBackground = "#171717";
let scrollbarButtonFill = "gray";
let scrollbarButtonHover = "gray";
let scrollbarButtonActive = "gray";
let nightYellow = "#8A8700";
let nightGreen = "#126200";
let nightGreen2 = "#0E4C00";

export const DarkTheme = createGlobalStyle` 
#darkModeFade {
    opacity: 0.6;
}
#darkModeTint {
    opacity: 0.1;
}
#darkModeTint2 {
    opacity: 0.3;
}
.customer th i {
    color: ${nightWhite} !important;
}
#user,
#settings {
    color: ${nightWhite};
}
.topnav, .topnav a {
    background-color: ${nightBase0};
    color: ${nightWhite2};
}
.topnav a:hover {
    background-color: ${nightBase1};
    color: ${nightWhite};
}
#activeCustomer {
    color: ${nightBase3};
}
h3, h4, 
.paginationContainer,
.paginationContainer .paginate,
.paginationContainer label,
.customer table tbody tr th span i {
    color: ${nightWhite};
}
.paginateActive {
    background-color: ${nightBase3};
    color: ${nightWhite2};
}
#root {
    background-color: ${nightBase1} !important;
    min-height: 100vh !important;
}
.customer tr th,
.customer tr th input,
#table {
    background-color: ${nightBase1} !important;
    color: ${nightWhite2};
}
.customer,
.datagrid,
.sc-bdfBwQ,
.component,
.App {
    background-color: rgba(0,0,0,0) !important;
}
.customer tr th,
.customer tr th input {
    outline: 1px solid ${nightBase0} !important;
}
.grid {
    border: 1px solid ${nightBase0};
}
.grid table tr td {
    background-color: ${nightBase1};
    outline: 1px solid ${nightBase0};
}
.grid table tr:nth-child(odd) td {
    background-color: ${nightBase2};
}
.customer input[type="checkbox"] {
    opacity: 0.5;
}

&::-webkit-scrollbar {
    width: 16px;
    height: 16px;
    /* transition0.2s ease-in-out; */
  }
  &::-webkit-scrollbar-corner, &::-webkit-scrollbar-track {
    background-color: ${scrollbarTrack};
  }
  &::-webkit-scrollbar-thumb {
    background-color: ${scrollbarThumb};
    background-clip: padding-box;
    border: 2px solid ${scrollbarThumbOutline};
    }
  &::-webkit-scrollbar-thumb:hover {
    background-color: ${scrollbarThumbHover};
  }
  &::-webkit-scrollbar-thumb:active {
    background-color: ${scrollbarThumbHover};
  }
  &::-webkit-scrollbar-button:single-button {
    background-color: ${scrollbarButtonBackground};
    display: block;
    background-size: 10px;
    background-repeat: no-repeat;
  }
  &::-webkit-scrollbar-button:single-button:vertical:decrement {
    height: 12px;
    width: 16px;
    background-position: center 4px;
    background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='100' height='100' fill='${scrollbarButtonFill}'><polygon points='50,00 0,50 100,50'/></svg>");
  }
  &::-webkit-scrollbar-button:single-button:vertical:decrement:hover {
    background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='100' height='100' fill='${scrollbarButtonHover}'><polygon points='50,00 0,50 100,50'/></svg>");
  }
  &::-webkit-scrollbar-button:single-button:vertical:decrement:active {
    background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='100' height='100' fill='${scrollbarButtonActive}'><polygon points='50,00 0,50 100,50'/></svg>");
  }
  &::-webkit-scrollbar-button:single-button:vertical:increment {
    height: 12px;
    width: 16px;
    background-position: center 2px;
    background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='100' height='100' fill='${scrollbarButtonFill}'><polygon points='0,0 100,0 50,50'/></svg>");
  }
  &::-webkit-scrollbar-button:single-button:vertical:increment:hover {
    background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='100' height='100' fill='${scrollbarButtonHover}'><polygon points='0,0 100,0 50,50'/></svg>");
  }
  &::-webkit-scrollbar-button:single-button:vertical:increment:active {
    background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='100' height='100' fill='${scrollbarButtonActive}'><polygon points='0,0 100,0 50,50'/></svg>");
  }      
  &::-webkit-scrollbar-button:single-button:horizontal:decrement {
    height: 12px;
    width: 12px;
    background-position: 3px 3px;
    background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='100' height='100' fill='${scrollbarButtonFill}'><polygon points='0,50 50,100 50,0'/></svg>");
  }
  &::-webkit-scrollbar-button:single-button:horizontal:decrement:hover {
    background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='100' height='100' fill='${scrollbarButtonHover}'><polygon points='0,50 50,100 50,0'/></svg>");
  }
  &::-webkit-scrollbar-button:single-button:horizontal:decrement:active {
    background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='100' height='100' fill='${scrollbarButtonActive}'><polygon points='0,50 50,100 50,0'/></svg>");
  }
  &::-webkit-scrollbar-button:single-button:horizontal:increment {
    height: 12px;
    width: 12px;
    background-position: 3px 3px;
    background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='100' height='100' fill='${scrollbarButtonFill}'><polygon points='0,0 0,100 50,50'/></svg>");
  }
  &::-webkit-scrollbar-button:single-button:horizontal:increment:hover {
    background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='100' height='100' fill='${scrollbarButtonHover}'><polygon points='0,0 0,100 50,50'/></svg>");
  }
  &::-webkit-scrollbar-button:single-button:horizontal:increment:active {
    background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='100' height='100' fill='${scrollbarButtonActive}'><polygon points='0,0 0,100 50,50'/></svg>");
  }
  .settingsContainer {
    color: ${nightWhite};
  }
  .slider {
    background-color: ${nightBase3};
  }
    .slider:before {
    background-color: ${nightBase4};
  }
    input:checked+.slider {
    background-color: ${nightBlue2};
  }
    input:checked+.slider:after {
    color: var(--night-white);
  }
  .summaryBanner,
  #emptyCart {
    background-color: ${nightBase3};
    color: ${nightWhite};
  }
  .field input {
    background-color: ${nightBase1};
    color: ${nightWhite};
    border-bottom: 1px solid ${nightBase4};
  }
  .field input:active,
  .field input:focus,
  .tableTxtInput:focus,
  .tableTxtInput:active,
  .tableCurInput:focus,
  .tableCurInput:active  {
    background-color: ${nightYellow} !important;
  }
  .field label {
    color: ${nightWhite};
  }
  .quoterTable th,
  .quoterTable td {
    border-color: ${nightBase0} !important;
  }
  .quoterTable th {
    background-color: ${nightBase25} !important;
    color: ${nightWhite};
  }
  .quoterTable td,
  .quoterTable td input {
    background-color: ${nightBase2};
    color: ${nightWhite};
  }
  .quoterTable td input[type="checkbox"] {
    opacity: 0.6;
  }
  .quoterContainer #verizon {
    width: 150px;
    height: 50px;
    background: url(${authretailerLight}) center no-repeat;
    background-size: 140px;
  }
  .quoterContainer #cellularSales {
    width: 400px;
    height: 68px;
    background: url(${cellsalesLight}) center no-repeat;
    background-size: 400px;
  }
  #newOrderContainer div {
    border-color: ${nightBase3} !important;
    color: ${nightWhite};
  }
  .productSearchViewType {
    background-color: ${nightBase3};
  }
  .productSearchViewType:hover {
    background-color: ${nightBase4};
  }
  .productSearchSearch,
  .productSearchSearch input,
  .productSearchSearch input::placeholder,
  .productSearchResultsRow,
  .productSearchResults {
    background-color: ${nightBase25} !important;
    color: ${nightWhite} !important;
  }
  .productSearchResultsRow,
  .productSearchResultsTile {
    background-color: ${nightBase2} !important;
    color: ${nightWhite} !important;
  }
  .orderContentsTotal td {
    background-color: ${nightBase1} !important;
    color: ${nightWhite} !important;
  }
  #newOrderContainer textarea {
    background-color: ${nightBase1} !important;
    color: ${nightWhite} !important;
    border: 1px solid ${nightBase3};
    border-radius: 10px;
  }
  .green {
    background-color: ${nightGreen};
    color: ${nightWhite} !important;
  }
  .saveOrder:hover {
    background-color: ${nightGreen2};
    color: snow !important;
  }
  .monthlyOuter {
    border: 2px solid ${nightBase3};
  }
  .monthlyInner {
    border: 1px solid ${nightBase4};
  }
  #tileView, #listView {
    cursor: pointer;
    background-color: ${nightBase2} !important;
  }
  .productSearchViewType:hover,
  #listView:hover,
  #tileView:hover {
    background-color: ${nightBase2} !important;
  }
`

// export default connect(mapStateToProps)(DarkTheme);
