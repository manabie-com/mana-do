import React from "react";
import ReactModal from "react-modal";
import styled from "styled-components";
import { MouseEventHandler } from "react";

const Container = styled.div`
  background-color: #ffffff;
  padding: 16px 24px 15px 24px;
  display: flex;
  justify-content: space-between;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
  border-bottom: 1px solid #f2f2f2;
  height: 56px;
  box-sizing: border-box;
`;

const LeftContainer = styled.div`
  max-width: calc(100% - 48px);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;

  h5 {
    margin: 0;
  }
`;

const RightContainer = styled.div`
  color: #999999;
  font-size: 24px;
  height: 24px;
  cursor: pointer;
`;

const ContentContainer = styled.div`
  /* min-height: 96px; */
  padding-top: 16px;
  padding-right: 24px;
  padding-left: 24px;
  padding-bottom: 16px;
  height: auto;
  max-height: calc(100vh - 112px);
  overflow-y: auto;
  display: flex;
`;
export interface ModalType {
  visible: boolean;
  title: string;
  onClose: MouseEventHandler;
  children: any;
}

const Modal = ({ visible, title, onClose, children }: ModalType) => {
  if (visible) {
    return (
      <ReactModal
        ariaHideApp={false}
        isOpen={visible}
        onRequestClose={(e: any) => onClose(e)}
        style={{
          overlay: {
            backgroundColor: "rgba(0,0,0,.45)",
            zIndex: 9999,
          },
          content: {
            top: "300px",
            left: "calc(50% - 250px)",
            right: "unset",
            bottom: "unset",
            width: "500px",
            height: "auto",
            // minHeight: 200,
            maxHeight: "calc(100vh - 32px)",
            padding: 0,
            borderRadius: 8,
            overflow: "hidden",
          },
        }}
      >
        <Container>
          <LeftContainer>{title}</LeftContainer>
          <RightContainer onClick={onClose}>x</RightContainer>
        </Container>
        <ContentContainer>{children}</ContentContainer>
      </ReactModal>
    );
  }

  return <></>;
};
export default Modal;
