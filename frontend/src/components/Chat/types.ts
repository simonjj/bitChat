export interface Message {
  role: "user" | "assistant";
  content: string;
}

export interface ChatProps {
  messages: Message[];
  loading: boolean;
  onSendMessage: (message: string) => void;
  onNewChat: () => void;
}