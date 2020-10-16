import { assign } from "xstate";
import {
  SetAuthTokenEvent,
  SetUserPermissions,
  TemplateContext,
  UpdateCountEvent,
} from "./machine";

export enum TemplateActions {
  updateCount = "updateCount",
  updateHelpRequests = "updateHelpRequests",
  updateAuthToken = "updateAuthToken",
  updateUserProfiles = "updateUserProfiles",
  updatePermissions = "updatePermissions"
}

// Like the example from the documentation:
// https://xstate.js.org/docs/guides/context.html#context
const assignNewCount = assign<TemplateContext, UpdateCountEvent>({
  count: (_, event) => event.newCount,
});

const assignNewHelpRequests = assign<TemplateContext, any>({
  helpRequests: (_, event) => event.data,
});

const assignAuthToken = assign<TemplateContext, SetAuthTokenEvent>({
  authToken: (_, event) => event.token,
});

const assignUserProfiles = assign<TemplateContext, any>({
  userProfiles: (_, event) => event.data
});

const assignPermissions = assign<TemplateContext, SetUserPermissions>({
  permissions: (_, event) => event.permissions
})

// Set all your actions there, and they will be added to your machine
export const allActions: any = {
  [TemplateActions.updateHelpRequests]: assignNewHelpRequests,
  [TemplateActions.updateCount]: assignNewCount,
  [TemplateActions.updateAuthToken]: assignAuthToken,
  [TemplateActions.updateUserProfiles]: assignUserProfiles,
  [TemplateActions.updatePermissions]: assignPermissions
};
