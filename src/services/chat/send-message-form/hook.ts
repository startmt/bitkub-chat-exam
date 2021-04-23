import { useForm } from "react-hook-form";
import { useLoadingCallback } from "react-loading-hook";
import { firebaseServices } from "../../../third-party/firebase";
import { chatDto } from "../../../third-party/firebase/services/chat";
import { ISendMessagePayload } from "../../../third-party/firebase/services/chat/interface";

interface ISendMessageForm {
  message: string;
}

interface IUseSendMessageFormContainerProps {
  id: string;
}
export const useSendMessageFormContainer = (
  props: IUseSendMessageFormContainerProps
) => {
  const { id } = props;
  const sendMessageForm = useForm<ISendMessageForm>();
  const handleService = async (payload: ISendMessagePayload) => {
    const res = await firebaseServices.chatService.sendMessage(payload);
    if (res.isSuccess) {
      sendMessageForm.reset();
    }
  };
  const [createChatRoomService, isSending] = useLoadingCallback(handleService);
  const onSendMessage = sendMessageForm.handleSubmit((values) => {
    if (values.message) {
      const payload = chatDto.mappedToSendMessagePayload({
        message: values.message,
        id: id,
      });
      createChatRoomService(payload);
    }
  });

  return {
    isSending,
    sendMessageForm,
    onSendMessage,
  };
};
