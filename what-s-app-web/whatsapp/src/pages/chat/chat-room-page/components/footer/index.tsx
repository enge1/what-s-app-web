import { useState, useMemo } from "react";
import Icon from "common/components/icons";
import {
  AttachButton,
  Button,
  ButtonsContainer,
  IconsWrapper,
  Input,
  SendMessageButton,
  Wrapper,
} from "./styles";
import { v4 as uuidv4 } from 'uuid';
import { Message } from "common/types/common.type";
//import { Message } from "pages/chat/layouts/styles";
// dol array of objects defining attach buttons with icons and labels

const attachButtons = [
  { icon: "attachRooms", label: "Choose room" },
  { icon: "attachContacts", label: "Choose contact" },
  { icon: "attachDocument", label: "Choose document" },
  { icon: "attachCamera", label: "Use camera" },
  { icon: "attachImage", label: "Choose image" },
];

export default function Footer(props) {
  const [showIcons, setShowIcons] = useState(false);
  const [userInput, setUserInput] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserInput(e.target.value);
    console.log("User input:", e.target.value); //to see if it sent or not   
    console.log(userInput); 
  };

  const handleSendClick = () => {
    console.log("Send button clicked", userInput);
    if (userInput.trim() !== "") {
      const newMessage: Message = {
        id: uuidv4(), //bsbb any m5lia timestamp undefined/0 uuidv4=gets a unique ID regardless of the speed at which messages are sent.
        body: userInput,
        date: "",
        timestamp: "", //l8ait ma tzbot
        messageStatus: "SENT",
        isOpponent: false,
      };

      console.debug(newMessage);
      props.onSend(newMessage);
      setUserInput(""); // clear input b3d sending
    }
  };

  return (
    <Wrapper>
      <IconsWrapper>
        <AttachButton onClick={() => setShowIcons(!showIcons)}>
          <Icon id="attach" className="icon" />
        </AttachButton>
        <ButtonsContainer>
          {attachButtons.map((btn) => (
            <Button showIcon={showIcons} key={btn.label}>
              <Icon id={btn.icon} />
            </Button>
          ))}
        </ButtonsContainer>
      </IconsWrapper>
      <Input value={userInput} onChange={handleInputChange} placeholder="Type a message here .." />  {/* 2 way binding */}
      <SendMessageButton onClick={handleSendClick} >
        <Icon id="send" className="icon" />
      </SendMessageButton>
    </Wrapper>
  );
}
