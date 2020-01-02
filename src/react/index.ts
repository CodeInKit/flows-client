import React, { useState, useEffect } from 'react';
import _ from 'lodash';
import { flows } from '../flows';


/**
 * react hook that execute a hook from flow library
 * 
 * @param data flow data, show include the flowName to identify the executed flow.
 */
export function useCIKFlow(flowName:string, data: any, itemToFollow?: string, dependencies: string[] = []) {
  if(!_.isString(flowName)) {
    throw new Error('the first param should be a string represent the flow name');
  }

  if(!_.isPlainObject(data)) {
    throw new Error('the second parameter should be the data that you initially pass to the flow');
  }

  if(!_.isUndefined(itemToFollow) && _.isArray(itemToFollow)) {
    dependencies = itemToFollow;
  } else if(!_.isUndefined(itemToFollow) && !_.isString(itemToFollow)) {
    throw new Error('the third parameter should be a string that represent item in the data which we follow or the dependencies on which we re-execute the flow');
  }

  if(!_.isArray(dependencies)) {
    throw new Error('dependencies should be an array of strings');    
  }

  const initialState: any = typeof data[itemToFollow] !== 'undefined' ? data[itemToFollow] : data;
  const [flowState, setFlowState] = useState(initialState);

  useEffect(() => {
    flows.execute(flowName, data).then((fdata: any)=> {
      const newData: any = typeof fdata[itemToFollow] !== 'undefined' ? fdata[itemToFollow] : fdata;
      setFlowState(newData);
    });
  }, dependencies);

  return [flowState, setFlowState];
}