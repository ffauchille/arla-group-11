import { ThemeProvider, Typography } from "@material-ui/core";
import React from "react";
import ReactDOM from "react-dom";
import { TemplateLayout } from "./components/TemplateLayout";
import { TemplateNavigation } from "./components/TemplateNavigation";
import { TemplateView1 } from "./components/TemplateView1";
import { TemplateView2 } from "./components/TemplateView2";
import { TemplateStates } from "./state/machine";
import {
  TemplateMachineContext,
  TemplateMachineProvider,
} from "./state/provider";
import { templateTheme } from "./theme";
import { TemplateView3 } from "./components/TemplateView3";

/**
 * This component is responsible of displaying the correct view
 * base on the correct machine state.
 *
 * If you create new views for new states, you should add another if statement
 * including your view.
 */
const TemplateContent = () => {
  const { machine } = React.useContext(TemplateMachineContext);
  let Content = <Typography>Nothing to display</Typography>;
  if (machine.matches(TemplateStates.view1))
    Content = <TemplateView1 project="Arlaide" />;
  else if (machine.matches(TemplateStates.view2)) Content = <TemplateView2 />;
  else if (machine.matches(TemplateStates.view3)) Content = <TemplateView3 />;

  return Content;
};

ReactDOM.render(
  <TemplateMachineProvider>
    <ThemeProvider theme={templateTheme}>
      <TemplateLayout>
        <TemplateNavigation />
        <TemplateContent />
      </TemplateLayout>
    </ThemeProvider>
  </TemplateMachineProvider>,
  document.getElementById("app")
);
