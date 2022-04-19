import * as React from 'react';

export interface IPortalProps {

}

export interface IPortalState {

}

export class Portal extends React.Component<IPortalProps, IPortalState> {

    public render() {
        return (
            <div>Hello from the Portal! {Math.random()}</div>
        )
    }

}