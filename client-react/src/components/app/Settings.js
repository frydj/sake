import React from "react";
import axios from "axios";
// import ThemeChanger from "../../ThemeChanger.js";

class Settings extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: "",
            pageTitle: "Settings",
            themeStyle: "light",
        };
    }

    componentDidMount = () => {
        this.getSettings();
    }

    getSettings = () => {
        // console.log(" GET SETTINGS !! ")
        axios.get("/usersetting/9").then(
            response => (global.theme = response.data.theme)
        ).then(
            setTimeout(() => {
                this.setThemeProp(global.theme);
                // console.log("after a time: " + global.theme);
                // UPDATE DB & THEME HERE
                if (global.theme === "dark") {
                    let darkMode = document.getElementById("darkMode");
                    darkMode.checked = true;
                }                
                setTimeout(() => {
                    if (global.theme === "dark") {
                        let darkMode = document.getElementById("darkMode");
                        darkMode.checked = true;
                    }
                }, 100)
            }, 100)
        );
    }

    setThemeProp = (something) => {
        this.setState({
            theme: something
        });
    }

    render() {
        return (
            <div className="component">
                <h3>Settings</h3>
                <div className="settingsContainer">

                    <div className="settingsBlock">

                        <div className="keyValueContainer">
                            <div className="key">
                                Dark Mode
                            </div>
                            <div className="value">
                               {/*  <ThemeChanger themeToggler={this.props.themeToggler} themeStyle={this.state.themeStyle} /> */}
                               <label className="switch">
                                    <input id="darkMode" type="checkbox" onChange={this.props.themeToggler} />
                                    <span className="slider round"></span>
                                </label>
                            </div>
                        </div>

                        <div className="keyValueContainer">
                            <div className="key">
                                Next Setting
                            </div>
                            <div className="value">
                                <label className="switch">
                                    <input id="nextSetting" type="checkbox" />
                                    <span className="slider round"></span>
                                </label>
                            </div>
                        </div>

                        <div className="keyValueContainer">
                            <div className="key">
                                Next Setting
                            </div>
                            <div className="value">
                                <label className="switch">
                                    <input id="nextSetting" type="checkbox" />
                                    <span className="slider round"></span>
                                </label>
                            </div>
                        </div>

                        <div className="keyValueContainer">
                            <div className="key">
                                Next Setting
                            </div>
                            <div className="value">
                                <label className="switch">
                                    <input id="nextSetting" type="checkbox" />
                                    <span className="slider round"></span>
                                </label>
                            </div>
                        </div>

                        <div className="keyValueContainer">
                            <div className="key">
                                Next Setting
                            </div>
                            <div className="value">
                                <label className="switch">
                                    <input id="nextSetting" type="checkbox" />
                                    <span className="slider round"></span>
                                </label>
                            </div>
                        </div>

                        <div className="keyValueContainer">
                            <div className="key">
                                Next Setting
                            </div>
                            <div className="value">
                                <label className="switch">
                                    <input id="nextSetting" type="checkbox" />
                                    <span className="slider round"></span>
                                </label>
                            </div>
                        </div>

                    </div>

                </div>
            </div>
        );
    }
}

export default Settings;
