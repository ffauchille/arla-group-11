import { User } from "@auth0/auth0-react/dist/auth-state";
import { Template } from "webpack";
import { Machine, State } from "xstate";
import { allActions, TemplateActions } from "./actions";

// You can keep all values that can be share with all your components
export type TemplateContext = {
  count: number;
  helpRequests: any[];
};

export type TemplateMachineContextProps = {
  machine: State<any>;
  send: Function;
};

export enum TemplateStates {
  view1 = "view1",
  view2 = "view2",
  loadingHelpRequests = "loadingHelpRequests"
}

export enum TemplateEvents {
  toView1 = "TO_VIEW_1",
  toView2 = "TO_VIEW_2",
  udpateCount = "UPDATE_COUNT",
  loadHelpRequests = "LOAD_HELP_REQUESTS"
}

export type UpdateCountEvent = {
  type: TemplateEvents.udpateCount,
  newCount: number;
};

export const createTemplateStateMachine = () => {
  return Machine<TemplateContext>(
    {
      id: "template",
      initial: TemplateStates.view1,
      context: {
        count: 0,
        helpRequests: [],
      },
      states: {
        [TemplateStates.view1]: {},
        [TemplateStates.view2]: {},
        [TemplateStates.loadingHelpRequests]: {
          invoke: {
            id: 'invokeHelpRequests',
            src: async (ctx, event) => {
              const apiResponse = await fetch("http://localhost:3000/v1/help-request?page=1&limit=20", { headers: {
                Authorization: `Bearer ${event.token}`
              }});
              const data = await apiResponse.json();
              return {data};
            },
            onDone: { 
              target: TemplateStates.view2,
              actions: [TemplateActions.updateHelpRequests]
            },
            onError: {
              target: TemplateStates.view2
            }
          }
        }
      },
      on: {
        [TemplateEvents.toView1]: TemplateStates.view1,
        [TemplateEvents.toView2]: TemplateStates.view2,
        [TemplateEvents.udpateCount]: {
          actions: [TemplateActions.updateCount],
        },
        [TemplateEvents.loadHelpRequests]: TemplateStates.loadingHelpRequests
      },
    },
    { actions: allActions }
  );
};
