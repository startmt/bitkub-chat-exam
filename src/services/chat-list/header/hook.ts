import { useState } from "react";
import { useForm } from "react-hook-form";
import { useLoadingCallback } from "react-loading-hook";
import { useHistory } from "react-router";
import {
  IResponseFailApi,
  IResponseSuccessApi,
} from "../../../domains/IResponse";
import { firebaseServices } from "../../../third-party/firebase";
import { useSnackbar } from "notistack";
import {
  ICreateChatRoomResponse,
  IJoinChatRoomResponse,
} from "../../../third-party/firebase/services/chat/interface";
import { useAuthorize } from "../hooks/use-authorize";
import { useSignout } from "../../auth/hooks/use-authen";

export const useHeaderContainer = () => {
  const { user } = useAuthorize();
  const { signout } = useSignout();

  return { user, signout };
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

export const useJoinChatRoomModalContainer = () => {
  const createChatFormModalHook = useJoinRoomModal();
  const createChatFormHook = useJoinChatRoomForm({
    handleCloseModal: createChatFormModalHook.handleCloseModal,
  });

  return {
    joinChatRoomForm: createChatFormHook.joinChatRoomForm,
    isJoining: createChatFormHook.isJoining,
    onJoinRoom: createChatFormHook.onJoinRoom,
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

const useJoinRoomModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const handleOpenModal = () => {
    setIsOpen(true);
  };

  const handleCloseModal = () => {
    setIsOpen(false);
  };

  return { isOpen, handleCloseModal, handleOpenModal };
};

interface IJoinChatRoomForm {
  id: string;
}
interface IUseJoinChatRoomFormProps {
  handleCloseModal: () => void;
}
const useJoinChatRoomForm = (props: IUseJoinChatRoomFormProps) => {
  const { handleCloseModal } = props;

  const h = useHistory();
  const joinChatRoomForm = useForm<IJoinChatRoomForm>();
  const { enqueueSnackbar } = useSnackbar();
  const handleService = async (name: string) => {
    const res = await firebaseServices.chatService.joinChatRoom(name);
    if (res.isSuccess) {
      const response = res as IResponseSuccessApi<IJoinChatRoomResponse>;
      handleCloseModal();
      h.push(`/chat-room/${response.data.id}`);
    } else {
      const errors = res as IResponseFailApi<any>;
      enqueueSnackbar(errors.error.message, {
        variant: "error",
      });
    }
  };
  const [joinChatRoomService, isJoining] = useLoadingCallback(handleService);
  const onJoinRoom = joinChatRoomForm.handleSubmit((values) => {
    joinChatRoomService(values.id);
  });

  return { isJoining, onJoinRoom, joinChatRoomForm };
};
