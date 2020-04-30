import React from "react";

// @material-ui/icons
import Code from "@material-ui/icons/Code";

// core components
import Header from "./components/Header/Header";
import HeaderLinks from "./components/Header/HeaderLinks";
import InfoArea from "./components/InfoArea/InfoArea";

const App = ({ ...rest }) => {
  return (
    <div>
      <Header
        color="info"
        brand="LOGO HERE"
        links={<HeaderLinks dropdownHoverColor="info" />}
        fixed
        changeColorOnScroll={{
          height: 300,
          color: "info",
        }}
        {...rest}
      />
      <InfoArea
        title="Get Started"
        description="This is a good place to start"
        icon={Code}
        iconColor="primary"
      />
    </div>
  );
};

export default App;
