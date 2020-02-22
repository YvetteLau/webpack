import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import ThemeButton from "./components/theme-button";
import {
    themes,
    ThemeContext
} from "./components/theme-context";
function Example() {
    // 声明一个叫 "count" 的 state 变量
    const [count, setCount] = useState<number>(0);

    return (
        <div>
            <p>You clicked {count} times </p>
            <button onClick={() => setCount(count + 1)}>
                Click me
            </button>
        </div>
    );
}
function Toolbar(props) {
    return (
        <ThemeButton onClick={props.changeTheme}>
            Change Theme
        </ThemeButton>
    );
}
class App extends React.Component<{}, any> {
    toggleTheme = () => {
        this.setState((state) => ({
            theme:
                state.theme === themes.dark
                    ? themes.light
                    : themes.dark
        }));
    };
    state = {
        theme: themes.light,
        toggleTheme: this.toggleTheme
    };
    render() {
        // 使用一个 Provider 来将当前的 theme 传递给以下的组件树。
        // 无论多深，任何组件都能读取这个值。
        // 在这个例子中，我们将 “dark” 作为当前的值传递下去。
        return (
            <div>
                <ThemeContext.Provider value={this.state}>
                    <Toolbar
                        changeTheme={this.toggleTheme}
                    />
                </ThemeContext.Provider>
                <ThemeButton />
            </div>
        );
    }
}

ReactDOM.render(
    <Example />,
    document.getElementById("root")
);
