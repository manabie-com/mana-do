import { Button } from '../common/button';
import './index.css';

type Props = {
    title?: string
    open: boolean,
    onSubmit?: React.MouseEventHandler<HTMLButtonElement>,
    onClose?: React.MouseEventHandler<HTMLButtonElement | HTMLDivElement>,
    children?: JSX.Element
};

export const Modal = ({title, onSubmit, onClose, open, children }: Props) => {
//   const showHideClassName = open ? "modal display-block" : "modal display-none";

  return (
    // <div className={showHideClassName}>
    //   <section className="modal-main">
    //     <p>{title ? title : 'title'}</p>
    //     <button type="button" onClick={onClose}>
    //       Close
    //     </button>
    //   </section>
    // </div>
<div>
    <div className={'darkBG'} onClick={onClose} />
    <div className={'centered'}>
        <div className={'modal'}>
            <div className={'modalHeader'}>
                <h5 className={'heading'}>{title ? title : 'title'}</h5>
            </div>
            <button className={'closeBtn'} onClick={onClose}>
                x
            </button>
            <div className={'modalContent'}>
                {children}
            </div>
            <div className={'modalActions'}>
                <div className={'actionsContainer'}>
                    <Button color='primary' onClick={onSubmit}>
                        Update
                    </Button>
                    <Button
                    className={'cancelBtn'}
                    onClick={onClose}
                    >
                    Cancel
                    </Button>
                </div>
            </div>
        </div>
    </div>
    </div>

  );
};