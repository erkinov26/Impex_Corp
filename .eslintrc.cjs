module.exports = {
settings:{
  react: {
    createClass: "createReactClass",
    pragma: "React", 
    fragment: "Fragment",
    version: "detect",    
    flowVersion: "0.53", 
  }
},
  env: {
    browser: true,
    es2021: true,
  },
  extends: ["eslint:recommended", "plugin:react/recommended"],
  overrides: [
    {
      env: {
        node: true,
      },
      files: [".eslintrc.{js,cjs}"],
      parserOptions: {
        sourceType: "script",
      },
    },
  ],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  plugins: ["react"],
  rules: {},
}
