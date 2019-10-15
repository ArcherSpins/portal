/* eslint-disable */
import React from 'react';
import { storiesOf, addDecorator } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import noop from 'lodash.noop';
import Modal from 'ui-kit/Modal';
import styles from './Modal.module.scss';

class ModalContainer extends React.Component<null, State> {
    constructor() {
        super();
        this.state = {
            isShowing: false,
        };
    }

    openModalHandler = () => {
        this.setState({
            isShowing: true,
        });
    };

    closeModalHandler = () => {
        this.setState({
            isShowing: false,
        });
    };

    render() {
        const { isShowing } = this.state;
        return (
            <div>
                <button onClick={this.openModalHandler} style={{ background: 'black', color: 'white' }}>Open Modal</button>
                {isShowing ? (
                    <div onClick={this.closeModalHandler} className={styles["back-drop"]} />
                ) : null}
                <Modal
                    className="modal"
                    show={isShowing}
                    close={this.closeModalHandler}
                    object="Task"
                    func={noop}
                    firstButtonText='Close'
                    secondButtonText='Delete'
                    headerText='Delete'
                    use1='btn-cancel'
                    use2='btn-continue'
                >
                    Are you sure you want to delete?
          </Modal>
            </div>
        );
    }
}


const withDecorator = (node) => () => <div>{node}</div>;


storiesOf('Modal', module).addWithChapters('Just Modal', {
    chapters: [
        {
            sections: [
                {
                    title: 'Default',
                    sectionFn: withDecorator(<ModalContainer />)
                },
            ]
        }
    ]
});
