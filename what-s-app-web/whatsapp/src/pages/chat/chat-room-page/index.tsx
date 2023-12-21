import ChatLayout from "../layouts";
import Header from "./components/header";
import Footer from "./components/footer";
import Sidebar from "./components/sidebar";
import Icon from "common/components/icons";
import useChatRoom from "./hooks/useChatRoom";
import ProfileSection from "./components/profile";
import MessagesList from "./components/messages-list";
import SearchSection from "./components/search-section";
import useNavigateToChat from "./hooks/useNavigateToChat";
import { Container, Body, Background, FooterContainer, ScrollButton } from "./styles";
import { useEffect , useState} from "react";
import { useParams } from "react-router-dom";
import { getMessages } from "./components/messages-list/data/get-messages";

export default function ChatRoomPage() {
  const {
    activeInbox,
    handleMenuOpen,
    handleShowIcon,
    isProfileOpen,
    isSearchOpen,
    isShowIcon,
    setIsProfileOpen,
    setIsSearchOpen,
    setShouldScrollToBottom,
    shouldScrollToBottom,
  } = useChatRoom();
  useNavigateToChat(activeInbox);
  const [messages, setMessages] = useState(() => getMessages());
  const onSend = (message) => {
    console.log(message);
    setMessages((prevMessages) => [...prevMessages, message]);
  };

  const params = useParams();

  useEffect(() => {
    setMessages(getMessages());
  }, [params.id]);

  
  return (
    <ChatLayout>
      <Container>
        <Body>
          <Background />
          <Header
            title={activeInbox?.name ?? ""}
            image={activeInbox?.image ?? ""}
            subTitle={activeInbox?.isOnline ? "Online" : ""}
            onSearchClick={() => handleMenuOpen("search")}
            onProfileClick={() => handleMenuOpen("profile")}
          />
          <MessagesList messages={messages}
            onShowBottomIcon={handleShowIcon}
            shouldScrollToBottom={shouldScrollToBottom}
          />
          <FooterContainer>
            {isShowIcon && (
              <ScrollButton onClick={() => setShouldScrollToBottom(true)}>
                <Icon id="downArrow" />
              </ScrollButton>
            )}
            <Footer onSend={onSend} />
          </FooterContainer>
        </Body>
        <Sidebar title="Search" isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)}>
          <SearchSection />
        </Sidebar>
        <Sidebar
          title="Contact Info"
          isOpen={isProfileOpen}
          onClose={() => setIsProfileOpen(false)}
        >
          <ProfileSection name={activeInbox?.name ?? ""} image={activeInbox?.image ?? ""} />
        </Sidebar>
      </Container>
    </ChatLayout>
  );
}
