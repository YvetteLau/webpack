import React from "react";
import { ThemeContext } from "./theme-context";

export default class ThemeButton extends React.Component<
    any,
    any
> {
    static contextType = ThemeContext;

    render() {
        let props = this.props;
        let theme = this.context;
        return (
            <button
                {...props}
                style={{
                    backgroundColor: theme.background
                }}
            />
        );
    }
}
