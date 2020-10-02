import { Machine, State } from "xstate";
import { allActions, TemplateActions } from "./actions";

// You can keep all values that can be share with all your components
export type TemplateContext = {
  count: number;
};

export type TemplateMachineContextProps = {
  machine: State<any>;
  send: Function;
};

export enum TemplateStates {
  view1 = "view1",
  view2 = "view2",
}

export enum TemplateEvents {
  toView1 = "TO_VIEW_1",
  toView2 = "TO_VIEW_2",
  udpateCount = "UPDATE_COUNT",
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
        count: 0
      },
      states: {
        [TemplateStates.view1]: {},
        [TemplateStates.view2]: {},
      },
      on: {
        [TemplateEvents.toView1]: TemplateStates.view1,
        [TemplateEvents.toView2]: TemplateStates.view2,
        [TemplateEvents.udpateCount]: {
          actions: [TemplateActions.updateCount],
        },
      },
    },
    { actions: allActions }
  );
};
