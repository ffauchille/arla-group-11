import { useMachine } from "@xstate/react";
import {noop} from "lodash";
import React from "react";
import {
  createTemplateStateMachine,
  TemplateMachineContextProps,
} from "./machine";

// @ts-ignore
const nilContext: TemplateMachineContextProps = { machine: null, send: noop };

/**
 * The context you need to use in your React components with xstate
 */
export const TemplateMachineContext = React.createContext<
  TemplateMachineContextProps
>(nilContext);

/**
 * This React component will set the State Machine global to all of its children.
 *
 * Spreading your `machine` and `send` function to the child using react props is very redundant.
 * Instead, we use React.createContext api (https://reactjs.org/docs/context.html#reactcreatecontext).
 *
 * If one of the children component needs to use the state machine, it just has to write:
 * ```
 *    const MyComponentWithXState: React.FC = () => {
 *      const [machine, send] = React.useContext(TemplateMachineContext);
 *      // ...
 *    }
 * ```
 */
export const TemplateMachineProvider: React.FC = ({ children }) => {
  const [machine, send] = useMachine(createTemplateStateMachine(), {
    devTools: true,
  });

  // TO avoid unecessary rendering if the machine context hasn't change between rendering
  const contextValue = React.useMemo(
    () => ({
      machine,
      send,
    }),
    [machine, send]
  );

  return (
    <TemplateMachineContext.Provider value={contextValue}>
      {children}
    </TemplateMachineContext.Provider>
  );
};
