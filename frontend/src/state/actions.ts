import { assign } from "xstate";
import { TemplateContext, UpdateCountEvent } from "./machine";

export enum TemplateActions {
  updateCount = "updateCount",
}

// Like the example from the documentation:
// https://xstate.js.org/docs/guides/context.html#context
const assignNewCount = assign<TemplateContext, UpdateCountEvent>({
  count: (context, event) => event.newCount,
});

// Set all your actions there, and they will be added to your machine
export const allActions: any = {
  [TemplateActions.updateCount]: assignNewCount,
};
