import { assign } from "xstate";
import { TemplateContext, UpdateCountEvent } from "./machine";

export enum TemplateActions {
  updateCount = "updateCount",
  updateHelpRequests = "updateHelpRequests"
}

// Like the example from the documentation:
// https://xstate.js.org/docs/guides/context.html#context
const assignNewCount = assign<TemplateContext, UpdateCountEvent>({
  count: (context, event) => event.newCount,
});

const assignNewHelpRequests = assign<TemplateContext, any>({
  helpRequests: (context, event) => event.data
})

// Set all your actions there, and they will be added to your machine
export const allActions: any = {
  [TemplateActions.updateHelpRequests]: assignNewHelpRequests,
  [TemplateActions.updateCount]: assignNewCount,
};
