import React from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import $ from 'jquery';

// eslint-disable-next-line
import { TypeAheadQuoteGrid } from './cstyles/TypeAheadQuoteGrid.js';
//import '../../App.css';

class TypeAhead extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            searchResults: [],
            downCount: -1
        };
    }
    componentDidMount() {
        let father = document.getElementById(this.props.obj);
        let motherHeight = (document.getElementById(this.props.obj + "Container").clientHeight - 15) + "px";
        let clearButt = document.getElementById(this.props.obj + "Clear");
        // let motherWidth = document.getElementById(this.props.obj + "Container").clientWidth + "px";

        father.style.height = motherHeight;
        clearButt.style.height = motherHeight;

        document.getElementById(this.props.obj).addEventListener("focus", this.setTypeAheadParams);
        document.addEventListener("click", this.hideDropDown);
        global.mouseOver = 0;
        this.setMaxHeight();
    }

    clearInput = () => {
        let father = document.getElementById(this.props.obj);
        father.value = "";
        father.focus();
    }
    
    illumineX = () => {
        let father = document.getElementById(this.props.obj);
        let neph = document.getElementById(this.props.obj + "Clear");
        if(father.value !== "" && father.value !== null) {
            neph.style.display = "flex";
            neph.style.opacity = "1";
        } else {
            neph.style.display = "none";
            neph.style.opacity = "0";
        }
    }

    setMaxHeight = () => {
        let resultsContainer = document.getElementById(this.props.obj + "Results");
        if (resultsContainer.childNodes.length > 0) {
            let resultHeight = resultsContainer.childNodes[0].clientHeight;
            resultsContainer.style.maxHeight = (resultHeight * this.props.show) + "px";
        }
    }

    taBlur = (e) => {
        let resultsContainer = document.getElementById(this.props.obj + "Results");
        if (e.keyCode === 9) {
            // TAB
            resultsContainer.className = "hidden";
        }
        let neph = document.getElementById(this.props.obj + "Clear");
        neph.style.opacity = "0";
        setTimeout(() => {
            neph.style.display = "none";
        },100);
    }

    hideDropDown = (e) => {
        let resultsContainer = document.getElementById(this.props.obj + "Results");
        let inp = document.getElementById(this.props.obj);
        if (
            (e.target.className === "typeAheadContainer" ||
                e.target.id === this.props.obj ||
                /*  e.target.className === "coverDiv" || */
                e.target.className === "TAResult" ||
                e.target.className === "primary" ||
                e.target.className === "secondary") &&
            inp.value !== ""
        ) {
            resultsContainer.className = "TAResults";
        } else {
            if (resultsContainer) {
                resultsContainer.className = "hidden";
            }
        }
    }

    setTypeAheadParams = () => {
        let url = "/params/666";
        axios.put(url, {
            typeAheadSelect: "title",
            typeAheadTable: this.props.table
        })
    }

    select = (e) => {
        e.target.select();
    }

    showResults = () => {
        let father = document.getElementById(this.props.obj);
        let resultsContainer = document.getElementById(this.props.obj + "Results");
        let fatherHeight = (father.clientHeight + 1) + "px";
        let computedFontSize = window.getComputedStyle(document.getElementById(this.props.obj)).fontSize;

        resultsContainer.className = "TAResults";
        if (resultsContainer.className === "TAResults") {
            document.getElementById(this.props.obj + "Results").style.top = fatherHeight;
            let results = resultsContainer.childNodes;
            for (var i = 0; i < results.length; i++) {
                results[i].style.height = fatherHeight;
                results[i].style.fontSize = computedFontSize;
            }
        }
        this.illumineX();
    }

    getSearch = () => {
        let resultsContainer = document.getElementById(this.props.obj + "Results");
        if (global.mouseOver > resultsContainer.childNodes.length) {
            global.mouseOver = 0;
        }
        if (global.mouseOver < 0) {
            global.mouseOver = 0;
        }
        let inp = document.getElementById(this.props.obj);
        let idStr = this.props.obj + "Results";
        let results = document.getElementById(idStr);
        if (inp.value === "") {
            results.className = "hidden";
        }
        let url = "/params/666";
        axios.put(url, {
            typeAheadInput: inp.value
        })
        let wiegehts = "/typeahead"

        clearTimeout(global.searchDelay);
        global.searchDelay = setTimeout(() => {
            if (inp.value !== "") {
                axios.get(wiegehts).then(response => {
                    this.setState({
                        searchResults: response.data,
                        downCount: -1
                    }, function () {
                        if (inp.value !== "") {
                            results.className = "TAResults";
                        }
                        this.setMaxHeight();
                        let args = "WHERE ";
                        for(var z = 0; z < this.props.args.length; z++) {
                            if(z !== 0) {
                                args += "\r\nOR "
                            }
                            args += this.props.args[z] + " like '%" + inp.value + "%'"
                        }
                        console.log(
                        "\r\nSELECT " + this.props.select
                        + "\r\nFROM " + this.props.table
                        // + "\r\nWHERE " + this.props.args + " '%" + inp.value + "%'"
                        + "\r\n" + args
                        + "\r\nAND " + this.props.addArgs
                        + "\r\nORDER BY " + this.props.order
                        + "\r\n");
                    })
                })
            }
            // 0.2 seconds
        }, 200);

        let father = document.getElementById(this.props.obj);
        let fatherHeight = (father.clientHeight + 1) + "px";
        let computedFontSize = window.getComputedStyle(document.getElementById(this.props.obj)).fontSize;

        resultsContainer.className = "TAResults";
        document.getElementById(this.props.obj + "Results").style.top = fatherHeight;
        let results2 = resultsContainer.childNodes;
        for (var i = 0; i < results2.length; i++) {
            results2[i].style.height = fatherHeight;
            results2[i].style.fontSize = computedFontSize;
        }
        this.illumineX();

    }

    enter = (e) => {
        let inp = document.getElementById(this.props.obj);
        let valid = document.getElementById(this.props.obj + "ValidValue");
        inp.value = e.target.dataset.title;
        valid.innerHTML = e.target.dataset.title;
        let resultsContainer = document.getElementById(this.props.obj + "Results");
        
        resultsContainer.childNodes[global.mouseOver].className = "TAResultActive";
        resultsContainer.className = "hidden";
        // this.getSearch();
        // this.hideDropDown(e);
    };

    searchResultsResetClasses = () => {
        let resultsContainer = document.getElementById(this.props.obj + "Results");
        for (var i = 0; i < resultsContainer.childNodes.length; i++) {
            resultsContainer.childNodes[i].className = "TAResult";
        }
    }

    mouseSetDown = (e) => {
        let resultsContainer = document.getElementById(this.props.obj + "Results");
        let resultsArr = [];
        for (var i = 0; i < resultsContainer.childNodes.length; i++) {
            resultsArr.push(resultsContainer.childNodes[i].childNodes[0].id);
        }
        this.searchResultsResetClasses();
        this.setState({
            downCount: resultsArr.indexOf(e.target.id)
        })
        global.mouseOver = resultsArr.indexOf(e.target.id);
    }

    scrollParentToChild = (parent, child, checkTarget) => {
        if (parent && child && checkTarget) {
            // Where is the parent on page
            var parentRect = parent.getBoundingClientRect();
            // What can you see?
            var parentViewableArea = {
                height: parent.clientHeight,
                width: parent.clientWidth
            };

            // Where is the child
            var childRect = child.getBoundingClientRect();
            var targetRect = checkTarget.getBoundingClientRect();
            // Is the child viewable?
            var isViewable = (targetRect.top >= parentRect.top) && (targetRect.top <= parentRect.top + parentViewableArea.height);

            // if you can't see the child try to scroll parent
            if (!isViewable) {
                // scroll by offset relative to parent
                parent.scrollTop = (childRect.top + parent.scrollTop) - parentRect.top
            }
        }
    }

    checkKey = (e) => {
        $('#' + this.props.obj).bind('keydown', function (e) {
            if (e.keyCode === 38 || e.keyCode === 40) {
                e.preventDefault();
            }
        });
        let resultsContainer = document.getElementById(this.props.obj + "Results");
        var limitHigh = resultsContainer.childElementCount;
        var limitLow = 0;
        if (global.mouseOver > limitHigh) {
            global.mouseOver = 0;
        }
        if (global.mouseOver < 0) {
            global.mouseOver = 0;
        }
        var myCount = this.state.downCount;
        if (myCount < limitLow) {
            myCount = -1;
        }
        if (myCount >= limitHigh) {
            myCount = limitHigh;
        }
        // 65-90 are a-z ;; space is 32 ;; 48-57 are numbers ;;  189 is hypen
        if (myCount <= limitHigh - 1 && myCount >= limitLow && limitHigh > 0) {
            resultsContainer.childNodes[myCount].className = "TAResultActive";
            // resultsContainer.childNodes[myCount].scrollIntoView();
        }
        if (e.keyCode === 40) {
            // down arrow

            if (resultsContainer.childNodes[global.mouseOver]) {
                resultsContainer.childNodes[global.mouseOver].className = "TAResultD";
            }

            if (resultsContainer.className === "hidden") {
                resultsContainer.className = "TAResults";
            }

            myCount = myCount + 1;
            if (myCount <= limitLow) {
                myCount = 0;
            }
            if (myCount >= limitHigh - 1) {
                myCount = limitHigh - 1;
            }
            if (myCount > limitLow) {
                resultsContainer.childNodes[myCount - 1].className = "TAResultD";
            }
            if (myCount < limitHigh - 1) {
                resultsContainer.childNodes[myCount + 1].className = "TAResultD";
            }
            if (myCount <= limitHigh && myCount >= limitLow && limitHigh > 0) {
                resultsContainer.childNodes[myCount].className = "TAResultActive";
                // resultsContainer.childNodes[myCount].scrollIntoView();
            }
            this.setState({
                downCount: myCount
            }, function () {
                if (document.getElementById(this.props.obj + "Results") &&
                    myCount - this.props.show + 1 > 0
                ) {
                    let scrool = myCount - this.props.show + 1;
                    let activeResult = resultsContainer.childNodes[scrool];
                    let checkTarg = resultsContainer.childNodes[myCount];
                    this.scrollParentToChild(resultsContainer, activeResult, checkTarg);
                }
            })
        } else if (e.keyCode === 38) {
            // up arrow

            if (resultsContainer.childNodes[global.mouseOver]) {
                resultsContainer.childNodes[global.mouseOver].className = "TAResultD";
            }

            if (resultsContainer.className === "hidden") {
                resultsContainer.className = "TAResults";
            }

            myCount = myCount - 1;
            if (myCount <= limitLow) {
                myCount = 0;
            }
            if (myCount >= limitHigh) {
                myCount = limitHigh;
            }
            if (myCount !== limitLow) {
                resultsContainer.childNodes[myCount - 1].className = "TAResultD";
            }
            if (myCount < limitHigh - 1) {
                resultsContainer.childNodes[myCount + 1].className = "TAResultD";
            }
            if (myCount <= limitHigh && myCount >= limitLow && limitHigh > 0) {
                resultsContainer.childNodes[myCount].className = "TAResultActive";
                // resultsContainer.childNodes[myCount].scrollIntoView();
            }
            let activeResult = resultsContainer.childNodes[myCount];
            this.setState({
                downCount: myCount
            }, function () {
                if (document.getElementById(this.props.obj + "Results")) {
                    this.scrollParentToChild(resultsContainer, activeResult, activeResult);
                }
            })
        } else if (e.keyCode === 13) {
            // enter
            if (myCount < limitLow) {
                myCount = 0;
            }
            if (myCount >= limitHigh) {
                myCount = limitHigh - 1;
            }
            resultsContainer.childNodes[myCount].childNodes[0].click();
        } else if (e.keyCode === 9) {
            // TAB
            resultsContainer.className = "hidden";
        } else if (e.keyCode === 27) {
            // ESC
            document.activeElement.blur();
            resultsContainer.className = "hidden";
        }
        global.mouseOver = myCount;
    }



    render() {
        if (this.props.location.pathname === '/login') return null;
        // const CustomStyle = this.props.cstyle;
        return (
            <div id={this.props.obj + "Container"} className="typeAheadContainer">
                {this.props.cstyle === "TypeAheadQuoteGrid" ? <TypeAheadQuoteGrid /> : null}
                <input onMouseUp={this.select} onKeyDown={this.checkKey} onChange={this.getSearch} onFocus={this.showResults} onBlur={this.taBlur} className="typeAheadDarkTest" id={this.props.obj} type="text" />
                <span className="TAClearField" id={this.props.obj + "Clear"} onClick={this.clearInput}></span>
                <div id={this.props.obj + "Results"} onMouseMove={this.searchResultsResetClasses} className="TAResultsContainer">
                    {this.state.searchResults.map(p => (
                        <div onClick={this.enter} onMouseMove={this.mouseSetDown} className="TAResult" key={p.id}>
                            <span id={p.id} data-title={p.returnedData} className="coverDiv"></span>
                            <span className="primary">{p.returnedData}</span>
                            <span className="secondary">${p.secondary}</span>
                        </div>
                    ))
                    }
                </div>
                <div className="hidden" id={this.props.obj + "ValidValue"}></div>
            </div>
        );
    }
}

export default withRouter(TypeAhead);