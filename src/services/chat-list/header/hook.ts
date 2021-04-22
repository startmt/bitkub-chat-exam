import { useState } from "react";
import { useForm } from "react-hook-form";
import { useLoadingCallback } from "react-loading-hook";
import { useHistory } from "react-router";
import { IResponseSuccessApi } from "../../../domains/IResponse";
import { firebaseServices } from "../../../third-party/firebase";
import { ICreateChatRoomResponse } from "../../../third-party/firebase/services/chat/interface";
import { useAuthorize } from "../hooks/use-authorize";

export const useHeaderContainer = () => {
  const { user } = useAuthorize();

  return { user };
};

export const useCreateChatRoomModalContainer = () => {
  const createChatFormModalHook = useCreateRoomModal();
  const createChatFormHook = useCreateChatRoomForm({
    handleCloseModal: createChatFormModalHook.handleCloseModal,
  });
  
  return {
    createChatRoomForm: createChatFormHook.createChatRoomForm,
    isCreating: createChatFormHook.isCreating,
    onCreateRoom: createChatFormHook.onCreateRoom,
    isOpen: createChatFormModalHook.isOpen,
    handleCloseModal: createChatFormModalHook.handleCloseModal,
    handleOpenModal: createChatFormModalHook.handleOpenModal,
  };
};

const useCreateRoomModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const handleOpenModal = () => {
    setIsOpen(true);
  };

  const handleCloseModal = () => {
    setIsOpen(false);
  };

  return { isOpen, handleCloseModal, handleOpenModal };
};

interface ICreateChatRoomForm {
  name: string;
}
interface IUseCreateChatRoomFormProps {
  handleCloseModal: () => void;
}
const useCreateChatRoomForm = (props: IUseCreateChatRoomFormProps) => {
  const { handleCloseModal } = props;
  const h = useHistory();
  const createChatRoomForm = useForm<ICreateChatRoomForm>();
  const handleService = async (name: string) => {
    const res = await firebaseServices.chatService.createChatRoom(name);
    if (res.isSuccess) {
      const response = res as IResponseSuccessApi<ICreateChatRoomResponse>;
      handleCloseModal();
      h.push(`/chat-room/${response.data.id}`);
    }
  };
  const [createChatRoomService, isCreating] = useLoadingCallback(handleService);
  const onCreateRoom = createChatRoomForm.handleSubmit((values) => {
    createChatRoomService(values.name);
  });

  return { isCreating, onCreateRoom, createChatRoomForm };
};
