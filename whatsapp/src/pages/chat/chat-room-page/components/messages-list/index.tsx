//yy
import { forwardRef, useMemo , useState} from "react";
import { useParams } from "react-router-dom";
import Icon from "common/components/icons";
import useScrollToBottom from "./hooks/useScrollToBottom";
import { getMessages, Message } from "./data/get-messages";
import {
  ChatMessage,
  ChatMessageFiller,
  ChatMessageFooter,
  Container,
  Date,
  DateWrapper,
  EncryptionMessage,
  MessageGroup,
} from "./styles";

type MessagesListProps = {
  onShowBottomIcon: Function;
  shouldScrollToBottom?: boolean;
};

export default function MessagesList(props: MessagesListProps) {
  const { onShowBottomIcon, shouldScrollToBottom } = props;

  const params = useParams();
  
  const [userInput, setUserInput] = useState(""); // step 1: state for user input
  const [userMessages, setUserMessages] = useState<Message[]>([]); //  2: state for user msgs

  const messages = useMemo(() => {
    return getMessages().concat(userMessages); //  3: concatenate user msgs
    // eslint-disable-next-line
  }, [params.id , userMessages]);

  const { containerRef, lastMessageRef } = useScrollToBottom(
    onShowBottomIcon,
    shouldScrollToBottom,
    params.id
  );


  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserInput(e.target.value);
  };

  const handleSendClick = () => {
    if (userInput.trim() !== "") {
      const now: Date = new Date();
      const newMessage: Message = {
        id: now.getTime().toString(),
        body: userInput,
        date: "", 
        timestamp: now.toLocaleTimeString(), 
        messageStatus: "SENT", 
        isOpponent: false,
      };
  
      setUserMessages((prevMessages) => [...prevMessages, newMessage]); //4: update user msgs
      setUserInput(""); //clear input b3d sending
    }
  };
  

  return (
    <Container ref={containerRef}>
      <EncryptionMessage>
        <Icon id="lock" className="icon" />
        Messages are end-to-end encrypted. No one outside of this chat, not even WhatsApp, can read
        or listen to them. Click to learn more.
      </EncryptionMessage>
      <DateWrapper>
        <Date> TODAY </Date>
      </DateWrapper>
      <MessageGroup>
        {messages.map((message, i) => {
          if (i === messages.length - 1) {
            return <SingleMessage key={message.id} message={message} ref={lastMessageRef} />;
          } else {
            return <SingleMessage key={message.id} message={message} />;
          }
        })}
      </MessageGroup>
      {/* 5: add input w send button */}
      <div>
        <input type="text" value={userInput} onChange={handleInputChange} />
        <button onClick={handleSendClick}>Send</button>
      </div>
    </Container>
  );
}

const SingleMessage = forwardRef((props: { message: Message }, ref: any) => {
  const { message } = props;

  return (
    <ChatMessage
      key={message.id}
      className={message.isOpponent ? "chat__msg--received" : "chat__msg--sent"}
      ref={ref}
    >
      <span>{message.body}</span>
      <ChatMessageFiller />
      <ChatMessageFooter>
        <span>{message.timestamp}</span>
        {!message.isOpponent && (
          <Icon
            id={`${message.messageStatus === "SENT" ? "singleTick" : "doubleTick"}`}
            className={`chat__msg-status-icon ${
              message.messageStatus === "READ" ? "chat__msg-status-icon--blue" : ""
            }`}
          />
        )}
      </ChatMessageFooter>
    </ChatMessage>
  );
});
