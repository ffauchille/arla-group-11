import { Machine, State } from "xstate";
import { callApi } from "../utils/api";
import { allActions, TemplateActions } from "./actions";

// You can keep all values that can be share with all your components
export type TemplateContext = {
  count: number;
  helpRequests: any[];
  permissions?: string[];
  userProfiles: any[];
  authToken?: string;
};

export type TemplateMachineContextProps = {
  machine: State<any>;
  send: Function;
};

export enum TemplateStates {
  view1 = "view1",
  view2 = "view2",
  view3 = "view3",
  loadingHelpRequests = "loadingHelpRequests",
  loadingUserProfiles = "loadingUserProfiles",
}

export enum TemplateEvents {
  toView1 = "TO_VIEW_1",
  toView2 = "TO_VIEW_2",
  toView3 = "TO_VIEW_3",
  udpateCount = "UPDATE_COUNT",
  loadHelpRequests = "LOAD_HELP_REQUESTS",
  loadUserProfiles = "LOAD_USER_PROFILES",
  setAuthToken = "SET_AUTH_TOKEN",
  setUserPermissions = "SET_USER_PERMISSIONS",
}

export type UpdateCountEvent = {
  type: TemplateEvents.udpateCount;
  newCount: number;
};

export type SetAuthTokenEvent = {
  type: TemplateEvents.setAuthToken;
  token: string;
};

export type SetUserPermissions = {
  type: TemplateEvents.setUserPermissions;
  permissions: string[];
};

export const createTemplateStateMachine = () => {
  return Machine<TemplateContext>(
    {
      id: "template",
      initial: TemplateStates.view1,
      context: {
        count: 0,
        helpRequests: [],
        userProfiles: [],
      },
      states: {
        [TemplateStates.view1]: {},
        [TemplateStates.view2]: {},
        [TemplateStates.view3]: {},
        [TemplateStates.loadingHelpRequests]: {
          invoke: {
            id: "invokeHelpRequests",
            src: async (context, event) => {
              return await callApi(context.authToken)(
                "/v1/help-request?page=1&limit=20"
              );
            },
            onDone: {
              target: TemplateStates.view2,
              actions: [TemplateActions.updateHelpRequests],
            },
            onError: {
              target: TemplateStates.view2,
            },
          },
        },
        [TemplateStates.loadingUserProfiles]: {
          invoke: {
            id: "invokeUserProfiles",
            src: async (context, event) => {
              return await callApi(context.authToken)(
                "/v1/user-profile?page=1&limit=20"
              );
            },
            onDone: {
              target: TemplateStates.view3,
              actions: [TemplateActions.updateUserProfiles],
            }
          },
        },
      },
      on: {
        [TemplateEvents.toView1]: TemplateStates.view1,
        [TemplateEvents.toView2]: TemplateStates.view2,
        [TemplateEvents.toView3]: TemplateStates.view3,
        [TemplateEvents.loadHelpRequests]: TemplateStates.loadingHelpRequests,
        [TemplateEvents.loadUserProfiles]: TemplateStates.loadingUserProfiles,
        [TemplateEvents.setAuthToken]: {
          actions: [TemplateActions.updateAuthToken],
        },
        [TemplateEvents.setUserPermissions]: {
          actions: [TemplateActions.updatePermissions],
        },
      },
    },
    { actions: allActions }
  );
};
