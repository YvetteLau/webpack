module.exports = {
    parser: "@typescript-eslint/parser",
    extends: [
        'alloy',
        'alloy/react',
        'alloy/typescript',
        'plugin:prettier/recommended',
    ],
    plugins: [
        "react-hooks"
    ],
    settings: {
        react: {
            version: "detect"
        }
    },
    rules: {
        /* react-hooks 规则 */
        "react-hooks/rules-of-hooks": "error",
        "react-hooks/exhaustive-deps": "warn",
        "prettier/prettier": "error",
        /*
         * 增加以下两个配置，不然需要在 render  前增加 public 
         * Missing return type on function - in react (typescript) code
         * https://stackoverflow.com/questions/56041623/missing-return-type-on-function-in-react-typescript-code
         */
        "@typescript-eslint/explicit-function-return-type": "off" ,
        "@typescript-eslint/explicit-member-accessibility": "off",
        "no-import-assign": "off",
        "@typescript-eslint/member-ordering": "off" //state 必须在其它之前
    }
}